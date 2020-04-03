<template>
  <el-collapse v-model="activeElCollapseName">
    <el-collapse-item name="elCollapseItem1">
      <template slot="title">
        <div class="sproject-mgt-fmodal-collapse-title-container">
          <i class="el-icon-edit" />档案基本信息
        </div>
      </template>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="用户编号" :rules="rules.Null" prop="userNum">
            <el-input
              :value="value['userNum']"
              placeholder="请输入用户编号"
              clearable
              @input="handleInput($event, 'userNum')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户名称" :rules="rules.Null" prop="userName">
            <el-input
              :value="value['userName']"
              placeholder="请输入内容"
              clearable
              @input="handleInput($event, 'userName')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" :rules="rules.Null" prop="projectName">
            <el-input
              :value="value['projectName']"
              placeholder="请输入内容"
              @input="handleInput($event, 'projectName')"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="用户所处行业" :rules="rules.Null" prop="userTradeType">
            <tree-select
              :treeDataStructure="userTradeType"
              placeholder="请选择用户所处行业"
              :value="value['userTradeType']"
              @input="handleInput($event, 'userTradeType')"
              filterable
              clearable
            ></tree-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item name="elCollapseItem2">
      <template slot="title">
        <div class="sproject-mgt-fmodal-collapse-title-container">
          <i class="el-icon-edit" />本月电量信息
        </div>
      </template>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="降低负荷手段" clearable>
            <el-select
              :value="value['reduceMethod']"
              @input="handleInput($event, 'reduceMethod')"
              style="width:100%;"
            >
              <el-option v-for="o in reduceMethod" :key="o.value" :label="o.label" :value="o.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="项目实施年月">
            <el-date-picker
              :value="value['implDate']"
              @input="handleInput($event, 'implDate')"
              type="month"
              placeholder="请选择项目实施年月"
              format="yyyy-MM"
              value-format="yyyy-MM"
              style="width: 100%;"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="转移电量（万kWh）" :rules="rules.fNumPot4" prop="transferQuantity">
            <el-input
              :value="value['transferQuantity']"
              @input="handleInput($event, 'transferQuantity')"
              placeholder="单位：万kWh"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="峰段时长（小时）" :rules="rules.fNumPot2" prop="peakDuration">
            <el-input
              :value="value['peakDuration']"
              @input="handleInput($event, 'peakDuration')"
              placeholder="单位：小时"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="激励措施或应用新技术新设备内容" label-width="240px">
            <el-input
              :value="value['incentiveContent']"
              @input="handleInput($event, 'incentiveContent')"
              placeholder="请输入激励措施或应用新技术新设备内容"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
import request from "utils/request";
import TreeSelect from "components/TreeSelect";
import rules from "../rules";
export default {
  components: {
    TreeSelect
  },
  props: {
    // 表单整体的数据对象和对象值
    value: {
      type: Object
      // required: true
    },
    pageKey: {
      type: String
      // required: true
    }
  },

  data () {
    return {
      userTradeType: {},
      reduceMethod: [],
      activeElCollapseName: ["elCollapseItem1", "elCollapseItem2"],
      rules: {
        ...rules
      }
    };
  },
  mounted () {
    // this.model = Object.assign({}, this.model, this.val);
    this.init();
  },
  methods: {
    init () {
      const url = "/commonController/getDropDownCodesByCodeType/";
      request(url + "21").then(res => {
        this.reduceMethod = res.data.body;
      });
      request("/commonController/getTreeTradeCategories/-1").then(res => {
        this.userTradeType = res.data.body;
      });
    },
    handleInput (val, key) {
      this.$emit("input", { ...this.value, [key]: val });
    }
  }
};
</script>
