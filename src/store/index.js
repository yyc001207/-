//大仓库
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
/* 
    state:{}, 仓库存储数据
    mutations:{}, 修改state的唯一手段
    actions:{}, 处理action，书写自己的业务逻辑以及处理异步
    getters:{} 理解为计算属性,简化仓库数据
*/
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'
export default new Vuex.Store({
    //实现Vuex仓库模块式开发
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})