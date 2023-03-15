<template>
  <div>
    <div>
      <!-- 用户数量：{{ $store.getters.userCount }}--{{ $store.getters.userName }} -->
    </div>
    <!-- 用户列表 -->
    <el-table :data="userInfo" height="140" border style="width: 100%">
      <el-table-column label="用户名称" width="180">
        <template slot-scope="scope" ref="userName">
          <span style="margin-left: 10px" v-if="scope.row.isEdit === 'N'">{{
            scope.row.userName
          }}</span>
          <input
            type="text"
            ref="userNameInput"
            :value="scope.row.userName"
            v-else
          />
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="180">
        <template slot-scope="scope" ref="mobile">
          <span style="margin-left: 10px" v-if="scope.row.isEdit === 'N'">{{
            scope.row.mobile
          }}</span>
          <input
            type="text"
            ref="mobileInput"
            :value="scope.row.mobile"
            v-else
          />
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope" ref="state">
          <span style="margin-left: 10px" v-if="scope.row.isEdit === 'N'">{{
            scope.row.radio == 1 ? "启用" : "停用"
          }}</span>
          <input
            type="text"
            ref="radioInput"
            :value="scope.row.radio == 1 ? '启用' : '停用'"
            v-else
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="edit(scope.$index, scope.row)"
            v-if="scope.row.operate === '编辑'"
          >
            <span ref="s">{{ scope.row.operate }} </span>
          </el-button>
          <el-button
            size="mini"
            @click="save(scope.$index, scope.row)"
            v-if="scope.row.operate === '保存'"
          >
            <span>{{ scope.row.operate }} </span>
          </el-button>

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, createNamespacedHelpers } from "vuex";
const { mapActions: userMapActions } = createNamespacedHelpers("user");
export default {
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    this.updateAsyncUserInfo();
  },
  data() {
    return {
      isEdit: "N",
    };
  },
  components: {},
  mounted() {
    // console.log("mounted");
    // this.$nextTick(() => {
    // });
  },
  methods: {
    // 编辑用户信息
    edit(index, row) {
      let isLogin = localStorage.getItem("isLogin");
      console.log("isLogin:" + isLogin);
      if (isLogin === null) {
        console.log("未登录");
        this.$router.push("/Login");
      } else {
        console.log(index, row);
        // 点击编辑按钮，对应行显示编辑输入框
        row.isEdit = "Y";
        // 问题：为什么页面上还是“编辑”按钮，不是“保存”按钮
        // this.$refs.s.innerHTML = "保存"
        // console.log(this.$refs.s.innerHTML);

        row.operate = "保存";
      }
    },
    // 对编辑过后的用户信息进行保存
    save(index, row) {
      console.log(index, row);
      let that = this;
      row.operate = "编辑";
      console.log("save函数");
      // 问题：如何通过userInfo数组获取输入框的值
      // console.log(this.userInfo.row.userName);

      let userName = this.$refs.userNameInput.value;
      let mobile = this.$refs.mobileInput.value;
      let radio = this.$refs.radioInput.value === "停用" ? 2 : "1";
      // 更新数据库信息
      axios
        .patch("http://localhost:3000/userInfo/" + row.id, {
          userName,
          password: row.password,
          mobile,
          radio,
          isEdit: "N",
          operate: "编辑",
        })
        .then(function (res) {
          console.log("编辑成功的res.data");
          console.log(res.data);
          axios.get("http://localhost:3000/userInfo").then((res) => {
            that.$store.commit("user/updateUserInfo", res.data);
            console.log("编程完成点击保存按钮后重新请求新数据");
            console.log(that.userInfo);
          });
        })
        .catch(function (error) {
          console.log(error);
          console.log("编辑失败");
        });
    },
    // 删除用户信息
    handleDelete(index, row) {
      let isLogin = localStorage.getItem("isLogin");
      console.log("isLogin:" + isLogin);
      if (isLogin === null) {
        console.log("未登录");
        this.$router.push("/Login");
      } else {
        console.log("已登录");
        let that = this;
        console.log(index, row);
        axios
          .delete("http://localhost:3000/userInfo/" + row.id)
          .then(function (res) {
            // 问题：res是什么对象
            console.log("res");
            console.log(res);
            console.log("用户信息删除成功");
            axios.get("http://localhost:3000/userInfo").then((res) => {
              console.log("删除用户信息后重新发起axios请求");
              console.log(res.data);

              that.$store.commit("user/updateUserInfo", res.data);
              console.log("删除用户信息后重新请求到的数据");
              console.log(that.userInfo);
            });
          })
          .catch(function (error) {
            console.log(error);
            console.log("用户信息删除失败");
          });
      }
    },
    ...userMapActions(["updateAsyncUserInfo"]),
  },
};
</script>

<style>
.el-table th > .cell {
  text-align: center;
}
.el-table .cell {
  text-align: center;
}
.el-table td,
.el-table th {
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>