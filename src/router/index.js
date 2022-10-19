//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
//引入store
import store from '@/store'
import { indexOf } from 'lodash'
//使用插件
Vue.use(VueRouter)

//解决多次点击同一个路由跳转报错问题
//保存VueRouter原型对象的push方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写push与replace方法
VueRouter.prototype.push = function (location, reslove, reject) {
    if (reslove && reject) {
        //call和apply，都可以调用一次函数，都可以篡改函数上下文一次
        //call传递参数用逗号隔开，apply传递数组
        originPush.call(this, location, reslove, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, reslove, reject) {
    if (reslove && reject) {
        //call和apply，都可以调用一次函数，都可以篡改函数上下文一次
        //call传递参数用逗号隔开，apply传递数组
        originReplace.call(this, location, reslove, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

//配置路由
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

//全局前置守卫
router.beforeEach(async (to, from, next) => {
    //to：获取将要跳转的路由信息
    //from：获取开始路由
    //next：放行
    //获取用户token
    let token = store.state.user.token
    //获取用户信息
    let name = store.state.user.userInfo.name
    //用户已登录
    if (token) {
        if (to.name == 'login') {
            //用户已登录跳转登录页重定向至首页
            next('/')
            // console.log(111);
        }
        //用户跳转其他页面
        else {
            //判断跳转时是否有用户信息，有则放行，没有向服务器请求用户信息后放行
            if (name) {
                next()
                // console.log(222);
            } else {
                try {
                    //获取用户信息
                    await store.dispatch('getUserInfo')
                    next()
                    // console.log(333);
                } catch (error) {
                    //用户信息获取失败，token过期失效，清空token缓存，跳转登录页
                    await store.dispatch('userLogout')
                    // console.log(444);
                    next('login')
                }
            }
        }
    }
    //用户未登录
    else {
        let topath = to.path
        if (topath.indexOf('/trade') != -1 || topath.indexOf('/pay') != -1 || topath.indexOf('/center') != -1) {
            //将未登录想去而无法去的路由信息存储在路由的qurey参数当中
            next('login?redirect=' + topath)
        } else {
            next()
        }
        // console.log(555);
    }
})

export default router