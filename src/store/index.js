import Vue from 'vue';
import Vuex from 'vuex';
import home from './home';
import search from './search';
import detail from './detail';
import shopCart from './shopCart';
import userInfo from './userInfo';
import payInfo from './payInfo';
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopCart,
    userInfo,
    payInfo,
  },
});
