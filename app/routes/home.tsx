import {
  ActionIcon,
  Box,
  Card,
  FileButton,
  Group,
  Loader,
  rem,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core"
import { PaperclipIcon, SendIcon } from "lucide-react"
import { useEffect, useRef } from "react"
import { Form, useFetcher, useNavigation } from "react-router"

import { getRecommendations } from "~/services/get-recommendations/service"
import { productSearch } from "~/services/product-search/service"

import type { Route } from "./+types/home"

enum INTENT {
  GENERATE_KEYWORDS = "GENERATE_KEYWORDS",
  PRODUCT_SEARCH = "PRODUCT_SEARCH",
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const intent = formData.get("intent") as INTENT

  switch (intent) {
    case INTENT.GENERATE_KEYWORDS:
      console.log("GENERATE_KEYWORDS")
      return {
        intent,
        result: await getRecommendations("test one"),
      }
    case INTENT.PRODUCT_SEARCH:
      console.log("PRODUCT_SEARCH")
      return {
        intent,
        result: await productSearch("test one"),
      }
    default:
      throw new Error("Invalid intent")
  }
}

export default function Home({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation()

  const isSubmitting = navigation.state === "submitting"
  const hideInput = navigation.state === "submitting" || actionData

  const fetcher =
    useFetcher<Extract<typeof actionData, { intent: INTENT.PRODUCT_SEARCH }>>()
  const fetchedRef = useRef(false)

  console.log({ fetcher })
  console.log(actionData)

  useEffect(() => {
    if (!actionData) return
    if (actionData.intent !== INTENT.GENERATE_KEYWORDS) return
    if (fetchedRef.current) return

    fetchedRef.current = true
    fetcher
      .submit(
        {
          intent: INTENT.PRODUCT_SEARCH,
        },
        { method: "post" },
      )
      .catch(console.error)
  }, [actionData, fetcher])

  const isSearching = fetcher.state === "submitting"
  const isDoneSearching = fetcher.data && fetcher.state !== "submitting"

  return (
    <>
      {!hideInput ?
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
          <Form method="post">
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
                disabled={isSubmitting}
                name="prompt"
                placeholder="Describe your outfit needs (e.g., 'a casual outfit for a summer party,' or 'formal wear for a wedding')..."
              />

              <Group>
                <FileButton onChange={console.log}>
                  {(props) => (
                    <ActionIcon
                      disabled={isSubmitting}
                      {...props}
                      size="lg"
                      type="button"
                      variant="light"
                    >
                      <PaperclipIcon
                        style={{ width: rem(16), height: rem(16) }}
                      />
                    </ActionIcon>
                  )}
                </FileButton>

                <input
                  name="intent"
                  type="hidden"
                  value={INTENT.GENERATE_KEYWORDS}
                />

                <ActionIcon
                  loading={isSubmitting}
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
      : undefined}

      {hideInput && !isDoneSearching ?
        <Group align="center" justify="center">
          <Loader type="dots" />
          {!isSearching ?
            <Text>Thinking of the best outfits...</Text>
          : <Text>Searching for the best outfits...</Text>}
        </Group>
      : undefined}

      {isDoneSearching ?
        fetcher.data?.result.map((product) => (
          <Card>{product.seller_name}</Card>
        ))
      : undefined}
    </>
  )
}
