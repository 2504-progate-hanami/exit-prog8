import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("box", "routes/box.tsx"),
  route("signin", "routes/signin.tsx"),
  route("signup", "routes/signup.tsx"),
  route("forgot", "routes/forgot.tsx"),
  route("reset-password", "routes/reset-password.tsx"),
] satisfies RouteConfig;
