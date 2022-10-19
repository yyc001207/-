import { reqGetCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister } from "@/api"
import { getToken, setToken, removeToken } from "@/utils/token";

const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        //验证码接口返回了验证码，后台应该需要发送到用户手机
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            //正常情况不需要这一步
            commit('GETCODE', result.data)
            return 'OK'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        // if (result.code == 200) {
            return 'OK'
        // } else {
        //     return Promise.reject(new Error('faile'))
        // }
    },
    //用户登录(token)
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            //持久化存储token
            setToken(result.data.token)
            return 'OK'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    //用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'OK'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录
    async userLogout({ commit }) {
        let result = await reqLogout()
        if (result.code == 200) {
            commit('CLEARUSERINFO')
            return 'OK'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}

const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEARUSERINFO(state) {
        //清空仓库数据
        state.token = ''
        state.userInfo = {}
        //清楚本地数据
        removeToken();
    }
}

const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}

const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}