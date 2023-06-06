import { merge } from 'lodash-es'
import request from './axiosUtils'
import { env } from '@/utils/general.js'
import { AxiosInstance } from 'axios'

// 打包後的 dist 不含 proxy server，所以要直接用 VITE_BASE_API 代換 API 路徑
const slug = import.meta.env.VITE_BASE_API

// 打包後的 dist 不含 proxy server，所以要直接用 VITE_BASE_API 代換 API 路徑
const apiUtil = (instance: AxiosInstance) => ({
  get: (url: string, mode: string, config?: object) => {
    url = `${slug}${url}`
    if (mode === 'test' && env() === 'development') {
      return instance.get(url, merge({ params: { mode: 'test' } }, config))
    }
    return instance.get(url, config)
  },
  post: (
    url: string,
    data: object | string,
    mode?: string,
    config?: object
  ) => {
    url = `${slug}${url}`
    console.log('url', url)
    if (mode === 'test' && env() === 'development') {
      return instance.post(
        url,
        data,
        merge({ params: { mode: 'test' } }, config)
      )
    }
    return instance.post(url, data, config)
  },
  put: (url: string, data: object | string, mode?: string, config?: object) => {
    url = `${slug}${url}`
    if (mode === 'test' && env() === 'development') {
      return instance.put(
        url,
        data,
        merge({ params: { mode: 'test' } }, config)
      )
    }
    return instance.put(url, data, config)
  },
  delete: (url: string, mode?: string, config?: object) => {
    url = `${slug}${url}`
    if (mode === 'test' && env() === 'development') {
      return instance.delete(url, merge({ params: { mode: 'test' } }, config))
    }
    return instance.delete(url, config)
  },
  patch: (
    url: string,
    data: object | string,
    mode?: string,
    config?: object
  ) => {
    url = `${slug}${url}`
    if (mode === 'test' && env() === 'development') {
      return instance.patch(
        url,
        data,
        merge({ params: { mode: 'test' } }, config)
      )
    }
    return instance.patch(url, data, config)
  }
})

export default apiUtil(request)
