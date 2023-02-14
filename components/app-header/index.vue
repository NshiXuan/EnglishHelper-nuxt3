<template>
  <div class="header">
    <!-- logo -->
    <div class="logo">EnglishHelper</div>

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
        <NuxtLink to="/exec">每日练习</NuxtLink>
      </el-menu-item>
      <el-menu-item index="collect">
        <NuxtLink to="/collect">收藏夹</NuxtLink>
      </el-menu-item>

      <!-- <el-sub-menu index="language">
        <template #title>语言</template>
        <el-menu-item index="cn">中文</el-menu-item>
        <el-menu-item index="en">En</el-menu-item>
      </el-sub-menu> -->

      <el-sub-menu index="avator">
        <template #title>
          <img class="avatar" src="@/assets/img/pinia.png" alt="个人中心" />
        </template>
        <el-menu-item index="logout">退出</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="login">
        <NuxtLink to="/login">登录/注册</NuxtLink>
        <!-- 登录/注册 -->
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { ElMenu, ElSubMenu, ElMenuItem } from 'element-plus'

export interface IProps {
  title?: string
}

// 配置props类型与默认值
const props = withDefaults(defineProps<IProps>(), {
  title: ''
})

// 刷新路由获取路径赋给currentIndex
const route = useRoute()
const currentIndex = ref(route.name as string)

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
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

  .el-menu {
    width: inherit;
    padding: 0 25px;
    justify-content: right;
    align-items: center;
    height: 80px;

    .el-menu-item {
      height: 80px;
      font-size: 16px;
      /* width: 100px; */
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
