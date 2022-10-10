import { reUserAddress, reqShopList } from '@/api';
const state = {
  addressList: [],
  shopInfo: {},
};
const mutations = {
  GETUSERADDRESS(state, addressList) {
    state.addressList = addressList;
  },
  GETSHOPLIST(state, shopInfo) {
    state.shopInfo = shopInfo;
  },
};
const actions = {
  //获取用户地址信息
  async getUserAddress({ commit }) {
    let result = await reUserAddress();
    if (result.code == 200) {
      commit('GETUSERADDRESS', result.data);
    }
  },
  //获取订单列表信息
  async getShopList({ commit }) {
    let result = await reqShopList();
    if (result.code == 200) {
      commit('GETSHOPLIST', result.data);
    }
  },
};
const getters = {
  shopInfo() {
    return state.shopInfo.detailArrayList;
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
