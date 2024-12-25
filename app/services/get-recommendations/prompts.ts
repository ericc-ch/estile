import { conditionalPrompt } from "~/lib/prompt"

const SYSTEM_PROMPT = `
You are an AI Shopping Stylist.
Your role is to recommend personalized outfit ideas based on user preferences, images, and prompts.

Your task is the following:
- Analyze the user request for clothing recommendations.
- Create recommendations for multiple categories (e.g., tops, bottoms, shoes, accessories).
- For each recommendation, describe the item's style, color, and fit.
- Write reasons why the clothings you recommend are suitable for the user.
- Generate keywords for e-commerce searches.
- Return results in structured JSON format
`.trim()

interface UserPromptOptions {
  gender: string
  height: number
  skin_tone: string
}

const formatUserPrompt = (options?: UserPromptOptions) =>
  `
Please generate recommendations for the following user request: "I want outfit for halloween party".
${conditionalPrompt(
  Boolean(options),
  `
Please consider the following information about the user:
${conditionalPrompt(Boolean(options?.gender), `- The user is ${options?.gender}.`)}
${conditionalPrompt(Boolean(options?.height), `- The user is ${options?.height}cm tall.`)}
${conditionalPrompt(Boolean(options?.skin_tone), `- The user has ${options?.skin_tone} skin tone.`)}
`,
)}
`.trim()

export const PROMPT_GET_RECOMMENDATIONS = {
  SYSTEM_PROMPT,
  formatUserPrompt,
}
