import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  prerender: [
    "/",
    "/about",
    "/work/ahaus-taxi",
    "/work/colony-detection",
    "/work/if-web-portal",
    "/writing/taste-over-skill",
    "/writing/why-pause",
  ],
} satisfies Config;
