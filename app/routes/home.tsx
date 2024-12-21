import {
  ActionIcon,
  Box,
  FileButton,
  Group,
  rem,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core"
import { generateObject, NoObjectGeneratedError } from "ai"
import { PaperclipIcon, SendIcon } from "lucide-react"
import { Form } from "react-router"

import { _ollama, ollama } from "~/services/instances"
import { PROMPT_KEYWORD_GEN } from "~/services/keywords-gen/prompts"
import { schemaKeywordGen } from "~/services/keywords-gen/schema"

import type { Route } from "./+types/home"

export async function loader() {
  const { models } = await _ollama.list()

  return { availableModels: models }
}

export async function action() {
  try {
    const { object } = await generateObject({
      model: ollama("llama3.2:3b-instruct-q4_K_M"),
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

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <Stack
      gap="xl"
      justify="center"
      style={{
        width: "min(100% - 3rem, 600px)",
        minHeight: "100svh",

        marginInline: "auto",
      }}
    >
      <Stack gap={0}>
        <Title order={1} ta="center" textWrap="pretty">
          Unlock Your Best Look, Powered by AI
        </Title>
        <Text ta="center">
          Describe your style needs and let our AI find the perfect outfits.
        </Text>
      </Stack>

      <Box
        component={Form}
        method="post"
        style={{
          borderRadius: rem(4),
          border: "1px solid #ccc",
          padding: rem(8),

          display: "flex",
          flexDirection: "column",
          gap: rem(4),
        }}
      >
        <Textarea placeholder="Describe your outfit needs (e.g., 'a casual outfit for a summer party,' or 'formal wear for a wedding')..." />

        <Group>
          <FileButton onChange={console.log}>
            {(props) => (
              <ActionIcon {...props} size="lg" variant="light">
                <PaperclipIcon style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            )}
          </FileButton>

          <ActionIcon size="lg" style={{ marginInlineStart: "auto" }}>
            <SendIcon style={{ width: rem(16), height: rem(16) }} />
          </ActionIcon>
        </Group>
      </Box>
    </Stack>
  )
}
