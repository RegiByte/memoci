import { defineConfig } from "vite"
import swc from "unplugin-swc"
import wasm from "vite-plugin-wasm"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [swc.vite(), wasm()]
})
