<template>
  <div class="login">
    <div class="header_title"></div>
    <div class="wrap">
      <div class="form">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item prop="username">
            <el-input placeholder="账号" clearable v-model="form.username" maxlength="20" 
            prefix-icon="el-icon-user" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholer="密码" clearable v-model="form.password" 
            maxlength="20" prefix-icon="el-icon-lock" show-password />
          </el-form-item>
          <el-form-item prop="code">
            <div style="display: flex;">
              <el-input placeholder="验证码" @keyup.enter.native="handleSubmit" style="width: 150px;" clearable v-model="form.code"
              prefix-icon="el-icon-key" />
              <img :src="src" width="150" height="32" @click="getCode">
            </div>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%;" type="primary" @click="handleSubmit">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {geneCode, login} from '@/api'
import AesUtils from '@/utils/AesUtils'
export default {
  data() {
    return {
      form: {
        username: 'admin',
        password: '123456',
        code: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: ['change', 'blur'] },
          { min: 2, max: 20, message: '长度2 到 20个字符', trigger: ['change', 'blur'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['change', 'blur'] },
          { min: 6, max: 20, message: '长度6 到 20个字符', trigger: ['change', 'blur'] }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: ['change', 'blur'] }
        ]
      },
      src: ''
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    getCode() {
      geneCode().then(res => {
        res.headers.uuid && localStorage.setItem('uuid', res.headers.uuid)
        this.src = window.URL.createObjectURL(res.data)
      })
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if(valid) {
          login(this.form).then(res => {
            console.log(res);
            if(res) {
              const { data } = res.data
              if(data.state_code == '0') {
                return
              }
              if(data.state_code == '1') {
                console.log(1111111111);
                this.$router.push('/register')
              }else {
                res.headers.token && localStorage.setItem('token', res.headers.token)
                sessionStorage.setItem('sign', AesUtils.encrypt(data.id))
                localStorage.setItem('uid', data.id)
                this.$store.dispatch('GetUserInfo', data)
                this.$router.push('/index')
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/bg.jpg');
  background-position: center center;
  background-size: auto 100%;
  background-repeat: no-repeat;

  .header_title {
    position: absolute;
    top: 20px;
    left: 50px;
    display: flex;
    align-items: center;
    
    &::before {
      content: "";
      display: inline-block;
      width: 310px;
      height: 70px;
      background-image: url('@/assets/title_logo.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: 0 0;
      margin: 10px 10px 0 0;
    }

    &::after {
      content: "教务系统";
      margin: 10px 0 0 20px;
      color: #ffffff;
      font-size: 32px;
      letter-spacing: 4px;
    }
  }

  .wrap{
    position: absolute;
    top: 50%;
    right: 200px;
    transform: translateY(-50%);
    width: 400px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 0 2px 0 rgba($color: #000000, $alpha: .3);

    .form{
      width: 300px;
      margin: 50px auto;
    }
  }
}
</style>