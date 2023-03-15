<template>
  <div id="register">
    <el-card class="box-card">
      <h2 class="title">图书管理系统</h2>
      <el-form
        label-width="100px"
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input id="input" v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input id="input" type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="password2">
          <el-input id="input" type="password" v-model="loginForm.password2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" id="reg" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
      <!-- <router-link :to=""></router-link> -->
      <!-- <el-link id="login" target="_self" @click="login">登录</el-link> -->
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    login(){
      this.$router.push("/Login")
    },
    register() {
      this.$refs.loginForm
        .validate()
        .then(() => {
          console.log("校验成功");
          let userName = this.loginForm.userName
          let password = this.loginForm.password
          let password2 = this.loginForm.password2
          if (userName && password && password2 && password == password2) {
            axios.post('http://localhost:3000/account',{
              userName,
              password
            })
            this.$router.push("/Login")
          }
        })
        .catch(() => {
          console.log("校验失败");
          console.log(this.$router);
          // this.$router.push("/Login");
        });
    },
    
  },
  data() {
    return {
      loginForm: {
        userName: "",
        password: "",
        password2: "",
      },
      loginRules: {
        userName: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
          {
            pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{6,12}$/,
            message: "用户名只能包含中文、大小写字母、和数字（长度为6到12）",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
            message:
              "至少包含1个大写字母、一个小写字母和一个数字（长度为8到16）",
            trigger: "blur",
          },
        ],
        password2: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur",
          },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
            message: "两次输入的密码不一致",
            trigger: "blur",
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
#register {
  width: 100%;
  height: 100vh;
  display: flex;
  /* background-color: pink; */
  justify-content: center;
  align-items: center;
}

.title {
  width: 100%;
  text-align: center;
}
.box-card {
  position: relative;
  width: 500px;
  height: 350px;
}
#input {
  width: 200px;
}
#reg {
  margin-left: -100px;
  width: 460px;
}
#login {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>