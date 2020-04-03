<template>
  <div id="subject-tabs-container" class="subject-tabs-container">
    <scroll-pane ref="scrollPane" class="subject-tabs-wrapper">
      <router-link
        v-for="tab in visitedTabs"
        ref="tab"
        :id="tab.path"
        :key="tab.path"
        :class="isActive(tab) ? 'active' : ''"
        :to="{ path: tab.path, query: tab.query, fullPath: tab.fullPath }"
        tag="div"
        class="subject-tabs-item"
      >
        <svg-icon
          v-if="isActive(tab) || isHover(tab)"
          icon-class="tabitemiconactive"
          class="subject-tabs-item-icon"
        />
        <svg-icon
          v-else
          icon-class="tabitemicon"
          class="subject-tabs-item-icon"
        />
        {{ tab.title }}
        <svg-icon
          v-if="!tab.meta.noClose"
          icon-class="close"
          @click.prevent.stop="closeSelectedTab(tab)"
          class="subject-tabs-item-close-icon"
        />
      </router-link>
    </scroll-pane>
  </div>
</template>

<script>
import ScrollPane from "components/ScrollPane";
import path from "path";

export default {
  name: "SubjectTabs",
  components: { ScrollPane },
  data() {
    return {
      selectedTab: {},
      noCloseTabs: [],
      hoverTabPath: ""
    };
  },
  watch: {
    $route(route) {
      if (route.path !== "/") {
        // 监听路由变化从而新增TAB标签页
        this.addTab();
        // 滚动条移动到激活的TAB标签页
        this.moveToCurrentTab();
      }
    }
  },
  mounted() {
    // 初始化TAB标签页
    this.initTabs();
  },
  computed: {
    visitedTabs() {
      return this.$store.state.tabs.visitedTabs;
    },
    menus() {
      return this.$store.state.menuAuth.sideMenu.authMenus;
    }
  },
  methods: {
    isActive(route) {
      // 判断TAB标签页是否激活
      return route.path === this.$route.path;
    },
    isHover(route) {
      // 判断TAB标签页是否鼠标悬浮
      return route.path === this.hoverTabPath;
    },
    initTabs() {
      // 初始化TAB标签页集合
      const noCloseTabs = (this.noCloseTabs = this.filterNoCloseTabs(
        this.menus
      ));
      for (const tab of noCloseTabs) {
        if (tab.name) {
          this.$store.dispatch("tabs/addVisitedTab", tab);
        }
      }
    },
    addTab() {
      // 添加TAB标签页
      const { name, path } = this.$route;
      if (name) {
        this.$store.dispatch("tabs/addTab", this.$route);
        this.$nextTick(() => {
          // 新增TAB标签页时绑定鼠标悬浮事件
          document.getElementById(path).addEventListener("mouseover", () => {
            this.hoverTabPath = path;
          });
          document.getElementById(path).addEventListener("mouseleave", () => {
            this.hoverTabPath = "";
          });
        });
      }
      return false;
    },
    moveToCurrentTab() {
      // 控制滚动条移动至目标TAB标签页
      const tabs = this.$refs.tab;
      if (tabs) {
        this.$nextTick(() => {
          for (const tab of tabs) {
            if (tab.to.path === this.$route.path) {
              this.$refs.scrollPane.moveToTarget(tab);
              if (tab.to.fullPath !== this.$route.fullPath) {
                this.$store.dispatch("tabs/updateVisitedTab", this.$route);
              }
              break;
            }
          }
        });
      }
    },
    closeSelectedTab(tab) {
      // 关闭所选择的TAB标签页
      this.$store.dispatch("tabs/delTab", tab).then(({ visitedTabs }) => {
        if (this.isActive(tab)) {
          this.toLastTab(visitedTabs, tab);
        }
      });
    },
    toLastTab(visitedTabs, tab) {
      // 跳转至最后一个TAB标签页，用于关闭TAB标签页的后续操作
      const latestTab = visitedTabs.slice(-1)[0];
      if (latestTab) {
        this.$router.push(latestTab);
      } else {
        if (tab.name === "") {
          // TODO 如果有首页的话
          this.$router.replace({ path: "/redirect" + tab.fullPath });
        } else {
          this.$router.push("/");
        }
      }
    },
    filterNoCloseTabs(menus, basePath = "/") {
      // 获得不能被关闭的TAB标签页集合
      let tabs = [];
      menus.forEach(menu => {
        if (menu.meta && menu.meta.noClose) {
          const tabPath = path.resolve(basePath, menu.path);
          tabs.push({
            fullPath: tabPath,
            path: tabPath,
            name: menu.name,
            meta: { ...menu.meta }
          });
        }
        if (menu.children) {
          const tempTabs = this.filterNoCloseTabs(menu.children, menu.path);
          if (tempTabs.length >= 1) {
            tabs = [...tabs, ...tempTabs];
          }
        }
      });
      return tabs;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "styles/variables.scss";

.subject-tabs-container {
  height: 34px;
  width: 100%;
  background: $tabsBg;
  border-bottom: 1px solid $tabsDefaultBorderColor;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .subject-tabs-wrapper {
    .subject-tabs-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid $tabsDefaultBorderColor;
      border-radius: 5px 5px 0 0;
      color: $tabsDefaultText;
      background: $tabsDefaultBg;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 4px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 12px;
      }
      &:last-of-type {
        margin-right: 12px;
      }
      &.active {
        background-color: $tabsActiveBg;
        color: $tabsActiveText;
        border-color: $tabsActiveBorderColor;
      }
      &:hover {
        background-color: $tabsHover;
        color: $tabsHoverText;
        border-color: $tabsHover;
      }
    }
  }
}
</style>

<style lang="scss">
@import "styles/variables.scss";

.subject-tabs-wrapper {
  .el-scrollbar__wrap {
    height: 3.0625rem;
  }
  .el-scrollbar__bar.is-vertical {
    display: none;
  }
  .subject-tabs-item.active {
    .subject-tabs-item-close-icon {
      margin-left: 2px;
      &:hover {
        background-color: #fff;
        color: $tabsDefaultText;
      }
    }
  }
  .subject-tabs-item {
    .subject-tabs-item-close-icon {
      margin-left: 2px;
      &:hover {
        background-color: $tabsDefaultText;
        color: #fff;
      }
    }
  }
}

.subject-tabs-item-icon {
  margin-right: 2px;
}
</style>
