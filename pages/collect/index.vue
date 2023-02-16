<template>
  <div class="collect">
    <el-empty class="empty" description="空空如也" />
  </div>
</template>

<script setup lang="ts">
import { ElEmpty } from 'element-plus'
</script>

<style lang="scss" scoped>
.collect {
  .empty {
    height: 50vh;
  }
}
</style>
