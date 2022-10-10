<template>
  <div class="main">
    <div class="py-container">
      <!--bread-->
      <div class="bread">
        <ul class="fl sui-breadcrumb">
          <li>
            <a href="#">全部结果</a>
          </li>
        </ul>
        <!-- 面包屑部分 -->
        <ul class="fl sui-tag">
          <!-- 分类的面包屑 -->
          <li class="with-x" v-show="searchParams.categoryName">
            {{ searchParams.categoryName }}
            <i @click="removeCategory">×</i>
          </li>
          <!-- 品牌的面包屑 -->
          <li class="with-x" v-show="searchParams.keyword">
            {{ searchParams.keyword }}
            <i @click="removeKeyword">×</i>
          </li>
          <!-- 品牌图片的面包屑 -->
          <li class="with-x" v-show="searchParams.trademark">
            {{ searchParams.trademark.split(':')[1] }}
            <i @click="removeTrademark">×</i>
          </li>
          <!-- 商品详细信息类型 例如:4G  8G -->
          <li
            class="with-x"
            v-for="(attrVal, index) in searchParams.props"
            :key="index"
          >
            {{ attrVal.split(':')[1] }}
            <i @click="removeProps(index)">×</i>
          </li>
        </ul>
      </div>
      <!--selector-->
      <SearchSelector
        @trademarkInfo="trademarkInfo"
        @attrInfo="attrInfo"
      ></SearchSelector>
      <!--details-->
      <div class="details clearfix">
        <div class="sui-navbar">
          <div class="navbar-inner filter">
            <!-- 商品的排序部分 -->
            <ul class="sui-nav">
              <li :class="{ active: isOne }" @click="changeArrows('1')">
                <a href="#">
                  综合
                  <i
                    v-show="isOne"
                    class="iconfont"
                    :class="{
                      'icon-jiantou_xiangxia': isAsc,
                      'icon-jiantou_xiangshang': isDesc,
                    }"
                  ></i>
                </a>
              </li>
              <li :class="{ active: isTwo }" @click="changeArrows('2')">
                <a href="#">
                  价格
                  <i
                    v-show="isTwo"
                    class="iconfont"
                    :class="{
                      'icon-jiantou_xiangxia': isAsc,
                      'icon-jiantou_xiangshang': isDesc,
                    }"
                  ></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
              <div class="list-wrap">
                <div class="p-img">
                  <router-link :to="`/detail/${good.id}`">
                    <img v-lazy="good.defaultImg" />
                  </router-link>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>{{ good.price }}</i>
                  </strong>
                </div>
                <div class="attr">
                  <a
                    target="_blank"
                    href="item.html"
                    title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                  >
                    {{ good.title }}
                  </a>
                </div>
                <div class="commit">
                  <i class="command">
                    已有
                    <span>2000</span>
                    人评价
                  </i>
                </div>
                <div class="operate">
                  <a
                    href="success-cart.html"
                    target="_blank"
                    class="sui-btn btn-bordered btn-danger"
                  >
                    加入购物车
                  </a>
                  <a href="javascript:void(0);" class="sui-btn btn-bordered">
                    收藏
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 分页器 -->
        <Pagination
          :pageNo="searchParams.pageNo"
          :pageSize="searchParams.pageSize"
          :total="total"
          :continues="5"
          @getPageNo="getPageNo"
        ></Pagination>
      </div>
      <!--hotsale-->
      <div class="clearfix hot-sale">
        <h4 class="title">热卖商品</h4>
        <div class="hot-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_01.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_03.png" />
                </div>
                <div class="attr">
                  <em>金属A面，360°翻转，APP下单省300！</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_04.png" />
                </div>
                <div class="attr">
                  <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4068.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有20人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_02.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import SearchSelector from '../SearchSelector/index.vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Main',
  components: { SearchSelector },
  data() {
    return {
      //定义需要的参数
      searchParams: {
        //一级分类id
        category1Id: '',
        //二级分类id
        category2Id: '',
        //三级分类id
        category3Id: '',
        //分类名字
        categoryName: '',
        //搜索关键字
        keyword: '',
        //排序
        order: '1:asc',
        //当前页号
        pageNo: 1,
        //展示商品数
        pageSize: 5,
        //平台售卖属性操作带的参数
        props: [],
        //品牌
        trademark: '',
      },
    };
  },
  mounted() {
    //发请求之前需要将searchParams里面的参数进行修改带给服务器
    this.getData();
    Object.assign(this.searchParams, this.$route.params, this.$route.query);
  },
  computed: {
    ...mapGetters(['goodsList']),
    //控制综合和销量的切换
    isOne() {
      return this.searchParams.order.indexOf('1') != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') != -1;
    },
    //控制升序降序
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1;
    },
    //获取total数据
    ...mapState({
      total: (state) => state.search.searchtList.total,
    }),
  },
  methods: {
    getData() {
      //由于需要发多次请求,所以把请求封装成一个函数,在需要的时候进行调用
      this.$store.dispatch('getSearchList', this.searchParams);
    },
    //清除categoryName分类标签
    removeCategory() {
      this.searchParams.categoryName = undefined;
      this.clearCategory();
      this.getData();
      if (this.$route.params) {
        //如果带有params参数,清除路径的时候不应该进行清除
        this.$router.push({ name: 'search', params: this.$route.params });
      }
    },
    //清除keyword关键字
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.getData();
      this.$bus.$emit('clear');
      if (this.$route.query) {
        //如果带有params参数,清除路径的时候不应该进行清除
        this.$router.push({ name: 'search', query: this.$route.query });
      }
    },
    //清除trademark
    removeTrademark() {
      this.searchParams.trademark = '';
      this.getData();
      if (this.$route.query) {
        //如果带有params参数,清除路径的时候不应该进行清除
        this.$router.push({ name: 'search', query: this.$route.query });
      }
    },
    //清除商品类型(params)
    removeProps(index) {
      //删除数组中元素
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    clearCategory() {
      //请求之后要把各级分类置空
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
    //实现自定义事件,点击品牌进行筛选
    trademarkInfo(trademark) {
      //对参数进行整理
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //整理完毕后发送请求
      this.getData();
    },
    //收集商品类型数据
    attrInfo(attr, type) {
      let props = `${attr.attrId}:${type}:${attr.attrName}`;
      //数组去重
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }
      this.getData();
    },
    //更改排序升序
    changeArrows(flag) {
      //flag代表着点击的是综合(1)还是价格(2)
      //原始状态
      //1   or   2
      let originFlag = this.searchParams.order.split(':')[0];
      //desc   asc
      let originSort = this.searchParams.order.split(':')[1];
      //定义一个新的order
      let newOrder = '';
      //判断是否点击的是同一个按钮
      if (originFlag == flag) {
        newOrder = `${originFlag}:${originSort == 'desc' ? 'asc' : 'desc'}`;
      } else {
        //点击的不是同一个按钮
        newOrder = `${flag}:${'desc'}`;
      }
      //进行数据整理
      this.searchParams.order = newOrder;
      //发请求
      this.getData();
    },
    //获取当前的页码
    getPageNo(pageNo) {
      //重新整理信息
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
  },
  //要时刻监听请求数据变化,采用watch进行数据监听
  watch: {
    $route() {
      //Object.assign:es6新增语法,合并对象
      //再次发请求之前整理带给服务器参数
      Object.assign(this.searchParams, this.$route.params, this.$route.query);
      //整理完毕后发送请求
      this.getData();
      //请求之后要把各级分类置空
      this.clearCategory();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
.main .py-container .details .goods-list ul li .list-wrap .price strong i {
  margin-left: 1px !important;
}
</style>
