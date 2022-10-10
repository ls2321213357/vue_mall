import { reqCategoryList } from '@/api';
import { reqBannerList } from '@/api';
import { reqFloorList } from '@/api';
//存储数据
const state = {
  //返回的是什么类型就要定义成什么类型
  //导航标签数据
  categoryList: [],
  //轮播图数据
  bannerList: [],
  //floor数据
  floorList: [],
};
//修改state数据的唯一手段
const mutations = {
  GETCATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBNNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
//书写自己的业务逻辑,进行异步处理
const actions = {
  //通过api里面的接口函数调用，向服务器发请求,获取服务器的数据
  //异步获取导航标签数据
  async getCategoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit('GETCATEGORYLIST', result.data);
    }
  },
  //异步获取listcontainer图片数据
  async getBannerList({ commit }) {
    let resultBanner = await reqBannerList();
    if (resultBanner.code == 200) {
      commit('GETBNNERLIST', resultBanner.data);
    }
  },
  //异步获取floor图片数据
  async getFloorList({ commit }) {
    let result = await reqFloorList();
    if (result.code == 200) {
      commit('GETFLOORLIST', result.data);
    }
  },
};
//可以理解为计算属性
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
