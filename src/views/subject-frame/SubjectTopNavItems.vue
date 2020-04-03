<!-- 该组件用于封装系统基本操作，包括[登录人信息][登录日期][全屏][登出] -->
<template>
  <div class="subject-top-nav-items-container">
    <div>
      <el-button
        type="primary"
        size="medium"
        class="operation-btn"
        @click="editPassword"
      >
        密码修改
      </el-button>
      <!-- <span> <a @click="editPassword">修改密码&nbsp;&nbsp;</a> </span> -->

      <span v-if="this.getUserName() !== null">您好：</span>
      <span>{{ this.getUserName() }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span v-if="this.getCompanyName() !== null">所属公司：</span>
      <span>{{ this.getCompanyName() }}</span>
      <svg-icon icon-class="logout" @click.native.prevent="handleLogout" />
      <edit-password
        :visible.sync="passwordVisible"
        :title="passwordTitle"
      ></edit-password>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EditPassword from "@/components/Password/EditPassword";
const isEmpty = require("lodash/isEmpty");

export default {
  name: "SubjectTopNavItems",
  components: {
    EditPassword
  },
  data() {
    return {
      passwordTitle: "修改密码",
      passwordVisible: false
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    getUserName() {
      if (isEmpty(this.userInfo)) {
        return null;
      }
      return this.userInfo.userName;
    },
    getCompanyName() {
      if (isEmpty(this.userInfo)) {
        return null;
      }
      return this.userInfo.dictionaries.ORG_CODE_RELATION_VALUE;
    },
    handleLogout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push({ path: "/login" });
        this.$store.dispatch("tabs/delAllTabs");
      });
    },
    editPassword() {
      this.passwordVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "styles/mixin.scss";
@import "styles/variables.scss";

.subject-top-nav-items-container {
  @include flexScale(1);
  @include groupScale(2);
  @include mpbClear();
  display: flex;
  div {
    font-size: 0.91rem;
    margin: auto;
    color: #ffffff;
    letter-spacing: 0.0625rem;
    margin-left: -12.875rem;
    svg {
      margin-left: 1.875rem;
      font-size: 1.125rem;
    }
    svg:hover {
      cursor: pointer;
    }
  }
}
</style>
