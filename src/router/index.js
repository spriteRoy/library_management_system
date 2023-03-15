import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'

import Management from '@/components/UserManagement'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: "/Management"
    },
    {
        path: '/Register',
        component: Register,
    },
    {
        path: '/Login',
        component: Login,
    },
    {
        path: '/Management',
        component: Management,
    }
]

const router = new VueRouter({
    routes
})
// router.beforeEach((to,from,next) => {
//     let isLogin = localStorage.getItem('isLogin')
//     if (isLogin == "true" && (to.path === '/' || to.path === '/Login' || to.path === '/Register')) {
//         console.log('next(false)执行了');
//         next(false)
//     }else{
//         console.log("next()执行了");
//         next()
//     }
// })

// 1.成功：无法跳转至login页面
router.beforeEach((to,from,next) => {
    let isLogin = localStorage.getItem('isLogin')
    if (isLogin == "true" && ( to.path === '/Login' || to.path === '/Register')) {
        console.log('next(false)执行了');
        next(false)
    }else{
        console.log("next()执行了");
        next()
    }
})

router.beforeEach((to,from,next) => {
    let isLogin = localStorage.getItem('isLogin')
    if (isLogin == "true" && (to.path === '/')) {
        console.log('next(false)执行了');
        next(false)
    }else{
        console.log("next()执行了");
        next()
    }
})



export default router