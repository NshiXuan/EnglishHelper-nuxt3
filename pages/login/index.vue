<template>
  <div class="login">
    <div class="box1">
      <h2 class="h2">login</h2>
    <div class="input-box">
      <label>账号</label>
      <input class="input" type="text">
    </div>
    <div class="input-box">
      <label>密码</label>
      <input class="input" type="password">
    </div>
    <div class="btn-box">
          <div class="btn1"><input type="button" value="登录"></div>
          <div class="btn2"><input type="button" value="注册"></div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// definePageMeta({ layout: 'login' })
</script>

<style lang="scss" scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .login{
    padding: 100px;
    background-color: blue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url(@/assets/img/login-background.jpg) no-repeat;
    background-size: 100% 100%;
      .box1{
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 350px;
      height: 380px;
      border-top: 1px solid rgba(255, 255, 255, 0.5);
      border-left: 1px solid rgba(255,255,255,0.5);
      border-bottom: 1px solid rgba(255,255,255,0.5);
      border-right: 1px solid rgba(255,255,255,0.5);
      backdrop-filter: blur(10px);
      h2{
        color: rgba(255, 255, 255, 0.9);
      }
      .input-box{
        display: flex;
        flex-direction: column;
        justify-content: center;
        label{
          margin-top: 5px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.9);
        }
        input{
          box-sizing: border-box;
          font-size: 14px;
          height: 35px;
          width: 250px;
          background:rgba(255,255,255, 0.3);
          border-radius:5px;
          outline: none;
          padding: 0 10px;
        }
        input:focus{
          border: 1px solid rgba(255,255,255,0.8);
        }
      }
      .btn-box{
          width: 250px;
          height: 50px;
          margin-top: 10px;
          .btn1{
            float: left;
          }
          .btn2{
            float: right;
            input{
              margin-left: 10px;
            }
          }
          input{
            width: 120px;
            height:35px;
            border-radius: 5px;
          }
          input:hover{
            background:rgba(255,255,255, 0.85);
          }
        }
  }
}


</style>
