<!-- 该组件用于封装系统LOGO和系统名称信息 -->
<template>
  <div class="subject-logo-container">
    <img :logosrc="logosrc" :src="imgSrc" class="subject-logo" />
    <template v-if="hasSysTile">
      <h2 class="subject-title" :sysTitle="sysTitle">
        {{ sysTitle }}
      </h2>
    </template>
  </div>
</template>

<script>
const isEmpty = require("lodash/isEmpty");

export default {
  name: "SubjectLogo",
  props: {
    logosrc: {
      type: String,
      default: "defaultLogo"
    },
    sysTitle: {
      type: String,
      default: "需求侧计量报表多维度展示系统"
    }
  },
  computed: {
    imgSrc() {
      // 设置logo图形资源的来源
      return require("assets/" + this.logosrc + ".png");
    },
    hasSysTile() {
      // 是否存在系统名称
      return !isEmpty(this.sysTitle);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "styles/mixin.scss";
@import "styles/variables.scss";

.subject-logo-container {
  @include flexScale(4);
  @include groupScale(1);
  @include mpbClear();
  display: flex;
  .subject-logo {
    height: 2.625rem;
    width: 2.625rem;
    margin: auto 0;
    margin-left: 0.625rem;
    margin-right: 0.625rem;
  }
  h2 {
    margin: auto 0;
    margin-left: 0.375rem;
    color: #ffffff;
  }
}
</style>
