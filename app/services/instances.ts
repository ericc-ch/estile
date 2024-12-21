import { Ollama } from "ollama"
import { createOllama } from "ollama-ai-provider"

export const _ollama = new Ollama({
  host: "http://192.168.1.7:11434",
})

export const ollama = createOllama({
  baseURL: "http://192.168.1.7:11434/api",
})
