<template>
  <el-container>
    <el-container>
      <el-header>
        <div class="left">图书管理系统</div>
        <div class="right" v-if="$store.state.isLogin">
          <span class="newTime">{{ newTime }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <a href="#" class="signOut" @click="signOut">退出</a>
        </div>
        <div class="right" v-else>
          <a href="#" @click="login">你好，请登录</a>&nbsp;&nbsp;&nbsp;
          <a href="#" @click="register">免费注册</a>
        </div>
      </el-header>
      <el-main>
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane label="用户管理">
            <UserSearch></UserSearch>
            <AddUser></AddUser>
          </el-tab-pane>
          <el-tab-pane label="图书管理" v-if="$store.state.isDetail == false">
            <BooksSearch></BooksSearch>
            <AddBooksList></AddBooksList>
            <AddBookInput></AddBookInput>
          </el-tab-pane>
          <el-tab-pane label="图书管理" v-else>
            <BookDetails></BookDetails>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import UserSearch from "@/components/user/UserSearch";
import AddUser from "@/components/user/AddUser";
import BooksSearch from "@/components/books/BooksSearch";
import AddBooksList from "@/components/books/AddBooksList";
import AddBookInput from "@/components/books/AddBookInput";
import BookDetails from '@/components/books/BookDetails'
export default {
  data() {
    return {
      newTime: "",
      tabPosition: "left",
      formInline: {
        user: "",
        mobile: "",
        state: "",
      },
    };
  },
  components: {
    UserSearch,
    AddUser,
    BooksSearch,
    AddBooksList,
    AddBookInput,
    BookDetails
  },
  methods: {
    getNowTime() {
      var date = new Date();
      var time =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      this.newTime = time;
    },
    onSubmit() {
      console.log("submit!");
    },
    signOut() {
      console.log();
      localStorage.removeItem("isLogin");
      this.$store.commit("updateIsLogin", false);
    },
    login() {
      console.log("login被执行了");
      this.$router.push("/Login");
    },
    register() {
      console.log("register被执行了");
      this.$router.push("/Register");
    },
  },
  mounted() {
    this.getNowTime(); //进入页面调用该方法获取当前时间
    clearInterval(myTimeDisplay); //销毁之前定时器
    var myTimeDisplay = setInterval(() => {
      this.getNowTime(); //每秒更新一次时间
    }, 1000);
  },
};
</script>

<style>
.signOut {
  text-decoration: none;
  color: white;
  /* background-color: pink; */
}
.newTime,.left{
  color: white;
}
.el-header {
  background-color:#008080;
  color: #333;
  line-height: 40px;
}

.left {
  float: left;
}
.right {
  float: right;
}
.el-main {
  background-color: white;
  padding: 0;
  color: #333;
  text-align: center;
  line-height: 16px;
  height: 100%;
  margin-top: -20px;
}
</style>