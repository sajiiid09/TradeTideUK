"use client";
import { useEffect, useState } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { getSanityImage } from "@/lib/getSanityImage";

export default function SanityImage({
  image,
  alt,
  className,
}: {
  image: string; // sanity asset id
  alt: string;
  className?: string;
}) {
  const [mainImageUrl, setMainImageUrl] = useState<string>("");
  useEffect(() => {
    async function main() {
      try {
        const res = await getSanityImage(image);
        setMainImageUrl(res.data.imageUrl);
      } catch (err: unknown) {
        const errorMessage = err as { message: string };
        console.log(errorMessage);
      }
    }
    main();
  });
  return (
    <Image
      src={mainImageUrl ?? ""}
      alt={alt}
      width={500}
      height={500}
      className={cn([className])}
    />
  );
}
