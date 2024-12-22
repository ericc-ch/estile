import { Group, Loader, Text } from "@mantine/core"
import { generateObject, NoObjectGeneratedError } from "ai"
import { useEffect } from "react"
import { useFetcher, useSearchParams } from "react-router"

import { OLLAMA_MODEL } from "~/lib/env"
import { ollama } from "~/services/instances"
import { PROMPT_KEYWORD_GEN } from "~/services/keywords-gen/prompts"
import { schemaKeywordGen } from "~/services/keywords-gen/schema"

import type { Route } from "./+types/result"

const mockGeneratedObject = {
  outfits: [
    {
      category: "Tops",
      description: "A relaxed and comfortable top for everyday wear.",
      keywords: "t-shirt, graphic tee, oversized, comfy, casual",
    },
    {
      category: "Bottoms",
      description: "Flowy pants or jeans for a relaxed and effortless look.",
      keywords: "jeans, wide leg, straight leg, flowy, casual, denim",
    },
    {
      category: "Shoes",
      description: "Comfortable sneakers or sandals for a laid-back vibe.",
      keywords: "sneakers, canvas shoes, sandals, flats, casual, comfortable",
    },
    {
      category: "Accessories",
      description: "A simple necklace or bracelet to complete the look.",
      keywords: "necklace, bracelet, minimalist, jewelry, casual",
    },
  ],
}

export async function action({ request }: Route.ActionArgs) {
  console.log(Object.fromEntries(await request.formData()))

  try {
    const { object } = await generateObject({
      model: ollama(OLLAMA_MODEL),
      system: PROMPT_KEYWORD_GEN.SYSTEM_PROMPT,
      prompt: `User request: I want casual outfit`,
      schema: schemaKeywordGen,
    })

    return { result: object }
  } catch (error) {
    if (NoObjectGeneratedError.isInstance(error)) {
      console.log(error)
      console.log(error.text)
    }
  }
}

export default function Result() {
  const [searchParams] = useSearchParams()
  const fetcher = useFetcher()

  useEffect(() => {
    const prompt = searchParams.get("prompt")

    if (!prompt) return

    fetcher.submit({ prompt }, { method: "post" })

    console.log(searchParams)
  }, [])

  return (
    <>
      <Group align="center">
        <Loader type="dots" />
        <Text>Thinking of the best outfits...</Text>
      </Group>
    </>
  )
}
