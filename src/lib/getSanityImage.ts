import axios from "axios";

type TImageResponse = { data: { imageUrl: string }};

export async function getSanityImage(key: string): Promise<TImageResponse> {
    try{
        const imageLink = await axios.get<string, TImageResponse>(`/api/image?id=${key}`);
        return imageLink;
    } catch(err: unknown) {
        const errorMessage = err as { message: string };
        console.log(`Failed to get image payload because: ${errorMessage}`);
        const fallback = "https://picsum.photos/id/237/200/300";
        return {
            data: {
                imageUrl: fallback
            }
        }
    }
}