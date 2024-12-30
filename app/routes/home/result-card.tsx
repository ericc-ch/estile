import { Button, Card, Image, Text } from "@mantine/core"

import type { ProductInfo } from "~/services/search/service"

export const ResultCard = (props: ProductInfo) => {
  return (
    <Card
      withBorder
      component="a"
      style={{
        flexShrink: 0,
        width: 300,
        minHeight: "100%",
      }}
    >
      <Card.Section component="a" href={props.link}>
        <Image h={200} mah={200} mih={200} src={props.imageUrl} />
      </Card.Section>

      <Text component="a" href={props.link} my="sm" size="sm" td="underline">
        {props.title}
      </Text>

      <Text fw="bold" size="xl">
        {props.price}
      </Text>

      <Text fw={600} size="lg">
        {props.shipping}
      </Text>

      <Text mt={8}>Location: {props.location ? props.location : "N/A"}</Text>
      <Text mb={8}>Condition: {props.condition}</Text>

      <Button component="a" href={props.link} mt="auto">
        View Item
      </Button>
    </Card>
  )
}
