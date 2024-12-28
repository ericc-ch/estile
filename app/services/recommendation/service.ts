import { queryOptions } from "@tanstack/react-query"
import { z } from "zod"

import { api, type ResponseBase } from "../api"

export const schemaGetRecommendation = z
  .object({
    outfits: z.array(
      z.object({
        category: z.string().describe("Category of the clothing article."),
        description: z
          .string()
          .describe("Description of the clothing article."),
        reason: z
          .string()
          .describe(
            "Reason why the clothing article is suitable for the user.",
          ),
        keywords: z
          .string()
          .describe(
            "Keywords used to search the clothing article in e-commerce.",
          ),
      }),
    ),
  })
  .describe("Response schema.")

export interface GetRecommendationOptions {
  request: string
  gender?: string
  height?: number
  skin_tone?: string
}

export type GetRecommendationResponse = z.infer<typeof schemaGetRecommendation>

function getRecommendations(options: GetRecommendationOptions) {
  return api<ResponseBase<GetRecommendationResponse>>("/recommendation", {
    method: "POST",
    body: options,
  })
}

export const RECOMMENDATION_QUERIES = {
  all: () => queryOptions({ queryKey: ["recommendations"] }),
  getRecommendations: (options: GetRecommendationOptions) =>
    queryOptions({
      queryKey: [RECOMMENDATION_QUERIES.all().queryKey, options] as const,
      queryFn: ({ queryKey: [, options] }) => getRecommendations(options),
    }),
}
