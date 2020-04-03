<template>
  <section class="subject-show-page">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :include="cachedTabs" :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "SubjectShowPage",
  computed: {
    cachedTabs() {
      // 获取需要保持页面中数据的缓存状态的TAB标签页集合
      return this.$store.state.tabs.cachedTabs;
    },
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped>
.subject-show-page {
  min-height: calc(100vh - 7.25rem);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .subject-show-page {
  padding-top: 4rem;
}

// .hasTagsView {
//   .app-main {
//     /* 84 = navbar + tags-view = 50 + 34 */
//     min-height: calc(100vh - 84px);
//   }

//   .fixed-header + .app-main {
//     padding-top: 84px;
//   }
// }
</style>

<style lang="scss">
// .el-popup-parent--hidden {
//   .fixed-header {
//     padding-right: 15px;
//   }
// }
</style>
