import { reqGetSearchInfo } from "@/api";
//search模块仓库
const actions = {
    //获取Search模块参数
    async getSearchList({ commit }, params = {}) {
        //params至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
const state = {
    searchList: {}
};
//在项目中简化数据
const getters = {
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
    
};

export default {
    actions,
    mutations,
    state,
    getters,
}