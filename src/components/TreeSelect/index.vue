<template>
  <el-select
    v-model="labelText"
    v-bind="$attrs"
    :filter-method="handleSelectFilter"
    @clear="handleClear"
    @blur="handleBlur"
    v-on="$listeners"
    style="width: 100%; overflow: hidden"
  >
    <el-option :value="labelText" :label="labelText">
      <el-tree
        id="tree-options"
        ref="Tree4Select"
        :accordion="accordion"
        :data="treeDataStructure.treeNodes"
        :props="props"
        :node-key="props.value"
        :default-expanded-keys="defaultExpandedKey"
        :filter-node-method="handleNodeFilter"
        @node-click="handleNodeClick"
      />
    </el-option>
  </el-select>
</template>

<script>
const isEmpty = require("lodash/isEmpty");

export default {
  name: "ElTreeSelect",
  props: {
    // 配置选项
    props: {
      type: Object,
      default: function() {
        return {
          value: "value", // 实际值对应的属性
          label: "label", // 显示值对应的属性
          children: "childrenNodes" // 子节点集合对应的属性
        };
      }
    },
    // 构建树的数据对象
    treeDataStructure: { type: Object, required: true },
    accordion: { type: Boolean, default: false },
    // 用于同步数据，初始数据
    value: { type: String }
  },
  data() {
    return {
      filterText: "",
      theValue: this.value, // 初始值
      labelText: "",
      defaultExpandedKey: []
    };
  },
  watch: {
    treeDataStructure() {
      this.theValue = this.value;
      this.labelText = this.value;
      this.init();
    },
    value() {
      this.theValue = this.value;
      this.labelText = this.value;
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化值
    init() {
      if (!isEmpty(this.treeDataStructure.treeNodes) && this.theValue) {
        this.labelText =
          this.getLabel(this.value, this.treeDataStructure.treeNodes) ===
          "undefined"
            ? this.labelText
            : this.getLabel(this.value, this.treeDataStructure.treeNodes);
        this.$refs.Tree4Select.setCurrentKey(this.theValue); // 设置默认选中
        this.defaultExpandedKey = [this.theValue]; // 设置默认展开
      }
    },
    getLabel(value, nodes) {
      if (isEmpty(value) || isEmpty(nodes)) {
        return null;
      } else {
        let label = "undefined";
        for (let node of nodes) {
          if (node[this.props.value] === value) {
            label = node[this.props.label];
            break;
          } else if (!isEmpty(node[this.props.children])) {
            label = this.getLabel(value, node[this.props.children]);
            if (label != "undefined") {
              break;
            }
          }
        }
        return label;
      }
    },
    // 节点点击事件
    handleNodeClick(node) {
      this.labelText = node[this.props.label];
      this.theValue = node[this.props.value];
      this.$emit("input", this.theValue);
      this.defaultExpandedKey = [];
    },
    // 清空选项事件
    handleClear() {
      this.labelText = "";
      this.theValue = "";
      this.defaultExpandedKey = [];
      this.clearSelected();
      this.$emit("input", null);
    },
    handleBlur(e) {
      this.labelText = e.target.value;
      this.defaultExpandedKey = [];
      this.clearSelected();
      this.$emit("input", e.target.value);
    },
    /* 清空选中样式 */
    clearSelected() {
      const allNode = document.querySelectorAll("#tree-options .el-tree-node");
      allNode.forEach(element => element.classList.remove("is-current"));
    },
    handleSelectFilter(val) {
      if (this.$attrs.filterable) {
        this.$refs.Tree4Select.filter(val);
      }
    },
    handleNodeFilter(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  padding: 0;
  overflow: hidden;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
</style>

<style lang="scss">
.el-select-dropdown.el-popper {
  .el-scrollbar {
    overflow: hidden;
  }
}
</style>
