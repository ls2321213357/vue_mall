import { v4 as uuidv4 } from 'uuid';
//要生成一个随机字符串,且每次执行不能发生变化,游客身份持久存储
export const getUuid = () => {
  //查看本地存储是否有uuid
  let uuid_token = localStorage.getItem('UUIDTOKEN');
  //如果没有的话 就赋值  有的话就不执行下面语句
  if (!uuid_token) {
    uuid_token = uuidv4();
    console.log(uuid_token);
    //存储到本地会话
    localStorage.setItem('UUIDTOKEN', uuid_token);
  }
  return uuid_token;
};
