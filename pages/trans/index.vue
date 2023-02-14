<template>
  <div class="trans">
    <div class="content wrap-v1">
      <el-input
        v-model="enValue"
        :rows="7"
        type="textarea"
        placeholder="请输入英文"
      />

      <el-button type="primary" @click="handleTrans">翻译</el-button>

      <el-input v-model="cnValue" :rows="7" type="textarea" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElButton, ElInput } from 'element-plus'
import { getTrans } from '~~/service/tran'

const enValue = ref('')
const cnValue = ref('')

// 翻译
function handleTrans() {
  getTrans('hello').then((res) => {
    console.log(res, 'tranres')
    alert('调用第三方接口跨域')
  })
}
</script>

<style lang="scss" scoped>
.trans {
  margin: 20px;
  height: 55vh;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }
}
</style>
