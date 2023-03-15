<template>
  <el-card class="box-card">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="图书名称">
        <el-input
          v-model="formInline.bookName"
          placeholder="图书名称"
        ></el-input>
      </el-form-item>

      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      formInline: {
        bookName: "",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "",
    };
  },
  computed: {
    ...mapGetters(["bookInfo"]),
  },
  methods: {
    async onSubmit() {
      let that = this;
      console.log("图书列表中，点击搜索按钮后重新请求数据");
      let res = await axios.get(" http://localhost:3000/bookInfo");
      this.$store.commit("book/updateBookInfo", res.data);
      console.log("点击搜索按钮重新请求回来的数据this.bookInfo");
      console.log(this.bookInfo);

      let bookInfoSearch = this.bookInfo.filter((item) => {
        let isSelectDate = this.$moment(item.shelfTime).isBetween(
          that.value1[0],
          that.value1[1]
        );
        if (this.value1 !== "" && this.formInline.bookName.trim()) {
          return (
            isSelectDate && item.bookName === this.formInline.bookName.trim()
          );
        }
        if (this.value1 !== "") {
          return isSelectDate;
        }
        if (this.formInline.bookName.trim()) {
          return item.bookName === this.formInline.bookName.trim();
        }
      });
      console.log("this.value1的值是");
      console.log(this.value1);
      console.log("图书搜索结果是：");
      console.log(bookInfoSearch);
      that.$store.commit("book/updateBookInfo", bookInfoSearch);
      console.log("点击搜索按钮后重新获取到的新数据");
      console.log(that.bookInfo);
    },
    // el-input__icon
  },
  mounted() {
    // 问题：绑定点击事件，绑定不上
    document
      .querySelector(".el-input__icon")
      .addEventListener("click", function () {
        console.log(".el-input__icon被点击了");
        console.log(this.value1);
      });
  },
};
</script>

<style scoped>
.el-card__body {
  padding: 0;
}
.el-form {
  /* background-color: pink; */
}
.el-form[data-v-31bd468d] {
  margin: -19px;
}
.el-form-item {
  margin-bottom: 1px;
}
</style>