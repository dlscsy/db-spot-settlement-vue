<!-- 查询条件区域组件 -->
<template>
  <div class="condition-container">
    <el-form :ref="pageKey + `conditionForm`" :model="value" :inline="false" v-bind="getFormBind()">
      <el-row :key="0" :gutter="10">
        <el-col
          v-for="(item, index) in getRowConditions(0)"
          :key="'conditon-item-col0' + '-' + index"
          :span="7"
        >
          <div v-if="item.type === 'select'">
            <base-form-item
              :key="item.key"
              :item="item"
              :value="value[item.key]"
              @change="handleInput($event, item.key)"
            ></base-form-item>
          </div>
          <div v-else>
            <base-form-item
              :key="item.key"
              :item="item"
              :value="value[item.key]"
              @input="handleInput($event, item.key)"
            ></base-form-item>
          </div>
        </el-col>
        <el-col :span="btnSpan" style="padding-left: 1rem;">
          <el-button
            type="primary"
            icon="el-icon-search"
            :size="getBtnSize()"
            @click="handleQuery()"
          >查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh-left"
            :size="getBtnSize()"
            @click="handleReset()"
          >重置</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-if="this.needRowOpen" key="others">
          <el-row v-for="rowIndex in rowNum - 1" :key="rowIndex" :gutter="10">
            <el-col
              v-for="(item, index) in getRowConditions(rowIndex)"
              :key="'conditon-item-col' + rowIndex + '-' + index"
              :span="7"
            >
              <!-- <base-form-item
                :key="item.key"
                :item="item"
                :value="value[item.key]"
                @change="handleInput($event, item.key)"
              ></base-form-item>-->
              <div v-if="item.type === 'select'">
                <base-form-item
                  :key="item.key"
                  :item="item"
                  :value="value[item.key]"
                  @change="handleInput($event, item.key)"
                ></base-form-item>
              </div>
              <div v-else>
                <base-form-item
                  :key="item.key"
                  :item="item"
                  :value="value[item.key]"
                  @input="handleInput($event, item.key)"
                ></base-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
      <div
        v-if="rowNum > 1"
        class="condition-icon-container"
        @click.stop="needRowOpen = !needRowOpen"
      >
        <div v-if="!needRowOpen">
          <i class="el-icon-caret-bottom" />
          <div class="condition-icon-should-open-div">展开查询条件</div>
        </div>
        <div v-else>
          <i class="el-icon-caret-top" />
          <div class="condition-icon-should-open-div">隐藏查询条件</div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import BaseFormItem from "templates/item/BaseFormItem";
/**
 * pageKey                    业务页面唯一标识
 * value                      查询条件表单整体的数据对象，用于该自定义查询组件实现双向绑定
 * config                     自定义条件区域组件所需的配置文件，属性有：
 *   labelWidth               必填，条件项label的宽度
 *   size                     可选，条件项中单元组件的尺寸
 *   statusIcon               可选，条件项在执行校验之后是否显示校验状态图标
 *   items                    条件项对象的集合，条件项对象的属性详见BaseFormItem.vue组建中的说明
 *   rules                    各条件项校验规则集合
 */
const isUndefined = require("lodash/isUndefined");
const isEmpty = require("lodash/isEmpty");

export default {
  // name: "BaseCondition",
  components: {
    BaseFormItem
  },
  props: {
    // 业务页面唯一标识
    pageKey: {
      type: String,
      required: true
    },
    // 查询条件区域组件所需的配置
    config: {
      type: Object,
      required: true
    },
    // 表单整体的数据对象和对象值
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      rowNum: 0, // 条件的总行数
      needRowOpen: false, // 默认显示一行条件，条件项个数为4，该配置控制是否展开/收起剩余条件
      initConditions: {},
      btnSpan: 3
    };
  },
  created() {
    // 初始化数据
    this.setDefaultValue();
    // 获取条件渲染行数
    this.getRowNum();
    // 获得操作按钮的span值
    this.getBtnSpan();
  },
  methods: {
    // 设置初始化值
    setDefaultValue() {
      const conditions = { ...this.value };
      this.config.items.forEach(item => {
        const { key, initValue } = item;
        if (conditions[key] === undefined || conditions[key] === null) {
          conditions[key] = initValue;
        }
      });
      this.initConditions = { ...conditions };
      this.$emit("input", { ...conditions });
    },
    // 构建条件表单的绑定属性
    getFormBind() {
      return Object.assign(
        {},
        {
          "label-position": "right",
          "label-width": "100px",
          size: "small",
          "status-icon": true
        },
        this.config.formMeta
      );
    },
    getBtnSize() {
      return isEmpty(this.config.formMeta) ||
        isUndefined(this.config.formMeta.size)
        ? "small"
        : this.config.formMeta.size;
    },
    // 操作条件项时调用的方法
    handleInput(val, key) {
      // input为需要被监听的事件，第二个参数为该事件抛出的值
      this.$emit("input", { ...this.value, [key]: val });
    },
    // 获取条件的总行数
    getRowNum() {
      this.rowNum = Math.ceil(this.config.items.length / 3);
    },
    // 获得操作按钮的span值
    getBtnSpan() {
      this.btnSpan =
        this.config.items.length >= 3 ? 3 : 24 - this.config.items.length * 7;
    },
    // 获得每行需要渲染的条件集合
    getRowConditions(rowIndex) {
      return this.config.items.slice(rowIndex * 3, (rowIndex + 1) * 3);
    },
    // 查询时调用的方法
    handleQuery() {
      const refStr = this.pageKey + "conditionForm";
      this.$refs[refStr].validate(valid => {
        if (valid) {
          this.$emit("query");
        } else {
          return false;
        }
      });
    },
    // 重置时调用的方法
    handleReset() {
      // const refStr = this.pageKey + "conditionForm";
      // this.$refs[refStr].resetFields();
      this.$emit("input", { ...this.initConditions });
    }
  }
};
</script>
