import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import eslintPlugin from 'vite-plugin-eslint'
import dts from 'vite-plugin-dts'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { resolve } from 'path'
import dayjs from 'dayjs'

const pkg = require('./package.json')

const banner = `/**
 * ${pkg.name} ${pkg.version}
 * (c) ${dayjs().format('YYYY-DD-MM')} - ${pkg.author}
 * @license ${pkg.license}
 * @author ${pkg.author}
 */`

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    lib: {
      entry: resolve(__dirname, './packages/index.ts'),
      name: 'index',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['vue', 'vue-router'],
      output: {
        banner: banner,
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter'
        }
      }
    }
  },
  plugins: [
    vue(),
    // jsx tsx 支持
    vueJsx(),
    dts({ include: './packages' }),
    eslintPlugin({
      include: [
        'src/**/*.js',
        'src/**/*.ts',
        'src/**/*.vue',
        'src/*.js',
        'src/*.ts',
        'src/*.vue',
        'packages/**/*.js',
        'packages/**/*.ts',
        'packages/**/*.d.ts',
        'packages/**/*.tsx',
        'packages/*.js',
        'packages/*.ts',
        'packages/*.d.ts',
        'packages/*.tsx'
      ]
    })
  ],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
})
