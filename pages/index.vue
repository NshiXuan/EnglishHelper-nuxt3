<template>
  <!-- 如果word有数据就展示 -->
  <div class="home wrap-v1" v-if="word">
    <div class="word-wrapper">
      <div class="left">
        <!-- 播放图标 -->
        <svg
          t="1676380279063"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2736"
          data-darkreader-inline-fill=""
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="70"
          height="70"
          @click="handlePlay"
        >
          <path
            d="M640 1007.232v-134.72C788.8 819.648 896 679.04 896 512c0-166.912-107.2-307.584-256-360.448V16.768C860.672 73.728 1024 273.536 1024 512c0 238.528-163.328 438.336-384 495.232zM192 768c-106.048 0-192-86.016-192-192v-128a192 192 0 0 1 192-192h64L576 0v1024L256 768H192z m256 0V256l-128 128H192a64 64 0 0 0-64 64v128c0 35.392 28.608 64 64 64h128l128 128z m384-256c0 119.104-81.728 218.368-192 246.912v-136.64c38.144-22.208 64-63.04 64-110.272s-25.856-88.064-64-110.272v-136.64c110.272 28.48 192 127.744 192 246.912z"
            fill=""
            p-id="2737"
          ></path>
        </svg>

        <!-- 单词 -->
        <div class="word">
          <div class="name">{{ word?.word }}</div>
          <div class="mean_cn">{{ word?.mean_cn }}</div>
        </div>
      </div>

      <div class="right">
        <!-- 收藏 -->
        <el-rate
          v-model="starValue"
          :max="1"
          clearable
          @click="handleClickRate"
        />
      </div>
    </div>

    <div class="title">
      <span class="label">例句</span>
    </div>
    <div class="sentences">
      <template v-for="item in word?.sentences" :key="item.id">
        <div class="info">
          <div class="sentence">
            {{ item.sentence }}
          </div>
          <div class="sentence_cn">
            {{ item.sentence_cn }}
          </div>
        </div>
      </template>
    </div>

    <!-- 播放器 -->
    <!-- <audio ref="audioRef" controls :autoplay="true"></audio> -->
    <audio ref="audioRef"></audio>
  </div>

  <!-- 如果word没有数据 -->
  <el-empty class="empty" description="空空如也" v-else />

  <!-- 弹框 -->
  <el-dialog
    class="dialog"
    v-model="dialogVisible"
    title="收藏夹"
    width="30%"
    :show-close="false"
  >
    <div class="collects">
      <div>
        <el-radio-group class="collects-list" v-model="collectId">
          <el-radio v-for="item in collects" :label="item.id">{{
            item.name
          }}</el-radio>
        </el-radio-group>
      </div>
    </div>

    <div v-if="!collects.length">请到收藏夹页面添加收藏夹</div>
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
  ElRate,
  ElEmpty,
  ElDialog,
  ElButton,
  ElMessage,
  ElRadioGroup,
  ElRadio
} from 'element-plus'
import { storeToRefs } from 'pinia'
import { ICollect, collectWordAPI } from '~~/service/collect'
import { useHomeStore } from '~~/store/home'

// 从store中获取单词数据
const homeStore = useHomeStore()
const { word, userId, collects } = storeToRefs(homeStore)

// 获取播放标签实例
const audioRef = ref<HTMLAudioElement>()

// 收藏展示的亮度 1高亮选择 0不选中
const starValue = ref()

// 请求获取单词数据
homeStore.fetchWordByName('hello')

// 控制显示对话框
const dialogVisible = ref(false)

// 控制收藏夹的选中
// const checked = ref(false)
// 收藏夹id
const collectId = ref(0)

// 播放
function handlePlay() {
  audioRef.value!.src = `http://baicizhan.qiniucdn.com/word_audios/${word?.value?.word}.mp3`
  audioRef.value?.play()
}

// 点击收藏
function handleClickRate() {
  // 显示对话框
  dialogVisible.value = true

  // 获取用户收藏夹列表
  if (userId.value) {
    homeStore.fetchCollectByUserId(userId.value)
  }
}

// 确定加入收藏夹
function handleConfirm() {
  // 如果没有收藏夹直接隐藏弹框
  if (!collects.value.length) {
    dialogVisible.value = false
  } else if (collectId.value === 0) {
    // 如果为0 说明没选中
    ElMessage.warning('请选择收藏夹')
  } else {
    // 发请求加入收藏夹
    if (userId.value) {
      collectWordAPI(collectId.value, word?.value?.id as number).then((res) => {
        if (res.data.value?.code === 0) {
          ElMessage.success('添加成功')

          // 重置弹框中文件夹的选中状态与收藏夹ID
          // checked.value = false
          collectId.value = 0
          dialogVisible.value = false
        } else {
          ElMessage.error(res.data.value?.msg)
        }
      })
    }
  }
}

// 取消
function handleCancel() {
  // 重置弹框中文件夹的选中状态与收藏夹ID
  // checked.value = false
  collectId.value = 0

  dialogVisible.value = false
}
</script>

<style lang="scss" scoped>
:deep .el-icon svg {
  width: 50px;
  display: block;
  height: 50px;
}

.home {
  /* margin-bottom: 100px; */
  min-height: 55vh;

  .word-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .icon {
        color: blue;
        &:hover {
          cursor: pointer;
        }
      }

      .word {
        .name {
          margin: 40px;
          font-size: 50px;
          color: purple;
        }
        .mean_cn {
          margin: 30px 50px;
        }
      }
    }
  }

  .title {
    border-bottom: 3px solid purple;
    margin-top: 30px;

    .label {
      display: block;
      width: 50px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      background-color: purple;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }

  .sentences {
    margin: 10px;

    .info {
      margin-bottom: 20px;
      .sentence {
        margin-bottom: 10px;
      }

      .sentence_cn {
        border-bottom: 1px solid #ccc;
        padding: 20px 0;
      }
    }
  }
}

.empty {
  height: 50vh;
}

.dialog {
  collects-list {
    display: flex;
    flex-direction: column;
  }
}
</style>
