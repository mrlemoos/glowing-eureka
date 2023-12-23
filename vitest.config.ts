/// <reference types="vitest" />

import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const configuration = defineConfig({
  test: {
    environment: "jsdom",
    clearMocks: true,
  },
  plugins: [react()],
  resolve: {
    alias: [{ find: "@root", replacement: resolve(__dirname, "./src") }],
  },
});

export default configuration;
