import { useMutation } from "@tanstack/react-query"

import { api, type ResponseBase } from "../api"

export interface ProductInfo {
  id: string
  title: string
  price: string
  shipping: string
  location: string
  condition: string
  link: string
  imageUrl: string
}

export interface SearchOptions {
  query: string
}

export type SearchResponse = ResponseBase<Array<ProductInfo>>

function searchProduct(options: SearchOptions) {
  return api<SearchResponse>("/search", {
    method: "POST",
    body: options,
  })
}

export const useSearchProduct = () => {
  return useMutation({
    mutationFn: searchProduct,
  })
}

// Keeping this for future reference
// export const SEARCH_QUERIES = {
//   all: () => queryOptions({ queryKey: ["search"] }),
//   search: (options: SearchOptions) =>
//     queryOptions({
//       queryKey: [SEARCH_QUERIES.all().queryKey, options] as const,
//       queryFn: ({ queryKey: [, options] }) => searchProduct(options),
//     }),
// }
