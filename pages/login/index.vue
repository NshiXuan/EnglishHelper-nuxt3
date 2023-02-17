<template>
  <div id="modal">
    <div id="modal-content">
      <!-- 选择标签 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="登录" name="login"></el-tab-pane>
        <el-tab-pane label="注册" name="register"></el-tab-pane>
      </el-tabs>

      <!-- 登录输入框 -->
      <div id="login">
        <el-row class="input-line">
          <el-col :span="4"><span class="text">账号：</span></el-col>
          <el-col :span="20">
            <el-input v-model="username" placeholder="请输入账号"></el-input>
          </el-col>
        </el-row>
        <el-row class="input-line">
          <el-col :span="4"><span class="text">密码：</span></el-col>
          <el-col :span="20">
            <el-input
              v-model="password"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-col>
          <el-button type="primary" id="login-btn" @click="handleLogin"
            >登录</el-button
          >
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ElButton,
  ElCol,
  ElInput,
  ElRow,
  ElTabs,
  ElTabPane,
  ElMessage
} from 'element-plus'
import { loginApi, registerApi } from '@/service/user'
import { useHomeStore } from '~~/store/home'

// definePageMeta({ layout: 'login' })

const activeName = ref('login')
const username = ref('')
const password = ref('')

const router = useRouter()

// 获取store
const homeStore = useHomeStore()

// 点击选择标签
function handleTabClick() {
  console.log(activeName.value)
}

// 登录
function handleLogin() {
  if (username.value === '' && password.value === '') {
    return ElMessage.warning('请输入账号密码')
  }

  if (activeName.value === 'login') {
    // 登录
    loginApi(username.value, password.value).then((res) => {
      // console.log(res.data.value?.data)
      // 登陆失败
      if (res.data.value?.msg) {
        ElMessage({
          message: res.data.value?.msg,
          type: 'error'
        })
      }

      // 登陆成功后把用户id存到LocalStorage
      if (res.data.value?.data?.id) {
        if (process.client) {
          window.localStorage.setItem(
            'en-userId',
            JSON.stringify(res.data.value?.data.id)
          )
        }

        // 把userId存储到store中
        homeStore.userId = res.data.value?.data.id

        ElMessage({
          message: '登陆成功',
          type: 'success'
        })

        // 跳转页面并刷新
        // router.replace('/')
        location.replace('/')
      }

      return
    })
  } else {
    // 注册
    registerApi(username.value, password.value).then((res) => {
      if (res.data.value?.code === 0) {
        ElMessage({
          message: '注册成功，请登录！',
          type: 'success'
        })
      } else {
        // 注册失败
        ElMessage({
          message: res.data.value?.msg,
          type: 'error'
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
:deep .el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}

#copyright {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
}

.hide {
  visibility: hidden;
  opacity: 0;
}

#modal {
  z-index: 999;
  text-align: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: linear-gradient(to left, gray, white);
  background-size: 400%;
  animation: myanimation 10s infinite;
}

@keyframes myanimation {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

#modal-content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 5px;
  transition: all 0.3s ease;
  padding: 25px;

  h1 {
    margin-top: 10px;
  }
}

#login {
  width: 340px;
  position: absolute;
  left: 50%;
  top: 53%;
  transform: translate(-50%, -50%);

  .input-line {
    margin: 15px;

    .text {
      line-height: 40px;
    }
  }

  #login-btn {
    margin: 10px auto;
    width: 150px;
  }
}
</style>
