import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//三级联动的全局组件
import TypeNav from '@/components/TypeNav'
//引入仓库
import store from '@/store'
//引入mock数据
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
//引入轮播图组件
import Carousel from '@/components/Carousel'
//引入分页器组件
import Pageination from '@/components/Pageination'
//引入api
import * as API from '@/api'
//引入图片懒加载
import '@/plugins/vueLazyload'
//引入element-ui组件库
import { Button, MessageBox } from 'element-ui'
//引入表单验证插件
import '@/plugins/validate'
//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pageination.name, Pageination)
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false;
new Vue({
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由
  router,
  //注册仓库：组件实例身上会多一个store属性
  store,
}).$mount('#app')
