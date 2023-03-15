<template>
  <div id="register">
    <el-card class="box-card">
      <p>新增图书</p>
      <el-form
        label-width="100px"
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
      >
        <el-form-item label="图书名称" prop="bookName">
          <el-input id="input" v-model="loginForm.bookName"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input id="input" v-model="loginForm.type"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input id="input" v-model="loginForm.author"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="publisher">
          <el-input id="input" v-model="loginForm.publisher"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="briefIntro">
          <el-input id="input" v-model="loginForm.briefIntro"></el-input>
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
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["bookInfo"]),
  },
  methods: {
    cancel() {
      this.loginForm.bookName = "";
      this.loginForm.type = "";
      this.loginForm.author = "";
      this.loginForm.publisher = "";
      this.loginForm.briefIntro = "";
    },
    async preserve() {
      let isLogin = localStorage.getItem("isLogin");
      console.log("isLogin:" + isLogin);
      if (isLogin === null) {
        console.log("未登录");
        this.$router.push("/Login");
      } else {
        let that = this;
        let bookName = this.loginForm.bookName;
        let type = this.loginForm.type;
        let author = this.loginForm.author;
        let publisher = this.loginForm.publisher;
        let briefIntro = this.loginForm.briefIntro;
        this.$refs.loginForm
          .validate()
          .then(async () => {
            console.log("校验成功");
            let res = await axios.get("http://localhost:3000/bookInfo");
            let length = res.data.length;
            if (length === 0) {
              that.id = 1;
            } else {
              that.id = +res.data[length - 1].id + 1;
            }
            console.log("that.id:" + that.id);
            axios
              .post("http://localhost:3000/bookInfo", {
                id: that.id,
                bookName,
                type,
                author,
                publisher,
                briefIntro,
                isEdit: "N",
              })
              .then(function (res) {
                console.log(res.data);
                console.log("新增图书成功");
                axios.get("http://localhost:3000/bookInfo").then((res) => {
                  that.$store.commit("book/updateBookInfo", res.data);
                  console.log("新增图书成功后重新请求数据");
                  console.log(that.bookInfo);
                });
              })
              .catch(function (error) {
                console.log(error);
                console.log("新增图书失败");
              });
          })
          .catch(() => {
            console.log("校验失败");
          });
        this.loginForm.bookName = "";
        this.loginForm.type = "";
        this.loginForm.author = "";
        this.loginForm.publisher = "";
        this.loginForm.briefIntro = "";
      }
    },
  },
  data() {
    return {
      id: 0,
      loginForm: {
        bookName: "",
        type: "",
        author: "",
        publisher: "",
        briefIntro: "",
      },
      loginRules: {
        bookName: [
          {
            required: true,
            message: "图书名称不能为空",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "图书类型不能为空",
            trigger: "blur",
          },
        ],
        author: [
          {
            required: true,
            message: "作者不能为空",
            trigger: "blur",
          },
        ],
        publisher: [
          {
            required: true,
            message: "出版社不能为空",
            trigger: "blur",
          },
        ],
        briefIntro: [
          {
            required: true,
            message: "简介不能为空",
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
  height: 374px;
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
</style>