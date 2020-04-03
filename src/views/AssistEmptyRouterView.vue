<!-- 用于接收路由路径中存在，且该路径需要在路径面包屑中显示，但本身所关联组件不作为数据 -->
<!-- 主展示区所展示的组件，只是用于通过router-view的方式动态接收下级孩子路由所关联的组件 -->
<template>
  <div class="assist-empty-router-view-container">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "AssistEmptyRouterView"
};
</script>

<style lang="scss" scoped>
.assist-empty-router-view-container {
  min-height: calc(100vh - 7.25rem);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
