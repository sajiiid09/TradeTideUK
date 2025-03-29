import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const imageType = defineType({
  name: "images", // Renamed for clarity
  title: "Image with Alt Text",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true, // Enables cropping and focal point adjustments
      },
      validation: Rule => Rule.required().error("An image is required."),
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Important for accessibility and SEO.",
          validation: Rule =>
            Rule.required()
              .min(5)
              .error("Alt text must be at least 5 characters long."),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "mainImage.alt",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title || "No alt text provided",
        media,
      };
    },
  },
});
