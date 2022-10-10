//把token存到本地存储
export const setToken = (token) => {
  localStorage.setItem('TOKEN', token);
};
//从本地存储取token
export const getToken = () => {
  return localStorage.getItem('TOKEN');
};
//清楚本地token
export const removeToken = () => {
  localStorage.removeItem('TOKEN');
};
