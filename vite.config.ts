import { execSync } from "child_process";
import { resolve } from "path";
import { defineConfig } from "vite";

const root = import.meta.dirname!;

const htmlFiles = execSync("git ls-files '*.html'", { encoding: "utf-8" })
  .trim()
  .split("\n")
  .filter(Boolean);

const input: Record<string, string> = {};
for (const file of htmlFiles) {
  const key = file.replace(/\.html$/, "").replaceAll("/", "-");
  input[key] = resolve(root, file);
}

export default defineConfig({
  build: {
    rollupOptions: {
      input,
    },
  },
});
