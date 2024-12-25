interface ProductSpecification {
  name: string
  value: string
}

interface Variation {
  name: string
  variations: Array<string>
}

interface ProductVariation {
  name: string
  value: string
}

export interface Product {
  url: string
  title: string
  rating: string
  reviews: number
  initial_price: number
  final_price: number
  currency: string
  image: Array<string>
  seller_name: string
  breadcrumb: Array<string>
  product_specifications: Array<ProductSpecification>
  product_description: string
  seller_ratings: number
  seller_ship_on_time: string
  seller_chat_response: string
  sku: string
  mpn: string
  colors: Array<string>
  variations: Array<Variation>
  color: string
  returns_and_warranty: Array<string>
  is_super_seller: boolean
  promotions: Array<string>
  brand: string
  stock: boolean
  shop_url: string
  product_variation: Array<ProductVariation>
  lazmall: boolean
  domain: string
  number_sold: number
  gmv: number
}
