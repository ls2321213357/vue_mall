//对axios二次封装
import axios from 'axios';
//利用axios对象的create方法,去创建一个axios实例
const mockRequest = axios.create({
  //基础路径
  baseURL: '/mock',
  //超时事件
  timeout: 5000,
});
//请求拦截器:当发出请求时,会被检测到
mockRequest.interceptors.request.use((config) => {
  //config:配置对象,对象里的header很重要
  return config;
});
//相应拦截器
mockRequest.interceptors.response.use(
  //成功的回调:服务器返回数据以后，可以进行相应的拦截,然后搞事情
  (res) => {
    return res.data;
  },
  //失败的回调，可以把promise原型链进行断开
  (error) => {
    return Promise.reject(new Error('faile' + error));
  },
);
export default mockRequest;
