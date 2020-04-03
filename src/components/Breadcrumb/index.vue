<!-- 面包屑组件 -->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="
            item.redirect === 'noRedirect' || index === levelList.length - 1
          "
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <!-- @click.prevent表示阻止[a]标签点击的默认行为，但能冒泡 -->
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from "path-to-regexp"; // url的正则表达式

export default {
  name: "Breadcrumb",
  data() {
    return {
      levelList: null // 构建路径面包屑层级所使用的集合
    };
  },
  watch: {
    $route(route) {
      // 监听路由变化
      if (route.path.startsWith("/redirect/")) {
        /*
         * 如果是以重定向标识过来的路径信息，则直接返回；
         * TAB标签页执行刷新操作时，会重定向当前TAB标签页对应的路由路径，
         * 该操作会在原有路径基础上添加前缀/redirect，
         * 因此拼接后的新路由会关联至views文件夹下redirect组件，
         * 该组件为工具类型的组件，在面包屑实际展示路径信息时不应作为其中一个层级，
         * 故return
         */
        return;
      }
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // 构建面包屑中的层级路径信息
      let matched = this.$route.matched.filter(
        item => item.meta && item.meta.title
      );

      this.levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    handleLink(item) {
      // 通过面包屑中跳转界面
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
    pathCompile(path) {
      const { params } = this.$route;
      /* 快速填充url字符串的参数值，例如：
       * var url = "/user/:id/:name";
       * var data = {id: 10001, name: "bob"};
       * console.log(pathToRegexp.compile(url)(data)) ==> /user/10001/bob
       */
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 0.75rem;
  line-height: 1.875rem;
  .no-redirect {
    color: #7f8ac8; // #97a8be
    cursor: text;
  }
}
</style>
