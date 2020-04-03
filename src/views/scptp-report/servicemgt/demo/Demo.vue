<template>
  <div>
    <base-template :pageKey="pageKey" :config="pageConfig">
      <!-- <template v-slot:customBtns>
        <el-button
          type="primary"
          size="small"
          @click="handleFileMgt"
        >
          附件
        </el-button>
      </template>-->
      <!-- <template v-slot:customColumnsFront>
        <el-table-column
          label="测试"
          header-align="center"
          align="center"
          width="42"
        />
      </template>
      <template v-slot:customColumnsBehind>
        <el-table-column
          label="测试"
          header-align="center"
          align="center"
          width="42"
        />
      </template>-->
    </base-template>
    <!-- <file-modal
      :visible.sync="fileModalVisible"
      :carriedParams="carriedParams"
    />-->
  </div>
</template>

<script>
import BaseTemplate from "templates/BaseTemplate";
// import FileModal from "components/FileModal";
import { pageConfig } from "./config";

export default {
  name: "Test1",
  components: {
    BaseTemplate
    // FileModal
  },
  props: {},
  data() {
    return {
      pageKey: "Test1",
      pageConfig: pageConfig
      // fileModalVisible: false,
      // carriedParams: {
      //   zzbm: "03",
      //   projectType: "0"
      // }
    };
  },
  watch: {},
  // 如果有声明周期函数，顺序在这里
  computed: {},
  methods: {
    // handleFileMgt() {
    //   this.fileModalVisible = true;
    // }
  }
};
</script>
