import App from './App.vue'
import { createApp } from 'vue'

// 引入 ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// ElementPlus 國際化配置
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'

// 引入 pinia
import { createPinia } from 'pinia'
// 引入 pinia-plugin-persistedstate
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 引入 Router
import router from './router/index.js'

// 引入樣式
import './assets/style/index.scss'

// 引入 Service Worker
import { worker } from './mocks/browser'

// 引入假資料
import { setSeeds } from '@/mocks/seeds'

// 開發環境可使用 API 假資料
if (import.meta.env.DEV) {
  // 注入假資料
  setSeeds()

  // 註冊 Mock Service Worker 實例
  worker.start({
    /** 在瀏覽器的控制台中禁用匹配請求的日誌記錄 */
    quiet: true,
    /** 指定如何處理請求處理程序中未列出的請求 */
    onUnhandledRequest: 'bypass'
  })
}

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhTw
})
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)

app.mount('#app')
