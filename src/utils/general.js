import { add, subtract, multiply, divide, format, bignumber } from 'mathjs'

// 目前環境
export const env = () => import.meta.env.VITE_NODE_ENV

// 產生亂數 ID
export const genID = (length) => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

// base64 轉換成 Uint8Array
// dataURI 可以是有前綴或是無前綴的 base64，例如：
// => data:application/pdf;base64,JVBERi0xLjQKJfbk/N8KMSAwIG9ia...
// => JVBERi0xLjQKJfbk/N8KMSAwIG9ia...
export const convertBase64ToUint8Array = (dataURI) => {
  const BASE64_MARKER = ';base64,'

  if (dataURI.includes(BASE64_MARKER)) {
    const parts = dataURI.split(BASE64_MARKER)
    dataURI = parts[1]
  }

  const raw = window.atob(dataURI)
  const rawLength = raw.length
  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return uInt8Array
}

// 進位轉換 (input: number, return number)
// round => 四捨五入
// floor => 無條件捨去
// ceil => 無條件進位
export const safeRound = (val, digit, method = 'round') => {
  if (val % 1 !== 0) {
    val = parseFloat(val.toPrecision(15))
  }

  const ratio = Math.pow(10, digit)
  let temp = val * ratio

  if (temp % 1 !== 0) {
    temp = parseFloat(temp.toPrecision(15))
  }

  return Math[method](temp) / ratio
}

// 精確計算 (input: number, return string)
export const preciseCalc = (num1, num2, operator) => {
  num1 = bignumber(num1)
  num2 = bignumber(num2)

  let answer
  switch (operator) {
    case '+':
      answer = add(num1, num2)
      break
    case '-':
      answer = subtract(num1, num2)
      break
    case '*':
      answer = multiply(num1, num2)
      break
    case '/':
      answer = divide(num1, num2)
      break
  }

  return format(answer, { precision: 15 })
}

// 小數點補 0 (input: string, return: string)
// 只能補 0，不能用來 round，要先用 safeRound 處理後再使用
export const decimalPadZero = (num, digit = 2) => {
  const numStr = num.toString()
  const numStrArr = numStr.split('.')

  if (numStrArr.length === 1) {
    return numStr + '.' + '0'.repeat(digit)
  }

  if (numStrArr.length === 2) {
    const decimal = numStrArr[1]
    const decimalLen = decimal.length

    if (decimalLen < digit) {
      return numStr + '0'.repeat(digit - decimalLen)
    }

    return numStr
  }
}

// 延遲時間
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
