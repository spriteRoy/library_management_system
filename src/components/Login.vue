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
        <el-form-item label="密码" prop="password" >
          <el-input id="input" type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" id="reg" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    <div><a href="#" class="zhuce" @click="register">注册</a></div>
    </el-card>
    <!-- <button @click="handleClick('父组件')">点击</button> -->
    <!-- 3.在页面中使用dialog-component组件-->
    <!-- 4.设置v-if语句，通过动态改变Visible值用来控制弹窗是否弹出-->
    <!-- 5.设置ref属性，相当于唯一标识dialog-component组件-->
    <dialog-component v-if="Visible" ref="dialog"></dialog-component>
  </div>
</template>
<script>
import axios from "axios";
import dialogComponent from "@/components/dialogComponent";
export default {
  components: {
    dialogComponent,
  },
  methods: {
    register(){
      this.$router.push("/Register")
    },
    // 7.实现点击事件，点击事件一定要包含以下内容
    // handleClick(data) {
    //   this.Visible = true;
    //   this.$nextTick(() => {
    //     //这里的dialog与上面dialog-component组件里面的ref属性值是一致的
    //     //init调用的是dialog-component组件里面的init方法
    //     //data是传递给弹窗页面的值
    //     this.$refs.dialog.init(data);
    //   });
    // },
    login() {
      let that = this;
      this.$refs.loginForm
        .validate()
        .then(() => {
          console.log("校验成功");
          let userName = this.loginForm.userName;
          let password = this.loginForm.password;
          axios.get("http://localhost:3000/account").then((res) => {
            console.log("登录组件中，校验成功后，发送请求获取所有账户信息");
            console.log(res.data);
            let matchedData = res.data.filter((item) => {
              return userName == item.userName && password == item.password;
            });
            if (matchedData.length > 0) {
              console.log('登录成功');
              // 登录成功后，将isLogin（true）的值进行本地存储
              localStorage.setItem('isLogin','true')
              
              // 更改store/index.js state下面的isLogin
              this.$store.commit('updateIsLogin',true)
             
              this.$router.push("/Management");
            } else {
              that.Visible = true;
              that.$nextTick(() => {
                //这里的dialog与上面dialog-component组件里面的ref属性值是一致的
                //init调用的是dialog-component组件里面的init方法
                //data是传递给弹窗页面的值
                that.$refs.dialog.init('父组件');
              });
            }
              // 如何给关闭按钮绑定事件
              // let close = document.querySelector('.el-icon-close')
              // console.log(close);
          });
        })
        .catch(() => {
          console.log("校验失败");
        });
    },
  },
  data() {
    return {
      Visible: false,
      loginForm: {
        userName: "",
        password: "",
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
  /* background-color:yellow; */
  justify-content: center;
  align-items: center;
}
.zhuce{
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.title {
  width: 100%;
  text-align: center;
}
.box-card {
  position: relative;
  width: 500px;
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