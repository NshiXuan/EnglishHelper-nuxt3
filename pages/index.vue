<template>
  <div class="home wrap-v1">
    home
  </div>
</template>

<script setup lang="ts">

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