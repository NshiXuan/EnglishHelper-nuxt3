<template>
  <div class="home wrap-v1">
    <ElButton>home</ElButton>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'

export interface IProps {
  title?: string,
}

// 配置props类型与默认值
const props = withDefaults(defineProps<IProps>(), {
  title: ''
})
</script>

<style lang="scss" scoped>

</style>