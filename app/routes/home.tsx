import type { Route } from "./+types/home"

export function loader() {
  return { env: process.env }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  console.log(loaderData)

  return <h1>title</h1>
}
