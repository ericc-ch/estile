import type { Product } from "./types"

export async function productSearch(query: string) {
  await new Promise((resolve) => setTimeout(resolve, 2_000))

  return response
}

const response: Array<Product> = [
  {
    url: "https://www.lazada.co.th/products/kool-ac-1601-i2350856583-s21625354243.html",
    title:
      "Kool+ พัดลมไอเย็น AC-1601 พัดลมไอน้ำ พัดลม รีโมท พัดลมแอร์เย็นๆ แอร์เคลื่อนที่ (สีขาว)",
    rating: "4.2",
    reviews: 11,
    initial_price: 9980,
    final_price: 4930,
    currency: "THB",
    image: [
      "https://img.lazcdn.com/g/p/07cf1a89373334976277bbe351660de5.jpg_720x720q80.jpg_.webp",
      "https://img.lazcdn.com/g/p/07cf1a89373334976277bbe351660de5.jpg_80x80q80.jpg_.webp",
      "https://img.lazcdn.com/g/p/61f35f11377109542a33d71a1dfa1f60.jpg_80x80q80.jpg_.webp",
      "https://img.lazcdn.com/g/p/70aadb8e4abe62cb2454b772154a84d9.jpg_80x80q80.jpg_.webp",
      "https://img.lazcdn.com/g/p/219d02a432f5e0240cfff4dbc5499643.jpg_80x80q80.jpg_.webp",
      "https://img.lazcdn.com/g/p/c353dca20d11a56b9f21ea321d78aaa7.jpg_80x80q80.jpg_.webp",
      "https://img.lazcdn.com/g/p/f2d0803a948040a4662f6bb979f92a3f.jpg_80x80q80.jpg_.webp",
      "https://img.lazcdn.com/g/p/946f636f23ad6ab1a34da95e7049dd73.jpg_80x80q80.jpg_.webp",
      "https://img.lazcdn.com/g/p/4c469cdf6020f849339f3406bc239093.jpg_80x80q80.jpg_.webp",
    ],
    seller_name: "KASHIWA",
    breadcrumb: [
      "Small Appliances",
      "Small Cooling & Air Treatment",
      "Air Coolers",
    ],
    product_specifications: [
      { name: "Brand", value: "Kashiwa" },
      { name: "SKU", value: "2350856583_TH-21625354243" },
      { name: "Room Size", value: "15" },
      { name: "Air Cooler Features", value: "Remote Control,Wheels included" },
      { name: "Tank Capacity (L)", value: "45" },
      { name: "Product_License", value: "934-2558" },
      { name: "Warranty Type", value: "Warranty Available" },
    ],
    product_description:
      "Kashiwa 15. พัดลมไอเย็น simplus. พัดลมแอร์เย็น รีโมท. air cooler KOOL. แอร์เครื่อนที่. พัดลมแอร์",
    seller_ratings: 0.98,
    seller_ship_on_time: "99%",
    seller_chat_response: "98%",
    sku: "2350856583_TH-21625354243",
    mpn: "2350856583",
    colors: ["ขาว", "เขียว", "Orange"],
    variations: [
      {
        name: "Color Family",
        variations: ["ขาว", "เขียว", "Orange"],
      },
    ],
    color: "Orange",
    returns_and_warranty: [
      "100% Authentic",
      "Change of Mind",
      "30 Days Free Returns",
      "Warranty not available",
    ],
    is_super_seller: true,
    promotions: ["Min. spend ฿350"],
    brand: "Kashiwa",
    stock: true,
    shop_url:
      "https://www.lazada.co.th/shop/kashiwa/?itemId=2350856583&channelSource=pdp",
    product_variation: [
      {
        name: "Color Family",
        value: "Orange",
      },
    ],
    lazmall: true,
    domain: "https://www.lazada.co.th",
    number_sold: 31,
    gmv: 152830,
  },
]
