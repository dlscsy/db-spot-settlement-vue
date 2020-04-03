<!-- 表单对话框组件 -->
<template>
  <el-dialog
    :visible="visible"
    width="30%"
    :modal-append-to-body="false"
    v-bind="getModalBind()"
    :title="title"
    custom-class="base-fmodal-container sproject-mgt-fmodal-container"
    @close="handleCloseModal"
    @closed="handleCloseModal"
  >
    <div class="base-fmodal-body-container">
      <el-form
        :inline="false"
        label-position="right"
        label-width="90px"
        size="small"
        :status-icon="true"
        :destroy-on-close="true"
        :model="passwordForm"
        :rules="rules"
        ref="form"
      >
        <el-row>
          <el-col :span="15">
            <el-form-item label="原始密码" prop="oldPsd">
              <el-input
                v-model="passwordForm.oldPsd"
                :type="passwordType"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="新密码" prop="newPsd">
              <el-input
                v-model="passwordForm.newPsd"
                :type="passwordType"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="确认密码" prop="confirmPsd">
              <el-input
                v-model="passwordForm.confirmPsd"
                :type="passwordType"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="title" id="base-fmodal-title-container">{{ title }}</div>
    <div slot="footer" class="base-fmodal-footer-container">
      <el-button type="primary" size="small" @click="save()"
        ><svg-icon icon-class="save" />确定修改</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-close"
        size="small"
        @click="handleCloseModal()"
        >关闭</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import request from "utils/request";
import { JSEncrypt } from "jsencrypt";
import { getUserInfo } from "@/utils/auth";

export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordForm.newPsd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      passwordType: "password",
      passwordForm: {
        oldPsd: "",
        newPsd: "",
        confirmPsd: ""
      },
      publicKey: "",
      rules: {
        oldPsd: [
          { required: true, trigger: "blur", message: "请输入原始密码" }
        ],
        newPsd: [
          { required: true, trigger: "blur", message: "请输入新密码" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur"
          },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: "只能输入数字、字母",
            trigger: "blur"
          }
        ],
        confirmPsd: [
          { required: true, validator: validatePass2, trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur"
          },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: "只能输入数字、字母",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: false
    },
    title: {
      type: String,
      required: true
    }
  },
  created() {
    this.getPublicKey();
  },
  methods: {
    // 构建弹出对话框的绑定属性
    getModalBind() {
      return Object.assign(
        {},
        { "custom-class": "sproject-mgt-fmodal-container" }
        // this.config.modalMeta
      );
    },
    // 表单对话框关闭时事件处理
    handleCloseModal() {
      this.$refs.form.resetFields();
      this.$emit("update:visible", false);
    },
    handleChange(val) {
      if (val != this.projectCategoryOld) {
        this.fileName = "";
        this.importData = {};
      }
    },
    save() {
      let encryptor = new JSEncrypt(); // 新建JSEncrypt对象
      encryptor.setPublicKey(this.publicKey); // 设置公钥
      let params = Object.assign(
        {},
        {
          oldPsd: encryptor.encrypt(this.passwordForm.oldPsd),
          newPsd: encryptor.encrypt(this.passwordForm.newPsd),
          account: encryptor.encrypt(getUserInfo().account)
        }
        // this.config.modalMeta
      );
      this.$refs.form.validate(valid => {
        if (valid) {
          request("/loginController/changePassword", "post", params).then(
            res => {
              if (
                res.data.httpStatus === 200 &&
                res.data.businessCode === "B0000"
              ) {
                this.$alert("密码修改成功，请重新登录！", "提示", {
                  confirmButtonText: "确定",
                  callback: () => {
                    this.handleLogout();
                  }
                });
              } else if (
                res.data.httpStatus === 200 &&
                res.data.businessCode === "B0004"
              ) {
                this.$message({
                  message: res.data.message,
                  type: "error"
                });
              } else {
                this.$message({
                  message: "密码修改失败！",
                  type: "error"
                });
              }
            }
          );
        }
      });
    },
    getPublicKey() {
      request("/loginController/getPublicKey", "get").then(res => {
        this.publicKey = res.data.body.publicKey;
      });
    },
    handleLogout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push({ path: "/login" });
        this.$store.dispatch("tabs/delAllTabs");
      });
    }
  }
};
</script>
<style lang="scss" scope>
.base-fmodal-container .sproject-mgt-fmodal-container {
  display: block;
}
</style>
