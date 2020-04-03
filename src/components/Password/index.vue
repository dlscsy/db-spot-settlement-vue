<template>
  <el-input
    v-model="showValue"
    type="text"
    v-bind="$attrs"
    @input="handleInput"
  />
</template>

<script>
const isEmpty = require("lodash/isEmpty");

export default {
  name: "Password",
  props: {
    value: { type: String }
  },
  data() {
    return {
      showValue: "",
      realValue: ""
    };
  },
  watch: {
    value: function(newVal) {
      if (isEmpty(newVal)) {
        this.showValue = "";
        this.realValue = "";
      } else {
        let currStr = "";
        for (let i = 0; i < newVal.length; i++) {
          currStr += "●";
        }
        this.showValue = currStr;
      }
    }
  },
  methods: {
    handleInput(value) {
      if (
        isEmpty(value) ||
        (!isEmpty(value) && value.length < this.realValue.length)
      ) {
        this.$emit("input", "");
        return;
      }
      if (
        (isEmpty(this.realValue) && !isEmpty(value)) ||
        value.length > this.realValue.length
      ) {
        this.realValue += value.substring(
          value.lastIndexOf("●") + 1,
          value.length
        );
        this.$emit("input", this.realValue);
      }
    }
  }
};
</script>
