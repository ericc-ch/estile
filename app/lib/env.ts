// Not sure how to expose env variable in SPA mode
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000"
