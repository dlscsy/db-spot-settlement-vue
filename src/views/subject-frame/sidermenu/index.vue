<!-- 菜单组件的入口 -->
<template>
  <div class="subject-sider-menu-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="getSiderMenuCollapseState"
        :collapse-transition="false"
        :unique-opened="false"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
      >
        <subject-sider-menu-items
          v-for="menu in authMenus"
          :key="menu.menuId"
          :item="menu"
          :base-path="menu.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import variables from "styles/variables.scss";
import SubjectSiderMenuItems from "./SubjectSiderMenuItems";

export default {
  name: "SubjectSiderMenu",
  components: { SubjectSiderMenuItems },
  data() {
    return {
      openIndex: null,
      lastOpenIndex: null
    };
  },
  computed: {
    ...mapGetters(["authMenus", "isCollapse"]),
    variables() {
      // 获得全局样式变量集
      return variables;
    },
    getSiderMenuCollapseState() {
      // 获取整体菜单的展开/收起状态
      return !this.isCollapse;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "styles/variables.scss";
@import "styles/mixin.scss";

.subject-sider-menu-container {
  @include mpbClear();
  position: fixed;
  height: 100%;
  width: $sideBarWidth;
  background: #e0edf7;
  overflow: hidden;
  z-index: 1001;
  transition: width 0.28s;
  @include groupScale(1);
}
</style>
