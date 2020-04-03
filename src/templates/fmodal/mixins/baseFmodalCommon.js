// 表单对话框的公共声明
import { mapGetters } from "vuex";
import BaseFormItem from "templates/item/BaseFormItem";

const isNumber = require("lodash/isNumber");
const isEmpty = require("lodash/isEmpty");
const isEqual = require("lodash/isEqual");
const moment = require("moment");

export default {
  components: {
    BaseFormItem
  },
  props: {
    // 业务页面唯一标识
    pageKey: {
      type: String,
      required: true
    },
    // 表单是否可见
    visible: {
      type: Boolean,
      required: true
    },
    // 表单对话框的标题
    title: {
      type: String,
      required: true
    },
    // 表单的配置文件
    config: {
      type: Object,
      required: true
    },
    // 表单的初始化数据
    initData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 表单整体的数据对象和对象值
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      itemsInRowNum: 3, // 表单每行显示表单项个数
      rowNum: 0, // 表单的总行数
      span: 8, // 各个表单项在所在行的宽度占比
      initFormDataForShow: {}, // 新增时的初始化数据对象
      changeData: {}, // 最终表单改变的数据汇总对象
      disabled: false, // 点击查看按钮查看详情时需要设置成true
      btnVisible: true // 查看详情对话框只需要显示关闭按钮
    };
  },
  created() {
    if (isNumber(this.config.itemsInRowNum)) {
      this.itemsInRowNum = this.config.itemsInRowNum;
      this.span = 24 / this.itemsInRowNum;
    }
    // 获取条件渲染行数
    this.getRowNum();
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    // 构建弹出对话框的绑定属性
    getModalBind() {
      return Object.assign({}, this.config.modalMeta);
    },
    // 构建表单的绑定属性
    getFormBind() {
      return Object.assign(
        {},
        {
          "label-position": "left",
          "label-width": "110px",
          size: "small",
          "status-icon": true
        },
        this.config.formMeta
      );
    },
    // 获得校验规则
    getRules() {
      return isEmpty(this.config.rules) ? [] : this.config.rules;
    },
    // 获得表单的总行数
    getRowNum() {
      this.rowNum = Math.ceil(this.config.items.length / this.itemsInRowNum);
    },
    // 获得每行需要渲染的表单项集合
    getRowFormItems(rowIndex) {
      return this.config.items.slice(
        (rowIndex - 1) * this.itemsInRowNum,
        rowIndex * this.itemsInRowNum
      );
    },
    // 表单对话框打开事件处理
    handleOpenModal() {
      if (this.title.indexOf("详情") >= 0) {
        this.disabled = true;
        this.btnVisible = false;
      }

      // 新增操作时设置初始化值
      if (this.title.indexOf("新增") >= 0) {
        this.setDefaultValueOnAdd();
      }
    },
    // 表单对话框打开后事件处理
    handleOpenedModal() {
      // 初始化数据
      if (this.title.indexOf("编辑") >= 0 || this.title.indexOf("详情") >= 0) {
        this.setDefaultValue();
      }
    },
    // 表单对话框关闭时事件处理
    handleCloseModal() {
      this.$emit("update:visible", false);
    },
    // 表单对话框关闭后事件处理
    handleClosedModal() {
      this.initFormDataForShow = {};
      this.changeData = {};
      this.disabled = false;
      this.btnVisible = true;
      this.$emit("input", {});
    },
    // 保存时调用的方法
    handleSave() {
      if (isEqual(this.initData, this.value)) {
        this.$message({
          message: "没有要变更的数据，不需要保存！",
          type: "warning"
        });
      } else {
        let actionType = "add";
        if (this.title.indexOf("编辑") >= 0) {
          actionType = "update";
        }
        this.$refs[`${this.pageKey}FmodalForm`].validate(valid => {
          if (valid) {
            let operationObj = {
              operator: isEmpty(this.userInfo)
                ? "未登录"
                : this.userInfo.userName,
              operateDate: moment().format("YYYY-MM-DD HH:mm:ss"),
              operatorCompany: isEmpty(this.userInfo)
                ? "未登录"
                : this.userInfo.orgCode
            };
            this.$emit("save", {
              actionType: actionType,
              changeData:
                actionType === "update"
                  ? Object.assign({}, this.changeData, operationObj)
                  : Object.assign(
                      {},
                      this.initFormDataForShow,
                      this.changeData,
                      operationObj,
                      { dataSource: "0", dataState: "0" }
                    )
            });
          } else {
            this.$message({
              message: "表单校验不通过，无法执行保存操作！",
              type: "warning"
            });
            return valid;
          }
        });
      }
    },
    // 重置时调用的方法
    handleReset() {
      if (this.title.indexOf("新增") >= 0) {
        this.$emit("input", { ...this.initFormDataForShow });
      } else {
        this.$emit("input", { ...this.initData });
      }
    },
    // 操作条件项时调用的方法
    handleInput(val, key) {
      this.changeData = Object.assign({}, this.changeData, { [key]: val });
      this.$emit("input", { ...this.value, [key]: val });
    },
    // 设置初始化值
    setDefaultValue() {
      const formDataForShow = { ...this.initData };
      this.$emit("input", { ...formDataForShow });
    },
    // 新增操作时设置初始化值
    setDefaultValueOnAdd() {
      const formDataForShow = { ...this.value };
      this.config.items.forEach(item => {
        const { key, initValue } = item;
        if (
          formDataForShow[key] === undefined ||
          formDataForShow[key] === null
        ) {
          formDataForShow[key] = initValue;
        }
      });
      this.initFormDataForShow = { ...formDataForShow };
      this.$emit("input", { ...formDataForShow });
    },
    // 编辑时设置不允许编辑的字段
    unEditable(item) {
      return item.unEditable && this.title.indexOf("编辑") >= 0;
    }
  }
};
