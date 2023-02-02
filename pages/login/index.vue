<template>
  <div class="login">
    <h2>login</h2>
  </div>
</template>

<script setup lang="ts">
export interface IProps {
  title?: string,
}

// 指定使用布局
definePageMeta({
  // login页面指定使用哪个layout
  layout: 'login'
})

// 配置props类型与默认值
const props = withDefaults(defineProps<IProps>(), {
  title: ''
})
</script>

<style lang="scss" scoped>

</style>