import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    include: ["**/*.spec.ts"],
    exclude: ["src/runtime/bun/**/*.ts"],
    sequence: {
      shuffle: false,
      concurrent: false,
    },
  },
});
