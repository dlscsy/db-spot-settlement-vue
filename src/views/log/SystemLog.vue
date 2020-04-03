<!--计量侧报表汇总-->
<template>
  <base-template :pageKey="pageKey" :config="pageConfig"></base-template>
</template>

<script>
import BaseTemplate from "templates/BaseTemplate";
import { pageConfig } from "./config";
export default {
  name: "SystemLog",
  components: {
    BaseTemplate
  },
  props: {},
  data() {
    return {
      pageKey: "SystemLog",
      pageConfig: pageConfig
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.detail-button {
  padding: 6px 10px;
  font-size: 11px;
  border-radius: 3px;
  background: #01367a;
  border: 1px solid #01367a;
}
</style>
