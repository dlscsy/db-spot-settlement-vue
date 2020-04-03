<!-- 主体框架 -->
<template>
  <div class="subject-mainpage-container" :class="classObj">
    <subject-top />
    <div class="subject-main-container">
      <subject-sider-menu />
      <div class="subject-show-container">
        <div class="fixed-header">
          <subject-access-path-info />
          <subject-tabs />
        </div>
        <subject-show-page />
      </div>
    </div>
  </div>
</template>

<script>
import SubjectTop from "subjectframe/SubjectTop.vue";
import SubjectSiderMenu from "subjectframe/sidermenu";
import SubjectAccessPathInfo from "subjectframe/SubjectAccessPathInfo.vue";
import SubjectTabs from "subjectframe/SubjectTabs.vue";
import SubjectShowPage from "subjectframe/SubjectShowPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "MainPage",
  components: {
    SubjectTop,
    SubjectSiderMenu,
    SubjectAccessPathInfo,
    SubjectTabs,
    SubjectShowPage
  },
  computed: {
    ...mapGetters(["isCollapse"]),
    classObj() {
      return {
        hideSideMenu: !this.isCollapse
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "styles/mixin.scss";
@import "styles/variables.scss";

.subject-mainpage-container {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;
  .subject-main-container {
    @include mpbClear;
    position: relative;
    top: 3.25rem;
  }
}

.subject-show-container {
  position: relative;
  margin-left: $sideBarWidth;
  transition: margin-left 0.28s; // 主显示区域动画样式
}

.fixed-header {
  position: fixed;
  top: 3.25rem;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSideMenu .fixed-header {
  width: calc(100% - 3.625rem);
}
</style>
