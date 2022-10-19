import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api"
//游客身份
import { getUUID } from "@/utils/uuid_token";
const actions = {
    //获取商品详情
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //处理成功不需要存储数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        //当前函数返回值是一个promise
        if (result.code == 200) {
            return 'OK'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    //存储商品详情
    GETGOODINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}
const state = {
    goodsInfo: {},
    // uuid_token: getUUID()
}
const getters = {
    //简化商品数据
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }
}
export default {
    actions,
    mutations,
    state,
    getters
}