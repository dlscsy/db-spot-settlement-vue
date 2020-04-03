<!-- 滚动条组件 -->
<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script>
// TAB标签页之间的距离
const tabAndTabSpacing = 4;

export default {
  name: "ScrollPane",
  data() {
    return {
      left: 0
    };
  },
  computed: {
    scrollWrapper() {
      return this.$refs.scrollContainer.$refs.wrap;
    }
  },
  methods: {
    handleScroll(e) {
      // 设置鼠标滚轮事件
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const $scrollWrapper = this.scrollWrapper;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
    },
    moveToTarget(currentTab) {
      // 滚动条移动至目标TAB标签页处
      const $container = this.$refs.scrollContainer.$el; // 获取滚动条组件
      const $containerWidth = $container.offsetWidth; // 获得滚动条水平方向的width + 左右padding + 左右border-width之和
      const $scrollWrapper = this.scrollWrapper; // 获得滚动条包装器
      const tabList = this.$parent.$refs.tab; // 获得TAB标签页集合

      let firstTab = null;
      let lastTab = null;

      if (tabList.length > 0) {
        // 找到第一个TAB标签页和最后一个TAB标签页
        firstTab = tabList[0];
        lastTab = tabList[tabList.length - 1];
      }

      if (firstTab === currentTab) {
        // 如果判断的TAB标签页和第一个TAB标签页一样，设置水平滚动条移动至最左边
        $scrollWrapper.scrollLeft = 0;
      } else if (lastTab === currentTab) {
        // 如果判断的TAB标签页和最后一个TAB标签页一样，设置水平滚动条移动至最右边
        $scrollWrapper.scrollLeft =
          $scrollWrapper.scrollWidth - $containerWidth;
      } else {
        // 找到所判断的TAB标签页的前一个TAB标签页和后一个TAB标签页
        const currentIndex = tabList.findIndex(item => item === currentTab);
        const prevTab = tabList[currentIndex - 1];
        const nextTab = tabList[currentIndex + 1];

        // 计算所判断的TAB标签页从相邻的后一个TAB标签页开始之后的距离位置
        // offsetLeft表示获取当前元素到定位父节点的left方向的距离
        const afterNextTabOffsetLeft =
          nextTab.$el.offsetLeft + nextTab.$el.offsetWidth + tabAndTabSpacing;

        // 计算所判断的TAB标签页从相邻的前一个TAB标签页开始之前的距离位置
        const beforePrevTabOffsetLeft =
          prevTab.$el.offsetLeft - tabAndTabSpacing;

        if (
          afterNextTabOffsetLeft >
          $scrollWrapper.scrollLeft + $containerWidth
        ) {
          /*
           * 如果后一个TAB标签页之后的距离位置大于当前滚动条的左滚动距离和滚动条组件宽度之和，
           * 实际就是新TAB标签页是在之前所选择的TAB标签页之后
           */
          // scrollLeft表示滚动条左滚动或者上滚动的距离
          $scrollWrapper.scrollLeft = afterNextTabOffsetLeft - $containerWidth;
        } else if (beforePrevTabOffsetLeft < $scrollWrapper.scrollLeft) {
          /*
           * 如果前一个TAB标签页之后的距离位置小于当前滚动条的左滚动距离，
           * 实际就是新TAB标签页是在之前所选择的TAB标签页之前
           */
          $scrollWrapper.scrollLeft = beforePrevTabOffsetLeft;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  // /deep/ {
  //   .el-scrollbar__bar {
  //     bottom: 0px;
  //   }
  //   .el-scrollbar__wrap {
  //     height: 49px;
  //   }
  // }
}
</style>
