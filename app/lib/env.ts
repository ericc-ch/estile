export const OLLAMA_HOST = process.env.OLLAMA_HOST ?? "http://localhost:11434"
export const OLLAMA_BASEURL = `${OLLAMA_HOST}/api`
export const OLLAMA_MODEL =
  process.env.OLLAMA_MODEL ?? "gemma2:2b-instruct-q6_K"
