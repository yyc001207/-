import { reqCartList, reqDeletCartById, reqUpdateCheckedById } from "@/api"
import { get } from "lodash"

const actions = {
    //获取购物车列表
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code = 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车商品
    async deleteCartListById({ commit }, skuId) {
        let result = await reqDeletCartById(skuId)
        if (result.code == 200) {
            return 'OK'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //修改商品状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'OK'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 删除全部选中的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        let PromiseAll = []
        //获取全部商品
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListById', item.skuId) : ''
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    },
    allUpdateChecked({ dispatch, getters }, isChecked) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach((item) => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}

const state = {
    cartList: []
}

const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
}

export default {
    actions,
    mutations,
    state,
    getters
}