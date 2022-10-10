//采用了路由懒加载
export default [
  //meta:控制该路由页面是否显示footer组件
  {
    path: '/center',
    component: () => import('@/pages/PayInfo/Center'),
    meta: {
      show: false,
    },
    children: [
      {
        path: 'myorder',
        component: () => import('@/pages/PayInfo/Center/MyOrder'),
      },
      {
        path: 'grouporder',
        component: () => import('@/pages/PayInfo/Center/GroupOrder'),
      },
      {
        path: '/center',
        redirect: '/center/myorder',
      },
    ],
  },
  {
    path: '/pay',
    component: () => import('@/pages/PayInfo/Pay'),
    meta: {
      show: false,
    },
    //路由内守卫
    beforeEnter: (to, from, next) => {
      //只有从购物车来的才能进入到交易页,否则都会停留在当前页
      if (from.path == '/trade') {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: '/paysuccess',
    component: () => import('@/pages/PayInfo/PaySuccess'),
    meta: {
      show: false,
    },
  },
  {
    path: '/trade',
    component: () => import('@/pages/PayInfo/Trade'),
    meta: {
      show: false,
    },
  },
  {
    path: '/addCartSuccess',
    component: () => import('@/pages/AddCartSuccess'),
    name: 'addCartSuccess',
    meta: {
      show: true,
    },
  },
  {
    path: '/detail/:skuId?',
    component: () => import('@/pages/Detail'),
    meta: {
      show: true,
    },
  },
  {
    path: '/shopcart',
    component: () => import('@/pages/ShopCart'),
    meta: {
      show: true,
    },
  },
  {
    path: '/home',
    component: () => import('@/pages/Home'),
    meta: {
      show: true,
    },
  },
  {
    path: '/login',
    component: () => import('@/pages/Login'),
    meta: {
      show: false,
    },
  },
  {
    path: '/register',
    component: () => import('@/pages/Register'),
    meta: {
      show: false,
    },
  },
  {
    path: '/search/:keyword?',
    component: () => import('@/pages/Search'),
    name: 'search',
    meta: {
      show: true,
    },
  },
  //对路由进行重定向,让访问的首先就是首页
  {
    path: '*',
    redirect: '/home',
  },
];
