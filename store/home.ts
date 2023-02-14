import { defineStore } from 'pinia'
import { getWordByName, IWord } from '~~/service/word'

export interface IHomeState {
  count?: number,
  word?: IWord
}

export const useHomeStore = defineStore('home', {
  state: (): IHomeState => {
    return {
      count: 100,
      word: {}
    }
  },
  actions: {
    // 获取单个单词数据
    async fetchWordByName(word: string) {
      const { data } = await getWordByName(word)
      this.word = data.value?.data
    }
  }
})
