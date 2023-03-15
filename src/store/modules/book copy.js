import Axios from "axios";

export default {
    namespaced: true,

    state: {
        bookInfo: [],
        bookCount:0
    },
    mutations: {
        updateBookInfo(state,array){
            state.bookInfo = array
            console.log('mutations中的updateBookInfo方法被调用了');
        }
    },
    actions: {
        updateAsyncBookInfo(context){
            Axios.get('http://localhost:3000/bookInfo').then((res) =>{
                let bookInfoArr = res.data
                let bookCount = bookInfoArr.length
                context.state.bookCount = bookCount
                context.commit('updateBookInfo',bookInfoArr)
                console.log(bookInfoArr);
                console.log("图书数量："+bookCount);
            })
        }
    }
}