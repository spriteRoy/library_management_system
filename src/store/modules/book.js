import Axios from "axios";

export default {
    namespaced: true,

    state: {
        bookInfo: [],
        bookCount: 0,
        // 详情页面需要使用的属性
        bookDetails: {
            bookName: '',
            briefIntro: '',
            author: '',
            publisher: '',
            type: '',
            shelfTime: ''
        }
    },
    mutations: {
        updateBookInfo(state, array) {
            state.bookInfo = array
            console.log('mutations中的updateBookInfo方法被调用了');
        },
        updateBookDetails(state,bookObj){
            console.log('updateBookDetails方法被调用了-------------------------');
            state.bookDetails.bookName = bookObj.bookName
            state.bookDetails.briefIntro = bookObj.briefIntro
            state.bookDetails.author = bookObj.author
            state.bookDetails.publisher = bookObj.publisher
            state.bookDetails.type = bookObj.type
            state.bookDetails.shelfTime = bookObj.shelfTime
        }
    },
    actions: {
        updateAsyncBookInfo(context) {
            Axios.get('http://localhost:3000/bookInfo').then((res) => {
                let bookInfoArr = res.data
                let bookCount = bookInfoArr.length
                context.state.bookCount = bookCount
                context.commit('updateBookInfo', bookInfoArr)
                console.log(bookInfoArr);
                console.log("图书数量：" + bookCount);
            })
        }
    }
}