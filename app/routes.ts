import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("work/ahaus-taxi", "routes/work.ahaus-taxi.tsx"),
  route("work/colony-detection", "routes/work.colony-detection.tsx"),
  route("work/if-web-portal", "routes/work.if-web-portal.tsx"),
  route("writing/taste-over-skill", "routes/writing.taste-over-skill.tsx"),
  route("writing/why-pause", "routes/writing.why-pause.tsx"),
] satisfies RouteConfig;
