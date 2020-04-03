<!-- 该组件用于封装2个小组件：[系统LOGO和系统名称信息的组件]和[系统基本操作的组件] -->
<template>
  <div class="subject-top-container">
    <subject-logo sysTitle="电力需求侧报表系统" logosrc="images/logo" />
    <subject-top-nav-items></subject-top-nav-items>
  </div>
</template>

<script>
import SubjectLogo from "subjectframe/SubjectLogo.vue";
import SubjectTopNavItems from "subjectframe/SubjectTopNavItems.vue";

export default {
  name: "SubjectTop",
  components: {
    SubjectLogo,
    SubjectTopNavItems
  }
};
</script>

<style lang="scss" scoped>
@import "styles/mixin.scss";
@import "styles/variables.scss";

.subject-top-container {
  width: 100%;
  height: 3.25rem;
  z-index: 1001;
  background: {
    color: #306edb;
  }
  position: fixed;
  @include flex-box($HORIZONTAL, $NOWRAP);
  justify-content: space-between;
}
</style>
