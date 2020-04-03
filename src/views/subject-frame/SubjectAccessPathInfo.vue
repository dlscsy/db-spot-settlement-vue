<!-- 该组件用于封装界面访问的路径信息，提供控制菜单折叠/展开的按钮 -->
<template>
  <div class="subject-access-path-info-container">
    <hamburger
      id="hamburger-container"
      :is-active="isCollapse"
      class="hamburger-container"
      @toggleClick="toggleSideMenu"
    />
    <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "components/Hamburger";
import Breadcrumb from "components/Breadcrumb";
import { TOGGLE_MENU_COLLAPSE } from "store/MutationTypes";

export default {
  name: "SubjectAccessPathInfo",
  components: { Hamburger, Breadcrumb },
  computed: {
    ...mapGetters(["isCollapse"])
  },
  methods: {
    toggleSideMenu() {
      // 控制展开/收起整体菜单
      this.$store.commit("menuAuth/" + TOGGLE_MENU_COLLAPSE);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "styles/mixin.scss";
@import "styles/variables.scss";

.subject-access-path-info-container {
  height: 1.875rem;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 1.6rem;
    height: 100%;
    float: left;
    cursor: pointer;

    &:hover {
      background: $toggleSiderMenuBtnHoverBg;
    }
  }
  .breadcrumb-container {
    float: left;
  }
}
</style>
