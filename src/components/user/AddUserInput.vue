<template>
  <div id="register">
    <el-card class="box-card">
      <p>新增用户</p>
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
        <el-form-item label="手机号" prop="mobile">
          <el-input id="input" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio v-model="loginForm.radio" label="1">启用</el-radio>
          <el-radio v-model="loginForm.radio" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div id="login">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" id="reg" @click="preserve">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
// 第一步
// import { createNamespacedHelpers } from "vuex";
// const { mapMutations: userMapMutations } = createNamespacedHelpers("user");

import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    // 第二步
    // ...userMapMutations(['updateUserInfo']),

    cancel() {
      this.loginForm.userName = "";
      this.loginForm.password = "";
      this.loginForm.mobile = "";
      this.loginForm.radio = "2";
    },
    async preserve() {
      let isLogin = localStorage.getItem("isLogin");
      console.log("isLogin:" + isLogin);
      if (isLogin === null) {
        console.log("未登录");
        this.$router.push("/Login");
      } else {
        let that = this;
        let userName = this.loginForm.userName;
        let password = this.loginForm.password;
        let mobile = this.loginForm.mobile;
        let radio = this.loginForm.radio;
        this.$refs.loginForm
          .validate()
          .then(async () => {
            console.log("新增用户校验成功");
            let res = await axios.get("http://localhost:3000/userInfo");
            let length = res.data.length;
            if (length === 0) {
              that.id = 1;
            } else {
              that.id = res.data[length - 1].id + 1;
            }
            axios
              .post("http://localhost:3000/userInfo", {
                id: that.id,
                userName,
                password,
                mobile,
                radio,
                isEdit: "N",
                operate: "编辑",
              })
              .then(function () {
                console.log("成功添加新的用户信息");
                // 数据添加成功后重新请求新的数据
                axios.get("http://localhost:3000/userInfo").then((res) => {
                  that.$store.commit("user/updateUserInfo", res.data);
                  console.log("输出新增用户后重新请求到的新数据");
                  console.log(that.userInfo);

                  // 问题出在哪里（通过辅助函数方式）
                  // that.$store.commit("updateUserInfo", res.data);
                });
              })
              .catch(function (error) {
                console.log(error);
                console.log("失败");
              });
          })
          .catch(() => {
            console.log("校验失败");
          });
        this.loginForm.userName = "";
        this.loginForm.password = "";
        this.loginForm.mobile = "";
        this.loginForm.radio = "2";
      }
    },
  },
  data() {
    return {
      id: 0,
      loginForm: {
        userName: "",
        password: "",
        mobile: "",
        radio: "2",
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
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur",
          },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "格式不正确",
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
  height: 100%;
  /* background-color: pink; */
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
  width: 80px;
}
#login {
  position: absolute;
  right: 0;
  bottom: 0;
}
.box-card[data-v-0c488bbc] {
  height: 300px;
  margin-top: 10px;
}

/* 问题：不生效 */
/* .el-card__body{
  padding: 10px !important;
} */
</style>