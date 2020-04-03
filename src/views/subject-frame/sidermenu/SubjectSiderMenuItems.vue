<!-- 封装构造菜单项的工厂类功能性组件 -->
<template>
  <div>
    <template v-if="isChildrenEmpty(item)">
      <router-link :to="resolvePath('')" tag="span">
        <el-menu-item
          :index="item.menuId"
          :id="item.menuId"
          class="subject-sider-menu-leaf"
        >
          <subject-sider-menu-item
            :icon="item.meta.icon"
            :title="item.meta.title"
          />
        </el-menu-item>
      </router-link>
    </template>

    <el-submenu
      v-else
      :index="item.menuId"
      :id="item.menuId"
      popper-append-to-body
    >
      <template v-slot:title>
        <subject-sider-menu-item
          :icon="item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <subject-sider-menu-items
        v-for="child in item.children"
        :key="child.menuId"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="subject-sider-menu-secondary"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import SubjectSiderMenuItem from "./SubjectSiderMenuItem.vue";

const isEmpty = require("lodash/isEmpty");

export default {
  name: "SubjectSiderMenuItems",
  components: { SubjectSiderMenuItem },
  props: {
    // 菜单项
    item: {
      type: Object,
      required: true
    },
    // 上级的基准路径
    basePath: {
      type: String,
      default: ""
    }
  },
  methods: {
    isChildrenEmpty(item) {
      // 识别是否是含有子菜单的菜单项
      return isEmpty(item.children);
    },
    resolvePath(routePath) {
      // 拼接路径
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>
