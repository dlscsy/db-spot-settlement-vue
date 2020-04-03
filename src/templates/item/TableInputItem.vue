<!-- 表单项公共工厂组件 -->
<template>
  <div class="base-form-item-container">
    <el-form
      :ref="`${pageKey}-${item.key}-BaseTableForm`"
      :model="value"
      :inline="false"
      :rules="getRules()"
      v-bind="getFormBind()"
    >
      <el-form-item :prop="item.key">
        <el-input
          v-if="item.type === 'input'"
          :type="item.subType"
          :value="value[item.key]"
          v-bind="getBind()"
          v-on="$listeners"
        ></el-input>

        <el-input-number
          v-if="item.type === 'inputNumber'"
          :value="value[item.key]"
          v-bind="getBind()"
          v-on="$listeners"
          style="width: 100%"
        ></el-input-number>

        <password
          v-if="item.type === 'password'"
          :value="value[item.key]"
          v-bind="getBind()"
          v-on="$listeners"
        ></password>

        <!-- <el-checkbox
      v-else-if="item.type === 'switch' && item.appearance === 'checkbox'"
      v-bind="getBind()"
      v-on="$listeners"
        ></el-checkbox>-->

        <!-- <el-switch
      v-else-if="item.type === 'switch'"
      v-bind="getBind()"
      v-on="$listeners"
    ></el-switch>

    <el-rate
      v-else-if="item.type === 'rate'"
      v-bind="getBind()"
      v-on="$listeners"
    ></el-rate>

    <el-color-picker
      v-else-if="item.type === 'color'"
      v-bind="getBind()"
      v-on="$listeners"
    ></el-color-picker>

    <el-slider
      v-else-if="item.type === 'slider'"
      v-bind="getBind()"
      v-on="$listeners"
        ></el-slider>-->

        <!-- <el-radio-group
      v-else-if="item.type === 'radio'"
      v-bind="getBind()"
      v-on="$listeners"
    >
      <component
        v-for="o in item.subOptions || ajaxOptions"
        :is="item.isBtnType ? 'el-radio-button' : 'el-radio'"
        :key="o.value"
        :label="o.value"
        :disabled="o.disabled"
        :border="item.border"
      >
        {{ o.label }}
      </component>
        </el-radio-group>-->

        <!-- <el-checkbox-group
      v-else-if="item.type === 'checkbox'"
      v-bind="getBind()"
      v-on="$listeners"
    >
      <component
        v-for="o in item.subOptions || ajaxOptions"
        :is="item.isBtnType ? 'el-checkbox-button' : 'el-checkbox'"
        :key="o.value"
        :label="o.value"
        :disabled="o.disabled"
        :border="item.border"
      >
        {{ o.label }}
      </component>
        </el-checkbox-group>-->

        <el-select
          v-else-if="item.type === 'select'"
          :value="value[item.key]"
          v-bind="getBind()"
          @visible-change="handleVisibleChange"
          @blur="handleBlur"
          v-on="$listeners"
          style="width: 100%;"
        >
          <el-option
            v-for="o in item.subOptions || ajaxOptions"
            :key="o.value"
            :label="o.label"
            :value="o.value"
          ></el-option>
        </el-select>

        <tree-select
          v-else-if="item.type === 'tree-select'"
          v-model="value[item.key]"
          :treeDataStructure="item.treeDataStructure || ajaxTreeDataStructure"
          v-bind="getBind()"
          @visible-change="handleVisibleChange"
          v-on="$listeners"
        ></tree-select>

        <!-- <el-cascader
      v-else-if="item.type === 'cascader'"
      v-bind="getBind()"
      v-on="$listeners"
      :options="
        item.subOptions ||
          require('element-china-area-data')[item.areaShortcut] ||
          ajaxOptions
      "
    ></el-cascader>

    <el-time-picker
      v-else-if="item.type === 'time'"
      v-bind="getBind()"
      v-on="$listeners"
        ></el-time-picker>-->

        <el-date-picker
          v-else-if="item.type === 'date'"
          :type="item.subType"
          :value="value[item.key]"
          v-bind="getBind()"
          v-on="$listeners"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "utils/request";
import {
  DROPDOWN_LINKAGE,
  DROPDOWN_VALUE_LINKAGE
} from "components/Table/TableConstant";
import TreeSelect from "components/TreeSelect";
import Password from "components/Password";

const isEmpty = require("lodash/isEmpty");
/**
 * key                        表单项的字段，对应于后台实体类对象中的字段
 * label                      表单项的汉字说明，用于页面渲染结果
 * type                       表单项的控件类型，取值：
 *   input                    输入框控件，配合另一个属性subType可展示多种输入框
 *   inputNumber              数值输入框控件
 *   select                   下拉框控件
 *   tree-select              树形下拉框控件
 *   cascader                 级联选择器
 *   time                     时间选择器
 *   date                     日期选择器
 *   radio                    单选框控件
 *   checkbox                 复选框控件
 *   switch                   开关控件
 *   rate                     评分控件
 *   slider                   滑块控件
 *   color                    颜色选择器
 * subType                    [input][date]类型控件的子类型，type为[input][date]时为必填
 * url                        异步获取数据需要的url
 * fetchType                  异步获取数据的方式，可选值：get，post
 * params                     异步获取数据需要的条件
 * subOptions                 [radio][checkbox][select][cascader]类型的控件的子项集合
 * treeDataStructure          [tree-select]类型的控件的用于构建树的数据对象
 * isBtnType                  [radio][checkbox]类型的控件是否采用按钮形式
 * widgetMeta                 必填，各个控件能配置的剩余属性，具体参考element-ui中各个控件的api描述
 * initValue                  初始化取值
 * ajaxUrl                    选填，异步构造subOptions属性集合的请求url
 */
export default {
  components: { TreeSelect, Password },
  props: {
    // 业务页面唯一标识
    pageKey: {
      type: String,
      required: true
    },
    // 表单项对象
    item: {
      type: Object,
      required: true
    },
    // 校验规则
    rules: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    // TODO 后续完善异步加载控件数据组成时所使用的结构
    return {
      ajaxOptions: [],
      ajaxTreeDataStructure: {}
    };
  },
  created() {
    this.asyncGetData();
  },
  methods: {
    // 构建表单项绑定属性
    getBind() {
      return Object.assign({}, this.$attrs, this.item.widgetMeta);
    },
    // 构建表单的绑定属性
    getFormBind() {
      return {
        size: "mini",
        "status-icon": true
      };
    },
    getRules() {
      return isEmpty(this.rules) ? {} : this.rules;
    },
    asyncGetData(otherParams) {
      const { url, fetchType, params, type } = this.item;
      if (url && fetchType) {
        request(url, fetchType, Object.assign({}, params, otherParams)).then(
          res => {
            if (type === "tree-select") {
              this.ajaxTreeDataStructure = res.data.body;
            }
            this.ajaxOptions = res.data.body;
          }
        );
      }
    },
    handleVisibleChange(visible) {
      if (visible) {
        if (
          this.item.linkageType === DROPDOWN_LINKAGE ||
          this.item.linkageType === DROPDOWN_VALUE_LINKAGE
        ) {
          if (
            isEmpty(this.item.linkageFields) ||
            isEmpty(this.item.paramFields)
          ) {
            this.asyncGetData();
          } else {
            let _linkageFields = this.item.linkageFields.split(",");
            let paramFields = this.item.paramFields.split(",");
            let _linkageParams = {};
            for (let i = 0; i < _linkageFields.length; i++) {
              _linkageParams[paramFields[i]] = this.value[_linkageFields[i]];
            }
            this.asyncGetData(_linkageParams);
          }
        } else {
          this.asyncGetData();
        }
      }
    },
    handleBlur(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>

<style lang="scss" scoped></style>
