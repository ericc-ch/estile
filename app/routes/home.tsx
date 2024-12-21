import { Box, Button, Group, Radio, Text, Textarea, Title } from "@mantine/core"
import { generateObject, NoObjectGeneratedError } from "ai"
import { Form } from "react-router"

import { _ollama, ollama } from "~/services/instances"
import { PROMPT_KEYWORD_GEN } from "~/services/keywords-gen/prompts"
import { schemaKeywordGen } from "~/services/keywords-gen/schema"

import type { Route } from "./+types/home"

const skinTones = [
  {
    name: "Fair",
    hex: "#F8EEDD",
    group: "Light",
  },
  {
    name: "Ivory",
    hex: "#F0E6D9",
    group: "Light",
  },
  {
    name: "Porcelain",
    hex: "#FAF0E6",
    group: "Light",
  },
  {
    name: "Beige",
    hex: "#E4C7B7",
    group: "Medium",
  },
  {
    name: "Olive",
    hex: "#C9B085",
    group: "Medium",
  },
  {
    name: "Tan",
    hex: "#D2B48C",
    group: "Medium",
  },
  {
    name: "Brown",
    hex: "#A0785A",
    group: "Dark",
  },
  {
    name: "Deep Brown",
    hex: "#604A3F",
    group: "Dark",
  },
  {
    name: "Ebony",
    hex: "#332721",
    group: "Dark",
  },
]

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
  const { availableModels } = loaderData
  console.log(actionData?.result)

  return (
    <>
      {availableModels.map((model) => (
        <Text key={model.name}>{model.name}</Text>
      ))}

      <Title order={1}>What do you want to build?</Title>
      <Textarea
        autosize
        label="Autosize with 4 rows max"
        maxRows={4}
        minRows={2}
        placeholder="Autosize with 4 rows max"
      />

      <Radio.Group label="Skin Tone">
        <Group>
          {skinTones.map((tone) => (
            <Radio.Card key={tone.name} value={tone.hex} w="auto">
              <Group>
                <Radio.Indicator />
                <Box
                  style={{ backgroundColor: tone.hex, width: 20, height: 20 }}
                />
                <Text>{tone.name}</Text>
              </Group>
            </Radio.Card>
          ))}
        </Group>
      </Radio.Group>

      <Form method="post">
        <Button type="submit">Submit</Button>
      </Form>
    </>
  )
}
