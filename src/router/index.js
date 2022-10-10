import VueRouter from 'vue-router';
import Vue from 'vue';
//引入store路由守卫用作判断
import store from '@/store';
Vue.use(VueRouter);
//需要姚崇学VueRouter.protottype原型对象身上的push|replace方法
//解决当前位置的冗余导航
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function replace(location) {
  return originReplace.call(this, location).catch((err) => err);
};

import routes from './routes';
let router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { y: 0 };
  },
});
//路由的导航守卫
router.beforeEach(async (to, from, next) => {
  //获取登陆的token
  let token = store.state.userInfo.token;
  //判断是否又用户信息
  let name = store.state.userInfo.userInfo.name;
  //如果存在token代表已经登陆了
  if (token) {
    if (to.path == '/login' || to.path == '/register') {
      next('/home');
    } else {
      if (name) {
        next();
      } else {
        //登陆了且没有用户信息
        //在路由跳转之前获取用户信息且放行
        try {
          await store.dispatch('getUserInfo');
          next();
        } catch (error) {
          //token失效
          await store.dispatch('getUserLogout');
          next('/login');
        }
      }
    }
  } else {
    let toPath = to.path;
    //如果没登陆
    if (
      toPath == '/trade' ||
      toPath.indexOf('/pay') != -1 ||
      toPath == '/center/myorder'
    ) {
      //把未登录的时候想去而没有去成的信息,存储于地址栏中
      next('/login?redirect=' + toPath);
    } else {
      next();
    }
  }
});

export default router;
