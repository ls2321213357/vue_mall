<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- 在home和search是显示的,在注册和登录页面不显示 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue';
import Footer from './components/Footer/index.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },

  //把请求放在这里,进行优化,避免多次请求接口
  mounted() {
    this.$store.dispatch('getCategoryList');
  },

  provide() {
    // 注册一个方法
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style>
a,
dd {
  text-decoration: none;
  /* 更改鼠标悬停样式 */
  cursor: pointer;
}
</style>
