import Mock from 'mockjs';
//把JSON数据格式引入进来
import banner from '../mock/banner.json';
import floor from '../mock/floor.json';
import address from '../mock/address.json';
//mock数据:第一个参数请求地址、第二个参数请求数据
Mock.mock('/mock/banner', { code: 200, data: banner });
Mock.mock('/mock/floor', { code: 200, data: floor });
Mock.mock('/mock/address', { code: 200, data: address });
