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
import { PaperclipIcon, SendIcon } from "lucide-react"
import { Form } from "react-router"

export default function Home() {
  return (
    <>
      <Stack gap={0}>
        <Title order={1} ta="center" textWrap="pretty">
          Unlock Your Best Look,
          <br /> Powered by AI
        </Title>
        <Text ta="center">
          Describe your style needs and let our AI find the perfect outfits.
        </Text>
      </Stack>

      <Form action="result">
        <Box
          style={{
            borderRadius: rem(4),
            border: "1px solid #ccc",
            padding: rem(8),

            display: "flex",
            flexDirection: "column",
            gap: rem(4),
          }}
        >
          <Textarea
            name="prompt"
            placeholder="Describe your outfit needs (e.g., 'a casual outfit for a summer party,' or 'formal wear for a wedding')..."
          />

          <Group>
            <FileButton onChange={console.log}>
              {(props) => (
                <ActionIcon {...props} size="lg" type="button" variant="light">
                  <PaperclipIcon style={{ width: rem(16), height: rem(16) }} />
                </ActionIcon>
              )}
            </FileButton>

            <ActionIcon
              size="lg"
              style={{ marginInlineStart: "auto" }}
              type="submit"
            >
              <SendIcon style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          </Group>
        </Box>
      </Form>
    </>
  )
}
