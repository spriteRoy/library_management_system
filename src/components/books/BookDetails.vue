<template>
  <div class="card">
    <div>
      
      <span class="instructe">
        <a href="#" @click="back"
          ><img src="../../assets/back.png" alt="" class="back"></a>
        详情
      </span>
    </div>
    <div class="bookName">《{{ $store.getters.bookDetails.bookName }}》</div>
    <div class="briefIntro">
      {{ $store.getters.bookDetails.briefIntro }}
    </div>
    <table>
      <tr>
        <td><strong>作者</strong></td>
        <td>{{ $store.getters.bookDetails.author }}</td>
        <td>出版社</td>
        <td>{{ $store.getters.bookDetails.publisher }}</td>
      </tr>
      <tr>
        <td><strong>类型</strong></td>
        <td>{{ $store.getters.bookDetails.type }}</td>
        <td><strong>上架时间</strong></td>
        <td>{{ $store.getters.bookDetails.shelfTime }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      console.log("back被点击了");
      this.$store.commit("updateIsDetail", false);
    },
  },
};
</script>

<style scoped>
.box{
  width: 30px;
  height: 30px;
  background-color: aquamarine;
  color: red;
}
.card {
  text-align: left;
  padding-left: 40px;
  padding-top: 20px;
}
.back{
  width: 18px;
  height: 18px;
}
.icon {
  font-family: iconfont;
  background-color: aqua;
}
.instructe {
  text-align: left;
  /* background-color: yellow; */
}
.bookName {
  padding: 20px 0;
}
.briefIntro {
  width: 600px;
  height: 200px;
  border: 1px solid #ccc;
}
/* style="width: 600px; height: 40px" */
table {
  width: 600px;
  height: 40px;
  margin-top: 20px;
}

td {
  width: 300px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>