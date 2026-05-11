// 导入axios
import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
// import router from './router'

interface ResponseData<T = any> {
  code: number
  msg?: string
  message?: string
  data?: T
  [key: string]: any
}

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API as string,
  timeout: 20 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 2.请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers = config.headers || {}
      config.headers.accessToken = token
    }
    return config
  },
  (error: AxiosError) => {
    console.log('request error: ', error)
    return Promise.reject(error)
  },
)

// 3.响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse<ResponseData>) => {
    if (res.data.code === 401) {
      ElMessage.error(res.data.msg || res.data.message || 'Unauthorized')
      // router.replace('/login')
      return Promise.reject(res.data) as any
    }
    return Promise.resolve(res.data)
  },
  (error: AxiosError<ResponseData>) => {
    console.log('response error: ', error)
    if (error.response?.data?.message) {
      ElMessage.error(error.response.data.message)
    }
    return Promise.reject(error)
  },
)

// get请求的封装
export function get<T = any>(url: string, params: Record<string, any> = {}): Promise<T> {
  return new Promise((resolve, reject) => {
    service({
      url,
      method: 'get',
      params,
    })
      .then((res: any) => {
        resolve(res as unknown as T)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

// post请求封装
export function post<T = any>(
  url: string,
  params: Record<string, any> = {},
  headers: Record<string, string> = { 'Content-Type': 'application/json' },
): Promise<T> {
  return new Promise((resolve, reject) => {
    service({
      url,
      method: 'post',
      data: params,
      headers,
    })
      .then((res: any) => {
        resolve(res as unknown as T)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

export default {
  get,
  post,
}
