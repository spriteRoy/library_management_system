import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import register from '@/store/modules/register'
import user from '@/store/modules/user'
import book from '@/store/modules/book'



export default new Vuex.Store({
    state: {
      isLogin:false,
      isDetail:false
    },
    mutations: {
      updateIsLogin(state,newIsLogin){
        console.log('updateIsLogin方法被执行了');
        console.log("newIsLogin:"+newIsLogin);
        state.isLogin = newIsLogin
      },
      updateIsDetail(state,newIsDetail){
        state.isDetail = newIsDetail
      }
    },
    actions: {
    },
    modules: {
        register,
        user,
        book
    },
    getters: {
      // 建立快捷访问
      userName:state => state.register.userName,
      userInfo:state => state.user.userInfo,
      // 用户数量
      userCount:state => state.user.userCount,
      bookInfo:state => state.book.bookInfo,
      bookCount:state => state.book.bookCount,

      bookDetails:state => state.book.bookDetails
    }
  })