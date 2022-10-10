import Vue from 'vue';
import App from './App.vue';
//引入路由
import router from '@/router';
//引入仓库
import store from './store';
//三级联动需要注册全局组件
import TypeNav from '@/components/TypeNav/index';
//引入轮播图组件
import Carousel from '@/components/Carousel/index';
//引入分页组件
import Pagination from '@/components/Pagination/index';
//引入mock模块
import './mock/mockServer';
//引入swiper样式
import './assets/css/swiper.min.css';
//不适用vuex时 全局引入
import * as API from '@/api';
//引入elementUI
import { MessageBox } from 'element-ui';
//引入路由懒加载
import VueLazyload from 'vue-lazyload';
//引入表单验证
import '@/plugins/vee-validate';
//引入懒加载图片
const loadimage = require('./assets/images/1.gif');
//使用路由懒加载
Vue.use(VueLazyload, {
  //懒加载的图片
  loading: loadimage,
});
//注册全局组件
//第一个参数是组件名字,第二个参数是组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
//使用element
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
  //配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    //统一接收api文件中的全部函数
    Vue.prototype.$API = API;
  },
  router,
  store,
}).$mount('#app');
