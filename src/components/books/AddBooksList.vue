<template>
  <div>
    <!-- 图书数量：{{ $store.getters.bookCount }} -->
    <!-- 图书列表 -->
    <el-table :data="bookInfo" height="100" border style="width: 100%">
      <el-table-column label="图书名称" width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.isEdit === 'N'" 
          @click="see(scope.$index, scope.row)">{{
            scope.row.bookName
          }}</span>
          <input
            type="text"
            ref="bookNameInput"
            :value="scope.row.bookName"
            v-else/>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.isEdit === 'N'">{{
            scope.row.author
          }}</span>
          <input
            type="text"
            ref="authorInput"
            :value="scope.row.author"
            v-else/>
        </template>
      </el-table-column>
      <el-table-column label="上架时间" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.isEdit === 'N'">{{
            scope.row.shelfTime
          }}</span>
          <input
            type="text"
            ref="shelfTimeInput"
            :value="scope.row.shelfTime"
            v-else/>
        </template>
      </el-table-column>
      <el-table-column label="出版社" width="170">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.isEdit === 'N'">{{
            scope.row.publisher
          }}</span>
          <input
            type="text"
            ref="publisherInput"
            :value="scope.row.publisher"
            v-else/>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.imgSrc }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            v-if="scope.row.isEdit === 'N'"
            >编辑</el-button>
          <el-button size="mini" @click="save(scope.$index, scope.row)" v-else
            >保存</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, createNamespacedHelpers } from "vuex";
const { mapActions: bookMapActions,mapMutations:bookMapMutations } = createNamespacedHelpers("book");

export default {
  created() {
    this.updateAsyncBookInfo();
  },
  computed: {
    ...mapGetters(["bookInfo"]),
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    see(index, row){
      console.log('see方法中输出的内容');
      console.log(index, row);
      this.$store.commit("updateIsDetail", true);
      this.updateBookDetails(row)
    },
    // 编辑图书信息
    // 问题：不能只写参数row？save函数的第一个参数只能是index？（同下一问）
    handleEdit(index, row) {
      let isLogin = localStorage.getItem("isLogin");
      console.log("isLogin:" + isLogin);
      if (isLogin === null) {
        console.log("未登录");
        this.$router.push("/Login");
      } else {
        console.log(index, row);
        row.isEdit = "Y";
        console.log("编辑按钮被点击了");
        axios
          .patch("http://localhost:3000/bookInfo/" + row.id, {
            isEdit: "Y",
          })
          .then(() => {
            console.log("图书管理中的编辑按钮被点击了------成功");
            // axios.get('http://localhost:3000/bookInfo').then((res) => {
            //   console.log('编辑按钮被点击后重新请求数据');
            //   console.log(res.data);
            // })
          })
          .catch(() => {
            console.log("图书管理中的编辑按钮被点击了------失败");
          });
      }
    },
    // 对编辑过后的图书信息进行保存
    // 问题：不能只写参数row？save函数的第一个参数只能是index？
    save(index, row) {
      console.log("保存按钮被点击了");
      let that = this;
      let bookName = this.$refs.bookNameInput.value;
      let author = this.$refs.authorInput.value;
      let shelfTime = this.$refs.shelfTimeInput.value;
      let publisher = this.$refs.publisherInput.value;
      console.log("-------", bookName, "-----------------");
      // 更新数据库信息
      console.log("row.id:" + row.id);
      axios
        .patch("http://localhost:3000/bookInfo/" + row.id, {
          bookName,
          author,
          shelfTime,
          publisher,
          isEdit: "N",
        })
        .then(function () {
          console.log("图书信息编辑成功");
          axios.get("http://localhost:3000/bookInfo").then((res) => {
            console.log("保存按钮被点击后重新请求数据");
            that.$store.commit("book/updateBookInfo", res.data);
            console.log("保存按钮被点击后重新请求数据");
            console.log(that.bookInfo);
            console.log(res.data);
          });
        })
        .catch(function () {
          console.log("图书信息编辑失败");
        });
    },
    // 删除图书信息
    // 问题：函数名必须叫handleDelete，将函数名修改为delete报错
    handleDelete(index, row) {
      let isLogin = localStorage.getItem("isLogin");
      console.log("isLogin:" + isLogin);
      if (isLogin === null) {
        console.log("未登录");
        this.$router.push("/Login");
      } else {
        let that = this;
        console.log(index, row);
        axios
          .delete("http://localhost:3000/bookInfo/" + row.id)
          .then(function (res) {
            console.log(res);
            console.log("图书删除成功");
            axios.get("http://localhost:3000/bookInfo").then((res) => {
              that.$store.commit("book/updateBookInfo", res.data);
              console.log("删除按钮被点击后重新请求数据");
              console.log(that.bookInfo);
            });
          })
          .catch(function (error) {
            console.log(error);
            console.log("图书删除失败");
          });

        console.log("删除按钮被点击了");
      }
    },
    ...bookMapActions(["updateAsyncBookInfo"]),
    ...bookMapMutations(['updateBookDetails'])
  },
};
</script>