import { reqGoodInfo, reqChangeCartNum } from '@/api';
import { getUuid } from '@/utils/uuid_token';
const state = {
  goodInfo: {},
  //游客身份信息
  userToken: getUuid(),
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const actions = {
  //获取商品详细信息
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodInfo(skuId);
    if (result.code == 200) {
      commit('GETGOODINFO', result.data);
    }
  },
  //commit不可以省略  必须进行占位
  //添加商品到购物车
  // eslint-disable-next-line no-unused-vars
  async getChangeCartNum({ commit }, { skuId, skuNum }) {
    //这里对购物车的值进行结构 获取购物车信息
    let result = await reqChangeCartNum(skuId, skuNum);
    if (result.code == 200) {
      return '添加成功';
    } else {
      return Promise.reject(new Error('failure'));
    }
  },
};
//对商品信息要用的进行计算导出  暴露的更简单
const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
