import { defineConfig } from "vite"
import swc from "unplugin-swc"
import viteReact from "@vitejs/plugin-react"
import swcReact from "vite-plugin-swc-react"

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  plugins: [swc.vite()]
})
