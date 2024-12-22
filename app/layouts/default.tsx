import { Stack } from "@mantine/core"
import { Outlet } from "react-router"

export default function DefaultLayout() {
  return (
    <Stack
      gap="xl"
      justify="center"
      style={{
        width: "min(100% - 3rem, 600px)",
        minHeight: "100svh",

        marginInline: "auto",
      }}
    >
      <Outlet />
    </Stack>
  )
}
