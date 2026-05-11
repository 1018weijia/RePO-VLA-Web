interface Params {
  [key: string]: any
}

// 定义 API 返回类型
type Response<T = any> = Promise<T>

type ApiMethod = (params: Params) => Response

export interface API {
  [key: string]: ApiMethod
}
