import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const addBookFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  author: z.string().min(1, { message: "Author is required." }),
  rating: z
    .number()
    .min(0)
    .max(5, { message: "Rating must be between 0 and 5." }),
  description: z.string(),
});

export const addBookFormSchemaResolver = zodResolver(addBookFormSchema);

export type TAddBookFormType = z.infer<typeof addBookFormSchema>;
