import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // 新しいルートを追加
  index("routes/lp.tsx"),

  route("signin", "routes/signin.tsx"),
  route("signup", "routes/signup.tsx"),
  route("forgot", "routes/forgot.tsx"),
  route("reset-password", "routes/reset-password.tsx"),

  route("home", "routes/home.tsx"),

  route("problems/:id", "routes/problems.tsx"),
  route("problems/:id/intro/:index", "routes/problemIntro.tsx"),
  // route("explain", "routes/detailGame.tsx"),

  route("congrats", "routes/congrats.tsx"),

  route("box", "routes/box.tsx"),
] satisfies RouteConfig;
