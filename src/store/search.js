import { reqGetSearchList } from '@/api';
//存储数据
const state = {
  //search数据
  searchtList: {},
};
//修改state数据的唯一手段
const mutations = {
  GETSEARCHLIST(state, searchtList) {
    state.searchtList = searchtList;
  },
};
//书写自己的业务逻辑,进行异步处理
//获取商品列表
const actions = {
  async getSearchList({ commit }, params = {}) {
    //当reqGetSearchList这个函数在调用获取服务器数据的时候，至少传递一个参数
    //params形参:是当用户派发action的时候,第二个参数传递过来的,至少是一个空对象
    let result = await reqGetSearchList(params);
    if (result.code == 200) {
      commit('GETSEARCHLIST', result.data);
    }
  },
};
//可以理解为计算属性 为了简化数据
const getters = {
  //加入网络不给力|没有网的话下面应该返回的是undefined
  //计算新的计算属性值至少给人家来一个数组
  attrsList() {
    return state.searchtList.attrsList || [];
  },
  goodsList() {
    return state.searchtList.goodsList || [];
  },
  trademarkList() {
    return state.searchtList.trademarkList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
