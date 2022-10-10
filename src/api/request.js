//对axios二次封装
import axios from 'axios';
//利用axios对象的create方法,去创建一个axios实例
//引入进度条功能
import nprogress from 'nprogress';
//引入nprogress样式
import 'nprogress/nprogress.css';
//引入store
import store from '@/store';
const requests = axios.create({
  //基础路径
  baseURL: '/api',
  //超时事件
  timeout: 5000,
});
//请求拦截器:当发出请求时,会被检测到
requests.interceptors.request.use((config) => {
  //config:配置对象,对象里的header很重要
  //请求头添加一个字段:游客id
  if (store.state.detail.userToken) {
    config.headers.userTempId = store.state.detail.userToken;
  }
  //校验用户token
  if (store.state.userInfo.token) {
    config.headers.token = store.state.userInfo.token;
  }
  //进度条开始
  nprogress.start();
  return config;
});
//相应拦截器
requests.interceptors.response.use(
  //成功的回调:服务器返回数据以后，可以进行相应的拦截,然后搞事情
  (res) => {
    //进度条结束
    nprogress.done();
    return res.data;
  },
  //失败的回调，可以把promise原型链进行断开
  (error) => {
    return Promise.reject(new Error('faile' + error));
  },
);
export default requests;
