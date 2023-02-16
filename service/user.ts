import sxRequest, { IResultData } from './index'


export interface IUser {
  id?: number
  username?: string
}

// 登录
export const loginApi = (username: string, password: string) => {
  return sxRequest.post<IResultData<IUser>>('/users/login', {
    username,
    password
  })
}

// 注册
export const registerApi = (username: string, password: string) => {
  return sxRequest.post<IResultData<IUser>>('/users/register', {
    username,
    password
  })
}

