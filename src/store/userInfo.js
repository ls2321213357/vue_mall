import {
  reqPassprot,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqUserLogout,
} from '@/api';
import { setToken, getToken, removeToken } from '@/utils/token';
const state = {
  passProt: '',
  token: getToken(),
  userInfo: {},
};
const mutations = {
  //用户验证码
  GETPASSPROT(state, passProt) {
    state.passProt = passProt;
  },
  //用户登录
  GETUSERLOGIN(state, token) {
    state.token = token;
  },
  //用户信息
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  //清除用户信息
  CLEARINFO(state) {
    state.passProt = '';
    state.userInfo = {};
    //清除本地TOKEN
    removeToken();
  },
};
const actions = {
  //正常情况下验证码应该发送给用户,这里为了省钱就返回过来了,不然不用写if判断
  //获取验证码
  async getPassProt({ commit }, phone) {
    let result = await reqPassprot(phone);
    if (result.code == 200) {
      commit('GETPASSPROT', result.data);
      return 'ok';
    } else {
      return Promise.reject(new Error('验证码发送失败'));
    }
  },
  //用户注册
  // eslint-disable-next-line no-unused-vars
  async getUserRegister({ commit }, params) {
    let result = await reqUserRegister(params);
    //服务器下发token,用户唯一标识符(类似uuid)
    //将来经常通过带token带服务器要用户信息
    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error('用户已经被注册'));
    }
  },
  //用户登录
  async getUserLogin({ commit }, params) {
    let result = await reqUserLogin(params);
    if (result.code == 200) {
      commit('GETUSERLOGIN', result.data.token);
      //持久化存储token
      setToken(result.data.token);
    }
    if (result.code == 207) {
      alert('账号或密码不正确');
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit('GETUSERINFO', result.data);
      return 'ok';
    } else {
      return Promise.reject('failuer');
    }
  },
  //退出登录
  async getUserLogout({ commit }) {
    let result = await reqUserLogout();
    console.log(222);
    if (result.code == 200) {
      //提交给mutation改动state数据
      commit('CLEARINFO');
      return 'ok';
    } else {
      return Promise.reject(new Error('failure'));
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
