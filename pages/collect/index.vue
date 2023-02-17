<template>
  <div class="collect wrap-v1">
    <div v-if="collects.length > 0">
      <template v-for="item in collects">
        <div class="collect-item" v-if="!words">
          <div class="right" @click="handleCollect(item)">
            {{ item.name }}
          </div>
          <div class="left" @click="handleDelete(item)">x</div>
        </div>
      </template>

      <template v-for="item in words" v-if="words?.length">
        <div class="word" @click="handleClickWord(item)">
          <span>{{ item.word }}</span>
          <span class="cn">{{ item.mean_cn }}</span>
        </div>
      </template>
    </div>

    <el-empty class="empty" description="空空如也" v-else />

    <div class="add" v-if="!words?.length">
      <el-button link @click="handleAdd">添加收藏夹</el-button>
    </div>
  </div>

  <!-- 弹框 -->
  <el-dialog
    class="dialog"
    v-model="dialogVisible"
    title="添加收藏夹"
    width="30%"
    :show-close="false"
  >
    <el-input v-model="collectName" placeholder="请收藏夹名称" clearable />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  ElEmpty,
  ElDialog,
  ElButton,
  ElInput,
  ElMessage,
  ElMessageBox
} from 'element-plus'
import { storeToRefs } from 'pinia'
import {
  getWordByCollectName,
  ICollect,
  addCollectAPI,
  deleteCollectAPI
} from '~~/service/collect'
import { IWord } from '~~/service/word'
import { useHomeStore } from '~~/store/home'

// 从store中获取用户id
const homeStore = useHomeStore()
const { userId, collects } = storeToRefs(homeStore)

// 定义单词列表
// 如果直接分配一个数组为nerver[]
const words = ref<IWord[]>()

// 控制显示对话框
const dialogVisible = ref(false)

// 添加收藏夹的收藏夹名称
const collectName = ref('')

// 获取用户收藏夹
if (userId.value) {
  console.log(userId.value, 'userId.value')
  homeStore.fetchCollectByUserId(userId.value)
}

// 点击添加收藏夹
function handleAdd() {
  if (!userId.value) {
    ElMessage.warning('请登录')
  } else {
    dialogVisible.value = true
  }
}

// 删除收藏夹
function handleDelete(item: ICollect) {
  ElMessageBox.confirm('确定删除该收藏夹吗', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      deleteCollectAPI(item.id as number).then((res) => {
        console.log(res.data.value)
        if (res.data.value?.code === 0) {
          ElMessage.success('删除成功')
          // 刷新收藏夹列表
          homeStore.fetchCollectByUserId(userId.value as number)
        } else {
          console.log('ssssss')
          ElMessage.error(res.data.value?.msg)
          // 刷新收藏夹列表
          homeStore.fetchCollectByUserId(userId.value as number)
        }
      })
    })
    .catch(() => {})
}

// 点击进入收藏夹
function handleCollect(item: ICollect) {
  // 点击获取收藏夹的单列表
  getWordByCollectName(item.name as string).then((res) => {
    console.log(res.data.value?.data)
    if (!res.data.value?.data) {
      ElMessage.warning('该收藏夹还没有收藏如何单词哦')
    }
    words.value = res.data.value?.data.words
  })
}

// 点击单词进入单词详细页面
function handleClickWord(item: IWord) {
  console.log(item)

  // 发请求获取单词详细数据
  homeStore.fetchWordByName(item.word as string)

  // 如果是其它页面回到首页 这里直接跳转首页刷新高亮
  location.replace('/')
}

// 确定
function handleConfirm() {
  if (userId.value) {
    addCollectAPI(userId.value, collectName.value).then((res) => {
      if (res.data.value?.code === 0) {
        ElMessage.success('添加成功')
        // 刷新收藏夹列表
        homeStore.fetchCollectByUserId(userId.value as number)

        // 重置添加收藏夹的名称
        collectName.value = ''
        dialogVisible.value = false
      } else {
        ElMessage.error(res.data.value?.msg)
      }
    })
  }
}

// 取消
function handleCancel() {
  // 重置添加收藏夹的名称
  collectName.value = ''
  dialogVisible.value = false
}
</script>

<style lang="scss" scoped>
.collect {
  margin-top: 20px;
  height: 48vh;

  .collect-item:hover {
    cursor: pointer;
  }

  .collect-item,
  .word {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    font-size: 30px;
    color: purple;
    border-bottom: 1px solid #ccc;

    .cn {
      color: black;
      font-size: 20px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .collect-item {
    .right {
      width: 900px;
    }
  }

  .empty {
    height: 50vh;
  }

  .add {
    display: flex;
    justify-content: center;
    margin: 20px auto;
  }
}
</style>
