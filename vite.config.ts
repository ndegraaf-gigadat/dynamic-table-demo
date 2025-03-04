import { sveltekit } from "@sveltejs/kit/vite";
import icons from "unplugin-icons/vite";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    sveltekit(),
    icons({
      compiler: "svelte",
    }),
  ],
  test: {
    env: {
      ...loadEnv("test", process.cwd(), ""),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      NODE_ENV: "test",
    },
    coverage: {
      all: true,
      exclude: [
        ".svelte-kit/*",
        "build",
        "tests/*",
        "src/routes/*",
        "src/lib/constants/*",
        "src/lib/stores/*",
        "**/*.test.ts",
        "**/*.d.ts",
        "**/*.config.{js,cjs,mjs,ts}",
        ".eslintrc.cjs",
      ],
      provider: "v8",
      reportOnFailure: true,
      reporter: ["html", "text"],
    },
    environment: "jsdom",
    globals: true,
    passWithNoTests: true,
    include: ["src/**/*.{test,spec}.{js,ts}"],
    server: {
      deps: {
        inline: ["@sveltejs/kit"],
      },
    },
  },
});
