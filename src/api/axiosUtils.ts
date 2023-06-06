import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  // 配置請求頭
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

// 添加請求攔截器
request.interceptors.request.use(
  // 在發送請求之前做些什麼
  (config) => {
    console.log(config)
    return config
  },
  // 對請求錯誤做些什麼
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 添加響應攔截器
request.interceptors.response.use(
  // 對響應數據做點什麼
  (response) => {
    console.log('攔截回應: ', response.data)
    // 簡化數據
    return response.data
  },
  // 對響應錯誤做點什麼 處理 http 網路錯誤的
  (error) => {
    console.log(error)
    // message -> 存儲網路錯誤訊息
    let message = ''
    // http 狀態碼
    const status = error.response.status

    switch (status) {
      case 401:
        message = 'TOKEN過期'
        break
      case 403:
        message = '無權訪問'
        break
      case 404:
        message = '請求地址錯誤'
        break
      case 500:
        message = '服務器出現問題'
        break
      default:
        message = '網路出現問題'
        break
    }

    // 提示錯誤訊息
    ElMessage({
      type: 'error',
      message
    })

    return Promise.reject(error)
  }
)

// 導出 axios 實例
export default request
