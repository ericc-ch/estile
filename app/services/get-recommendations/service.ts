import { generateObject } from "ai"

import { OLLAMA_MODEL } from "~/lib/env"

import { ollama } from "../instances"
import { PROMPT_GET_RECOMMENDATIONS } from "./prompts"
import { schemaGetRecommendations } from "./schema"

export async function getRecommendations(request: string) {
  const promise = new Promise((resolve) => setTimeout(resolve, 2_000))
  await promise
  return result

  const { object } = await generateObject({
    model: ollama(OLLAMA_MODEL),
    system: PROMPT_GET_RECOMMENDATIONS.SYSTEM_PROMPT,
    prompt: `User request: I want casual outfit`,
    schema: schemaGetRecommendations,
  })

  return { result: object }
}

const result = {
  outfits: [
    {
      category: "Tops",
      description: "Lightweight floral print blouse",
      keywords: "summer blouse, floral print, short sleeve, v-neck",
    },
    {
      category: "Bottoms",
      description: "High-waisted denim shorts",
      keywords: "denim shorts, high-waisted, distressed, summer casual",
    },
    {
      category: "Shoes",
      description: "Strappy leather sandals",
      keywords: "sandals, leather, strappy, flat, bohemian",
    },
    {
      category: "Accessories",
      description: "Wide-brimmed straw sun hat",
      keywords: "sun hat, straw hat, beach accessory, summer fashion",
    },
  ],
}
