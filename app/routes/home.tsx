import {
  Stack,
  Title,
  rem,
  Textarea,
  FileButton,
  ActionIcon,
  Text,
  Group,
  Loader,
  Box,
} from "@mantine/core"
import { PaperclipIcon, SendIcon } from "lucide-react"

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
      <form method="post">
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
            // disabled={isSubmitting}
            name="prompt"
            placeholder="Describe your outfit needs (e.g., 'a casual outfit for a summer party,' or 'formal wear for a wedding')..."
          />

          <Group>
            <FileButton onChange={console.log}>
              {(props) => (
                <ActionIcon
                  // disabled={isSubmitting}
                  {...props}
                  size="lg"
                  type="button"
                  variant="light"
                >
                  <PaperclipIcon style={{ width: rem(16), height: rem(16) }} />
                </ActionIcon>
              )}
            </FileButton>

            <ActionIcon
              // loading={isSubmitting}
              size="lg"
              style={{ marginInlineStart: "auto" }}
              type="submit"
            >
              <SendIcon style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          </Group>
        </Box>
      </form>

      <Group align="center" justify="center">
        <Loader type="dots" />

        <Text>Thinking of the best outfits...</Text>
        <Text>Searching for the best outfits...</Text>
      </Group>
    </>
  )
}
