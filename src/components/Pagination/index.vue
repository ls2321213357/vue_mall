<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startPageAndEndPage.startPage > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startPageAndEndPage.startPage > 2">···</button>
    <!-- 因为v-for和v-if不能同时使用,所以可以用template进行包裹 -->
    <template v-for="(page, index) in startPageAndEndPage.endPage">
      <button
        :key="index"
        v-if="page >= startPageAndEndPage.startPage"
        @click="$emit('getPageNo', page)"
        :class="{ active: pageNo == page }"
      >
        {{ page }}
      </button>
    </template>
    <button v-if="startPageAndEndPage.endPage < totalPage - 1">···</button>
    <button
      v-if="startPageAndEndPage.endPage < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <!-- disabled让按钮变得不可用 -->
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Pagination',
  //total总共的数据  continues 连续页码
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    totalPage() {
      //向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    //定义起始页和最终页
    startPageAndEndPage() {
      //进行结构
      const { pageNo, totalPage, continues } = this;
      //赋予初值
      let startPage = 0,
        endPage = 0;
      if (continues > totalPage) {
        (startPage = 1), (endPage = totalPage);
      } else {
        startPage = pageNo - parseInt(continues / 2);
        endPage = pageNo + parseInt(continues / 2);
      }
      //当startPage出现负数的时候
      if (startPage < 1) {
        startPage = 1;
        //定义成到连续页码
        endPage = continues;
      }
      //当endPage出现大于总页数的情况
      if (endPage > totalPage) {
        endPage = totalPage;
        startPage = totalPage - continues + 1;
      }
      return { startPage, endPage };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
