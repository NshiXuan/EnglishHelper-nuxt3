import sxRequest, { IResultData } from './index'
import { IUser } from './user'
import { IWord } from './word'


export interface ICollect {
  id?: number
  userId?: number
  name?: string
}

export interface ICollectWord {
  id?: number
  name?: string
  user?: IUser
  words?: IWord[]
}

// 通过用户id获取用户收藏夹
export const getCollectByUserId = (user_id: number) => {
  return sxRequest.get<IResultData<ICollect[]>>('/collects/user', {
    user_id
  })
}

// 通过收藏夹名称获取收藏夹单词
export const getWordByCollectName = (name: string) => {
  return sxRequest.get<IResultData<ICollectWord>>('/collects/name', {
    name
  })
}

// 收藏单词
export const collectWordAPI = (collect_id: number, word_id: number) => {
  return sxRequest.post<IResultData<any>>('/collects/word', {
    collect_id,
    word_id
  })
}

// 添加收藏夹
export const addCollectAPI = (user_id: number, name: string) => {
  return sxRequest.post<IResultData<any>>('/collects', {
    user_id,
    name
  })
}

// 删除收藏夹
export const deleteCollectAPI = (id: number) => {
  return sxRequest.delete<IResultData<any>>('/collects/delete', {
    id
  })
}
