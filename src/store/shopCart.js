import { reqCartList, deleteShopCart, reqchangeCheck } from '@/api';
const state = {
  //购物车清单
  shopList: [],
};
const mutations = {
  GETCARTLIST(state, shopList) {
    state.shopList = shopList;
  },
};
const actions = {
  //获取购物车列表
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit('GETCARTLIST', result.data);
    }
  },
  //删除购物车相应商品
  // eslint-disable-next-line no-unused-vars
  async deleteShopCart({ commit }, skuId) {
    let result = await deleteShopCart(skuId);
    if (result.code == 200) {
      return '删除成功';
    } else {
      return Promise.reject(new Error('failure'));
    }
  },
  //更改购物车商品勾选
  // eslint-disable-next-line no-unused-vars
  async changeCheck({ commit }, { skuId, isChecked }) {
    let result = await reqchangeCheck(skuId, isChecked);
    if (result.code == 200) {
      return '勾选更换成功';
    } else {
      return Promise.reject(new Error('failure'));
    }
  },
  //删除全部勾选的产品[拥有context小仓库:里面包含了state,actions,getters]
  async deleteAllShopCart({ dispatch, getters }) {
    let promiseAll = [];
    await getters.shopList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? dispatch('deleteShopCart', item.skuId) : '';
      //将每一次返回的Promise添加到数组当中
      promiseAll.push(promise);
    });
    //只有全部的P1,P2...都成功,返回的结果极为成功
    //如果有一个失败,返回的结果即为失败
    return Promise.all(promiseAll);
  },
  //全选功能
  async seleteAllCheck({ dispatch, getters }, isChecked) {
    //promise操作与deleteAllShopCart效果一样
    let promiseAll = [];
    await getters.shopList.cartInfoList.forEach((item) => {
      let promise = dispatch('changeCheck', { skuId: item.skuId, isChecked });
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
};
const getters = {
  shopList(state) {
    return state.shopList[0] || {};
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
