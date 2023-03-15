<template>
  <el-card class="box-card">
    <el-form :inline="true" :model="userInfoSearch" class="demo-form-inline">
      <el-form-item label="用户名称">
        <el-input
          v-model="userInfoSearch.user"
          placeholder="用户名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input
          v-model="userInfoSearch.mobile"
          placeholder="手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="userInfoSearch.state" placeholder="状态"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userInfoSearch: {
        user: "",
        mobile: "",
        state: "",
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    async onSubmit() {
      // 每次点击“搜索”按钮，都需要重新发起axios请求，并将请求到的数据赋值给vuex中的userInfo
      // 注意：axios请求是异步操作
      let res = await axios.get(" http://localhost:3000/userInfo");
      this.$store.commit("user/updateUserInfo", res.data);
      console.log("点击搜索按钮重新请求回来的数据");
      console.log(this.userInfo);

      let searchResult = this.userInfo.filter((item) => {
        let user = this.userInfoSearch.user;
        let mobile = this.userInfoSearch.mobile;
        let state = this.userInfoSearch.state;
        if (user && mobile && state) {
          if (state === "启用") {
            return (
              item.userName === user && item.mobile == mobile && item.radio == 1
            );
          } else if (state === "停用") {
            return (
              item.userName === user && item.mobile == mobile && item.radio == 2
            );
          }
        }
        if (user && mobile) {
          return item.userName === user && item.mobile == mobile;
        }
        if (mobile && state) {
          if (state === "启用") {
            return item.mobile == mobile && item.radio == 1;
          } else if (state === "停用") {
            return item.mobile == mobile && item.radio == 2;
          }
        }
        if (user && state) {
          if (state === "启用") {
            return item.userName === user && item.radio == 1;
          } else if (state === "停用") {
            return item.userName === user && item.radio == 2;
          }
        }
        if (user) {
          return item.userName === user;
        }
        if (mobile) {
          return item.mobile == mobile;
        }
        if (state) {
          console.log("item.radio:" + item.radio);
          console.log("state:" + state);
          if (state === "启用") {
            return item.radio == 1;
          } else if (state === "停用") {
            return item.radio == 2;
          }
        }
      });
      console.log("搜索结果searchResult:");
      console.log(searchResult);

      this.$store.commit("user/updateUserInfo", searchResult);
      console.log("查询结果this.userInfo:");
      console.log(this.userInfo);
    },
  },
};
</script>

<style scoped>
.box-card {
  width: 100%;
  margin-bottom: 10px;
}
/* 搜索栏 */
.el-form {
  /* background-color: pink; */
  margin: -19px;
}
.el-input {
  width: 154px;
}
.el-form-item {
  margin-bottom: 0;
}

/* 问题：为什么给.el-card__body设置样式不生效 */
/* .el-card__body{
  padding: 0;
  background-color: aqua;
} */
</style>