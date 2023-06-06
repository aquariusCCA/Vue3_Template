// src/mocks/handlers.ts
import { rest } from 'msw'
import { get } from 'idb-keyval'

const base_api = import.meta.env.VITE_BASE_API

/** 假資料處理 */
async function baseResolver(req, res, ctx) {
  // 若請求參數mode不為test，則不取假資料
  if (req.url.searchParams.get('mode') !== 'test') {
    return req.passthrough()
  }

  // 取得在seeds.js裡設定的假資料
  const data = await get(req.url.pathname)
  return res(ctx.status(200), ctx.json(data))
}

/** 模擬API傳出的請求，並設定API模擬回應 */
export const handlers = [
  rest.post(`${base_api}/democrs/cheque/GetChequeList`, baseResolver)
]
