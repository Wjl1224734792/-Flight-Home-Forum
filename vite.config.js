import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // ✅ 添加此行以引入 path 模块

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/publicVariables.scss" as *;',
      }
    },
  },
  //配置根路径 @
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
