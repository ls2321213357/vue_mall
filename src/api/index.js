//把API进行统一管理
//axios请求返回的是一个promise对象
import requests from './request';
import mockRequest from './mockAjax';
//三级联动接口 /api/product/getBaseCategoryList  get请求
export const reqCategoryList = () =>
  requests({ url: '/product/getBaseCategoryList', method: 'get' });
//请求listContainer轮播图mock假数据
export const reqBannerList = () =>
  mockRequest({ url: '/banner', method: 'get' });
//请求reqFloorList轮播图mock假数据
export const reqFloorList = () => mockRequest({ url: '/floor', method: 'get' });
//获取search数据
export const reqGetSearchList = (params) =>
  requests({ url: '/list', method: 'post', data: params });
//获取商品详情数据
export const reqGoodInfo = (skuId) =>
  requests({ url: `item/${skuId}`, method: 'get' });
//进入购物车页面
export const reqCartList = () =>
  requests({ url: '/cart/cartList', method: 'get' });
//添加商品更新购物车数量等信息
export const reqChangeCartNum = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });
//删除购物车商品
export const deleteShopCart = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' });
//更改购物车选中状态
export const reqchangeCheck = (skuId, isChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });
//获取验证码
export const reqPassprot = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });
//用户注册
export const reqUserRegister = (params) =>
  requests({ url: `user/passport/register`, method: 'post', data: params });
//用户登录
export const reqUserLogin = (data) =>
  requests({ url: '/user/passport/login', method: 'post', data });
//利用token获取用户信息
export const reqUserInfo = () =>
  requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get',
  });
//用户退出登录
export const reqUserLogout = () =>
  requests({ url: '/user/passport/logout', method: 'get' });
//获取用户地址信息
export const reUserAddress = () =>
  mockRequest({ url: '/address', method: 'get' });
//获取订单交易页信息
export const reqShopList = () =>
  requests({ url: '/order/auth/trade', method: 'get' });
//自动登录接口
// export const reqAutoLogin = () =>
//   requests({ url: '/user/passport/auth/getUserInfo', method: 'get' });
////////////////////////////////////////////////////////////////////////////////////////////////////
//从这里开始所有的函数都没有用vuex
//结算提交订单
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data,
  });
//获取订单支付信息
export const reqtOrderPayInfo = (orderId) =>
  requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });
//获取支付是否成功信息
export const reqPaySuccessInfo = (orderId) =>
  requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get',
  });
//获取订单列表
export const reqOrderList = (page, limit) =>
  requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });
