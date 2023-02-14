<template>
  <div class="home wrap-v1">
    <div class="word">{{ word?.word }}</div>
    <div>{{ word?.mean_cn }}</div>
    <div>{{ word?.level }}</div>
    <div>{{ word?.sentences[0].sentence_cn }}</div>
  </div>
</template>

<script setup lang="ts">
import { getWordByName, IWord } from '~~/service/word'

export interface IProps {
  title?: string
}

// 配置props类型与默认值
const props = withDefaults(defineProps<IProps>(), {
  title: ''
})

const word = ref<IWord>()

// 请求获取单词数据

getWordByName('hello').then((res) => {
  console.log(res.data.value?.data, 'res')
  word.value = res.data.value?.data
})
</script>

<style lang="scss" scoped></style>
