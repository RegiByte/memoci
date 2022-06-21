import { defineConfig } from "vite"
import swc from "unplugin-swc"
import wasm from "vite-plugin-wasm"
import markdown, { Mode } from "vite-plugin-markdown"
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig(async () => {
  return {
    plugins: [
      markdown({
        mode: [Mode.HTML, Mode.TOC, Mode.REACT],
        markdown(body) {
          return body
        }
      }),
      swc.vite(),
      svelte(),
      wasm()
    ]
  }
})
