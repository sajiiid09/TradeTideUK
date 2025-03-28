import sharp from "sharp";
import { generateUniqueFilename } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import RateLimiter_Middleware from "@/components/common/rate-limiter.middleware";

async function fetchImageDetails(imageId: string) {
  const imageQuery = `*[_type == "images" && _id == $imageId]{
    mainImage {
      asset->{
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    }
  }`;

  return await client.fetch(imageQuery, { imageId });
}

export async function GET(request: Request) {
  await RateLimiter_Middleware(request);
  try {
    const url = new URL(request.url);
    const imageId = url.searchParams.get("id");

    if (!imageId) {
      return Response.json({ error: "Image ID is required" }, { status: 400 });
    }

    const result = await fetchImageDetails(imageId);

    if (!result || result.length === 0) {
      return Response.json({ error: "Image not found" }, { status: 404 });
    }

    const imageData = result[0].mainImage;

    return Response.json({
      message: "Image retrieved successfully",
      imageUrl: imageData.asset.url,
      altText: imageData.alt,
      dimensions: imageData.asset.metadata.dimensions,
    });
  } catch (error) {
    console.error("Error retrieving image:", error);
    return Response.json(
      { error: "Failed to retrieve image" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  await RateLimiter_Middleware(request);
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    const mimeType = (file as File).type;

    if (!allowedMimeTypes.includes(mimeType)) {
      return Response.json(
        {
          error:
            "Invalid file type. Only JPEG, PNG, and WebP images are allowed.",
        },
        { status: 400 },
      );
    }

    const arrayBuffer = await (file as File).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let imageMetadata: any;
    try {
      imageMetadata = await sharp(buffer).metadata();
    } catch (error) {
      console.log(error);
      return Response.json(
        { error: "Uploaded file is not a valid image." },
        { status: 400 },
      );
    }

    if (!["jpeg", "png", "webp"].includes(imageMetadata.format)) {
      return Response.json(
        {
          error:
            "Unsupported image format. Only JPEG, PNG, and WebP are allowed.",
        },
        { status: 400 },
      );
    }

    const optimizedImageBuffer = await sharp(buffer)
      .webp({ quality: 70, effort: 3 })
      .toBuffer();

    const uniqueFilename = generateUniqueFilename();

    const assetResponse = await client.assets.upload(
      "image",
      optimizedImageBuffer,
      {
        filename: uniqueFilename,
        contentType: "image/webp",
      },
    );

    const docResponse = await client.create({
      _type: "images",
      mainImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetResponse._id,
        },
        alt: uniqueFilename.split(".")[0],
      },
    });

    return Response.json({
      message: "File uploaded, optimized, and stored in Sanity successfully",
      optimizedSize: optimizedImageBuffer.length,
      uniqueFilename,
      sanityAssetId: assetResponse._id,
      imageId: docResponse._id,
    });
  } catch (error) {
    console.error("Error processing file upload:", error);
    return Response.json({ error: "Failed to process file" }, { status: 500 });
  }
}
