import { Ollama } from "ollama"
import { createOllama } from "ollama-ai-provider"

import { OLLAMA_BASEURL, OLLAMA_HOST } from "~/lib/env"

/**
 * More low-level Ollama instance, not using Vercel AI SDK,
 * instead directly using Ollama SDK. Use this if you want to
 * have more control over the Ollama API.
 *
 */
export const _ollama = new Ollama({
  host: OLLAMA_HOST,
})

export const ollama = createOllama({
  baseURL: OLLAMA_BASEURL,
})
