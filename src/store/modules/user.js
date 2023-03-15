import Axios from "axios";

export default {
    namespaced: true,

    state: {
        userInfo: [],
        userCount:0
    },
    mutations: {
        updateUserInfo(state,array){
            state.userInfo = array
            console.log('mutations中的updateUserInfo方法被调用了');
        }
    },
    actions: {
        updateAsyncUserInfo(context){
            Axios.get('http://localhost:3000/userInfo').then((res) =>{
                let userInfoArr = res.data
                let userCount = userInfoArr.length
                context.state.userCount = userCount
                context.commit('updateUserInfo',userInfoArr)
                console.log(userInfoArr);
                console.log("用户数量："+userCount);
            })
        }
    }
}