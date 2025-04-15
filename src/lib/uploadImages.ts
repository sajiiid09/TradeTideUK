import axios from "axios";

interface ISanityUploadResponse {
  message: string;
  optimizedSize: number;
  uniqueFilename: string;
  sanityAssetId: string;
  imageId: string;
}
interface IUploadUrlResponse {
  data: ISanityUploadResponse;
  message?: string;
}

export async function uploadImages(images: File[]): Promise<string[]> {
  try {
    const uploadedUrls = await Promise.all(
      images.map(async file => {
        const formData = new FormData();
        formData.append("file", file);

        const response: IUploadUrlResponse = await axios.post(
          "/api/image",
          formData,
        );
        return response.data.imageId;
      }),
    );

    console.log("Uploaded Image URLs:", uploadedUrls);
    return uploadedUrls;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
}
