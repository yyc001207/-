import { reqAddressInfo, reqOrderInfo,reqSubmitOrder } from "@/api"

const actions = {
    //获取用户地址
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo()
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
        }
    },
    //获取商品清单
    async getUserOrder({ commit }) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            commit('GETUSERORDER', result.data)
        }
    },
}

const mutations = {
    //存储用户地址
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    //存储商品清单
    GETUSERORDER(state, order) {
        state.order = order
    }
}

const state = {
    address: [],
    order: {}
}

const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}