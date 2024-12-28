import { ofetch } from "ofetch"

import { BACKEND_URL } from "~/lib/env"

export interface ResponseBase<T> {
  data: T
}

export const api = ofetch.create({
  baseURL: `${BACKEND_URL}/api`,
})
