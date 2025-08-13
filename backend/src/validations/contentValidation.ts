import { z } from "zod";

export const contentSchema = z.object({
  type: z.enum(
    ["linkedin", "tweet", "youtube", "blog", "important", "resource"],
    { message: "Invalid content type" }
  ),
  
  title: z.string().min(1, "Title is required").trim(),

  link: z.string().url("Invalid URL"),

  tags: z.string().min(1, "Tags are required"),
});

export type ContentInput = z.infer<typeof contentSchema>;
