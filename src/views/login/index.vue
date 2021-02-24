<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <div class="logo"><img src="" alt="" /></div>
        <div class="title">万顺福生鲜农特产电商平台</div>
      </div>

      <el-tabs v-model="loginType" @tab-click="tabsHandleClick">
        <el-tab-pane label="账号密码登录" name="1">
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" auto-complete="on" />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="手机号登录" name="2"></el-tab-pane>
      </el-tabs>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">{{ `登 录` }}</el-button>
    </el-form>
  </div>
</template>

<script>
  import { validUsername } from '@/utils/validate'
  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('Please enter the correct user name'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: 'admin',
          password: '20200428wsf'
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined,
        loginType: '1'
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store
              .dispatch('user/login', this.loginForm)
              .then(() => {
                this.$router.push({ path: this.redirect || '/' })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 标签栏切换事件 Todo 清空输入框
      tabsHandleClick(e) {}
    }
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: rgba(0, 0, 0, 0.43);

  @supports (-webkit-mask: none) and (not (cater-color: $light_gray)) {
    .login-container .el-input input {
      color: $light_gray;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        //color: $light_gray;
        height: 47px;
        //caret-color: $cursor;

        &:-webkit-autofill {
          //box-shadow: 0 0 0px 1000px $bg inset !important;
          //-webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid #eee;
      background: #fff;
      border-radius: 5px;
      color: $light_gray;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $bgImg: url('https://wanshunfu-1301582899.cos.ap-guangzhou.myqcloud.com//uat/ad83c95ff27cba458122bd9aff3b312a.jpg');
  $dark_gray: rgba(0, 0, 0, 0.25);
  $light_gray: rgba(0, 0, 0, 0.43);

  .login-container {
    min-height: 100vh;
    width: 100%;
    background-image: $bgImg;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 16px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
