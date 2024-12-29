import { Card, Image } from "@mantine/core"

import type { ProductInfo } from "~/services/search/service"

export const ResultCard = (props: ProductInfo) => {
  return (
    <Card>
      <Image src={props.imageUrl} />
    </Card>
  )
}
