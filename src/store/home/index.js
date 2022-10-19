//home模块仓库
import { reqCategory, reqBannerList, reqFloorList } from '@/api'
const actions = {
    //通过api接口函数调用，向服务器发请求，获取服务器数据
    //三级联动
    async categoryList({ commit }) {
        let result = await reqCategory()
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    //首页轮播图
    async getBannerList({ commit }) {
        let result = await reqBannerList();
        if (result.code == 200) {
            commit('BANNERLIST', result.data)
        }
    },
    //floor
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            commit('FLOORLIST', result.data)
        }
    }
};
//数据操作
const mutations = {
    //三级联动
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
        state.categoryList.pop();
        state.categoryList[0].categoryChild.pop();
        state.categoryList[11].categoryChild = state.categoryList[11].categoryChild.slice(0, 8);
        state.categoryList[14].categoryChild = state.categoryList[14].categoryChild.slice(0, 10);
    },
    //首页轮播图
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    //floor
    FLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};
const state = {
    //根据接口返回值初始化数据
    categoryList: [],
    bannerList: [],
    floorList: []
};
const getters = {};

export default {
    actions,
    mutations,
    state,
    getters,
}