import { AsyncData, UseFetchOptions } from "nuxt/dist/app/composables";

type Methods = "GET" | "POST" | "DELETE" | "PUT"

export interface IResultData<T> {
  code: number,
  data: T,
  msg?: string
}

const BASE_URL = "http://43.138.161.206:9999"
// const BASE_URL = "http://localhost:9999"

class SXRequest {
  // T代表响应结果类型 就是解构 {data} 的类型
  request<T = any>(
    url: string,
    method: Methods,
    data?: any,
    options?: UseFetchOptions<T>
  ): Promise<AsyncData<T, Error>> {
    return new Promise((resolve, reject) => {
      const newOptions: UseFetchOptions<T> = {
        baseURL: BASE_URL,
        method: method,
        ...options
      }
      if (method === "GET" || method === "DELETE") {
        newOptions.query = data // query -> params
      }
      if (method === "POST") {
        newOptions.body = data
      }

      useFetch<T>(url, newOptions as any)
        .then((res) => {
          // res => { data: T, pending, error: Error...} => AsyncData
          resolve(res as AsyncData<T, Error>)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
    return this.request<T>(url, "GET", params, options)
  }

  post<T = any>(url: string, data?: any, options?: UseFetchOptions<T>) {
    return this.request<T>(url, "POST", data, options)
  }

  delete<T = any>(url: string, data?: any, options?: UseFetchOptions<T>) {
    return this.request<T>(url, "DELETE", data, options)
  }
}

export default new SXRequest()
