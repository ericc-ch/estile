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
  ScrollArea,
  Button,
} from "@mantine/core"
import { ArrowLeftIcon, PaperclipIcon, SendIcon } from "lucide-react"
import { useState } from "react"

import {
  useGetRecommendations,
  type GetRecommendationResponse,
} from "~/services/recommendation/service"
import { useSearchProduct, type ProductInfo } from "~/services/search/service"

import { ResultCard } from "./result-card"

type Results = Array<{
  outfit: GetRecommendationResponse["outfits"][number]
  searchResults: Array<ProductInfo>
}>

export default function Home() {
  const getRecommendations = useGetRecommendations()
  const searchProduct = useSearchProduct()

  const [results, setResults] = useState<Results>([])

  console.log({ results })

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const prompt = formData.get("prompt") as string

    const { data: recommendations } = await getRecommendations.mutateAsync({
      request: prompt,
    })

    const searchPromises = recommendations.outfits.map(async (outfit) => {
      const { data: searchResults } = await searchProduct.mutateAsync({
        query: outfit.description,
      })
      return {
        outfit,
        searchResults,
      }
    })

    const searchResponses = await Promise.all(searchPromises)

    setResults(searchResponses)
  }

  const isProcessing = getRecommendations.isPending || searchProduct.isPending

  if (isProcessing) {
    return (
      <Group align="center" justify="center">
        <Loader type="dots" />

        {getRecommendations.isPending && (
          <Text>Thinking of the best outfits...</Text>
        )}
        {searchProduct.isPending && (
          <Text>Searching for the best outfits...</Text>
        )}
      </Group>
    )
  }

  if (results.length > 0) {
    return (
      <Stack gap={32} py={64}>
        <Button
          leftSection={
            <ArrowLeftIcon style={{ width: rem(14), height: rem(14) }} />
          }
          style={{ alignSelf: "start" }}
          variant="subtle"
          onClick={() => {
            setResults([])
          }}
        >
          Back to search
        </Button>

        <Title>Your recommended outfits:</Title>

        {results.map(({ outfit, searchResults }) => (
          <Stack gap={12}>
            <Stack gap={8}>
              <Title order={2} style={{ textTransform: "capitalize" }}>
                {outfit.category}
              </Title>
              <Text>{outfit.description}</Text>

              <Stack gap={4}>
                <Text c="dimmed" fw="bold" size="xs">
                  Reasoning:
                </Text>
                <Text c="dimmed" size="xs">
                  {outfit.reason}
                </Text>
              </Stack>
            </Stack>

            <ScrollArea offsetScrollbars scrollbarSize={4} type="auto">
              <Group align="stretch" preventGrowOverflow={false} wrap="nowrap">
                {searchResults.map((product) => (
                  <ResultCard key={product.id} {...product} />
                ))}
              </Group>
            </ScrollArea>
          </Stack>
        ))}
      </Stack>
    )
  }

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
      <form onSubmit={onSubmit}>
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
            disabled={isProcessing}
            name="prompt"
            placeholder="Describe your outfit needs (e.g., 'a casual outfit for a summer party,' or 'formal wear for a wedding')..."
          />

          <Group>
            <FileButton onChange={console.log}>
              {(props) => (
                <ActionIcon
                  disabled={isProcessing}
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
              loading={isProcessing}
              size="lg"
              style={{ marginInlineStart: "auto" }}
              type="submit"
            >
              <SendIcon style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          </Group>
        </Box>
      </form>
    </>
  )
}
