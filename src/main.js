import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import  router from '@/router/index'

import store from './store'

import Moment from 'moment' 
Vue.prototype.$moment = Moment

import '@/download/iconfont.css'


Vue.config.productionTip = false



new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
