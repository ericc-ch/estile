import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes"

export default [
  layout("./layouts/default.tsx", [
    index("./routes/home.tsx"),
    route("result", "./routes/result.tsx"),
  ]),
] satisfies RouteConfig
