import sxRequest, { IResultData } from './index'

export interface ISentence {
  id?: number
  sentence?: string
  sentence_cn?: string
}

export interface IWord {
  id?: number
  word?: string
  level?: string
  mean_cn?: string
  sentences?: ISentence[]
}

export const getWordByName = (word: string) => {
  return sxRequest.get<IResultData<IWord>>('/words', {
    word
  })
}
