import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 獲取各種環境下對應的變量
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve('./src') // 相对路径别名配置，使用 @ 代替 src
      }
    },
    //scss 全局變量的一個配置，沒有這個就無法使用全局變量
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "/src/assets/style/variable.scss";'
        }
      }
    },
    // 代理跨域配置
    server: {
      proxy: {
        [env.VITE_BASE_API]: {
          // 獲取數據的服務器地址設置
          target: env.VITE_GENERAL_API_URL,
          // 開啟代理，需要跨域。
          changeOrigin: true,
          // 路徑重寫
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
