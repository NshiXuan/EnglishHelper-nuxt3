import { defineStore } from 'pinia'
import { getCollectByUserId, ICollect } from '~~/service/collect'
import { getWordByName, IWord } from '~~/service/word'

export interface IHomeState {
  count?: number,
  word?: IWord,
  userId: number | undefined,
  collects: ICollect[]
}

export const useHomeStore = defineStore('home', {
  state: (): IHomeState => {
    return {
      count: 100,
      word: {},
      userId: undefined,
      collects: []
    }
  },
  actions: {
    // 获取单个单词数据
    async fetchWordByName(word: string) {
      const { data } = await getWordByName(word)
      this.word = data.value?.data
    },

    // 通过用户id获取收藏夹
    async fetchCollectByUserId(user_id: number) {
      getCollectByUserId(user_id).then(res => {
        // console.log(res.data.value?.data, 'res.data', user_id)
        res.data.value?.data ? this.collects = res.data.value?.data : ''
      })

    }

  }
})
