import App from './App.vue'
import { createApp } from 'vue'

// 引入 ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// ElementPlus 國際化配置
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhTw
})

app.mount('#app')
