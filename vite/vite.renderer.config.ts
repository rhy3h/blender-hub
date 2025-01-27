import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig } from 'vite'
import { pluginExposeRenderer } from './vite.base.config'

import path from 'path'

import vue from '@vitejs/plugin-vue'
import alias from '@rollup/plugin-alias'

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<'renderer'>
  const { root, mode, forgeConfigSelf } = forgeEnv
  const name = forgeConfigSelf.name ?? ''

  return {
    root,
    mode,
    base: './',
    build: {
      outDir: `.vite/renderer/${name}`
    },
    plugins: [pluginExposeRenderer(name), vue(), alias()],
    resolve: {
      preserveSymlinks: true
    },
    clearScreen: false
  } as UserConfig
})
