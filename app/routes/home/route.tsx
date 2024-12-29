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

    console.log({ recommendations, searchResponses })
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
      <Stack>
        {results.map(({ outfit, searchResults }) => (
          <Stack>
            <Text>{outfit.description}</Text>
            <Group>
              {searchResults.map((product) => (
                <ResultCard {...product} />
              ))}
            </Group>
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
