<template>
  <div class="header">
    <!-- logo -->
    <div class="logo">EnglishHelper</div>

    <!-- 搜索框 -->
    <el-input
      class="search"
      v-model="searchValue"
      placeholder="请输入内容"
      clearable
      @keydown="handleKeydown"
    />

    <!-- 导航 -->
    <el-menu
      :default-active="currentIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="index">
        <NuxtLink to="/">首页</NuxtLink>
      </el-menu-item>
      <el-menu-item index="trans">
        <NuxtLink to="/trans">英汉翻译</NuxtLink>
      </el-menu-item>
      <el-menu-item index="exec">
        <NuxtLink to="/exec">每日一练</NuxtLink>
      </el-menu-item>
      <el-menu-item index="collect">
        <NuxtLink to="/collect">收藏夹</NuxtLink>
      </el-menu-item>

      <!-- <el-sub-menu index="language">
        <template #title>语言</template>
        <el-menu-item index="cn">中文</el-menu-item>
        <el-menu-item index="en">En</el-menu-item>
      </el-sub-menu> -->

      <el-sub-menu index="avator" v-if="userId">
        <template #title>
          <img class="avatar" src="@/assets/img/pinia.png" alt="个人中心" />
        </template>
        <el-menu-item index="logout" @click="handleLogout">退出</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="login" v-else>
        <NuxtLink to="/login">登录/注册</NuxtLink>
        <!-- 登录/注册 -->
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMenu, ElSubMenu, ElMenuItem, ElInput } from 'element-plus'
import { useHomeStore } from '~~/store/home'

// 刷新路由获取路径赋给currentIndex
const route = useRoute()
const currentIndex = ref(route.name as string)

// 搜索内容
const searchValue = ref('')

// 从store中获取action用于搜索时请求获取单词数据
const homeStore = useHomeStore()

// 获取登录态 用户id
// const { userId } = storeToRefs(homeStore)
const userId = ref(undefined)
if (process.client) {
  userId.value = JSON.parse(window.localStorage.getItem('en-userId') as any)

  // 把userId存到pinia中
  homeStore.userId = userId.value
}

// 获取路由
const router = useRouter()

// 选择导航
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// 退出登录
function handleLogout() {
  // 清除localStorag的登录态
  window.localStorage.removeItem('en-userId')
  userId.value = undefined

  // 让pinia周的userId为undefined
  homeStore.userId = undefined

  // 查询刷新页面
  location.replace('/')
}

// 按回车搜索
function handleKeydown(e: any) {
  // 如果是回车键
  if (e.keyCode === 13) {
    homeStore.fetchWordByName(searchValue.value)

    // 如果是其它页面回到首页
    router.push('/')

    // 高亮首页
    currentIndex.value = 'index'
  }
}
</script>

<style lang="scss" scoped>
:deep .el-input__wrapper {
  border-radius: 20px;
}

.header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  position: relative;

  .logo {
    position: absolute;
    top: 25px;
    left: 25px;
    color: red;
    font-size: 24px;
    font-weight: 700;
    z-index: 10;
  }

  .search {
    position: absolute;
    top: 25px;
    left: 270px;
    width: 300px;
    z-index: 10;
  }

  .el-menu {
    width: inherit;
    padding: 0 25px;
    justify-content: right;
    align-items: center;
    height: 80px;

    .el-menu-item {
      height: 80px;
      font-size: 16px;
    }

    .el-sub-menu {
      height: 80px;
      font-size: 16px;
    }

    .avatar {
      width: 50px;
      height: 50px;
      box-shadow: rgb(235, 235, 235) 0 0 0 2px;
      border-radius: 50%;
    }
  }
}
</style>
