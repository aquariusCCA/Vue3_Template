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

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhTw
})
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)

app.mount('#app')
