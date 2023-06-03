import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve('./src') // 相对路径别名配置，使用 @ 代替 src
    }
  },
  // scss 全局變量的一個配置，沒有這個就無法使用全局變量
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "/src/assets/style/variable.scss";'
      }
    }
  }
})
