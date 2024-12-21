import { z } from "zod"

export const schemaKeywordGen = z
  .object({
    outfits: z.array(
      z.object({
        category: z.string().describe("Category of the clothing article."),
        description: z
          .string()
          .describe("Description of the clothing article."),
        keywords: z
          .string()
          .describe(
            "Keywords used to search the clothing article in e-commerce.",
          ),
      }),
    ),
  })
  .describe("Response schema.")
