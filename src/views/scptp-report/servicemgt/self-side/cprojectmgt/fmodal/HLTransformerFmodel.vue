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
              @input="handleInput($event, 'userNum')"
              placeholder="请输入用户编号"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户名称" :rules="rules.Null" prop="userName">
            <el-input
              :value="value['userName']"
              @input="handleInput($event, 'userName')"
              placeholder="请输入客户名称"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="变压器编号"
            :rules="rules.Null"
            prop="transformerCode"
          >
            <el-input
              :value="value['transformerCode']"
              @input="handleInput($event, 'transformerCode')"
              placeholder="请输入变压器编号"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="用户所处行业"
            :rules="rules.Null"
            prop="userTradeType"
          >
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

        <el-col :span="8">
          <el-form-item
            label="高损变压器型号"
            :rules="rules.Null"
            prop="transformerModelNum"
          >
            <el-select
              :value="value['transformerModelNum']"
              @input="handleInput($event, 'transformerModelNum')"
              @blur="handleBlur($event, 'transformerModelNum')"
              style="width:100%;"
              @change="transformerModelNumChange"
              clearable
              filterable
            >
              <el-option
                v-for="o in transformerModelNum"
                :key="o.value"
                :label="o.label"
                :value="o.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item name="elCollapseItem2">
      <template slot="title">
        <div class="sproject-mgt-fmodal-collapse-title-container">
          <i class="el-icon-edit" />变压器明细
        </div>
      </template>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="容量（万千伏安）" prop="capacity">
            <el-select
              :value="value['capacity']"
              @input="handleInput($event, 'capacity')"
              @blur="handleBlur($event, 'capacity')"
              style="width:100%;"
              clearable
              filterable
            >
              <el-option
                v-for="o in capacity"
                :key="o.value"
                :label="o.label"
                :value="o.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="改造或淘汰年月">
            <el-date-picker
              :value="value['reOrElMonth']"
              @input="handleInput($event, 'reOrElMonth')"
              type="month"
              placeholder="请选择时间"
              format="yyyy-MM"
              value-format="yyyy-MM"
              style="width: 100%;"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="改造后变压器型号">
            <el-input
              :value="value['reformModelNum']"
              @input="handleInput($event, 'reformModelNum')"
              placeholder="请输入改造后变压器型号"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="改造实施单位">
            <el-input
              :value="value['reformCompany']"
              @input="handleInput($event, 'reformCompany')"
              placeholder="请输入改造实施单位"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="改造实施方式" prop="reformType">
            <el-select
              :value="value['reformType']"
              @input="handleInput($event, 'reformType')"
              style="width:100%;"
              @change="reformTypeChange"
              clearable
            >
              <el-option
                v-for="o in reformType"
                :key="o.value"
                :label="o.label"
                :value="o.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="改造后年节约电量">
            <el-input
              :value="value['saveQuantity']"
              @input="handleInput($event, 'saveQuantity')"
              placeholder="单位：万千瓦时"
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
import { getUserInfo } from "@/utils/auth";
const url = "/commonController/getDropDownCodesByCodeType/";
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
  data() {
    return {
      userTradeType: {},
      diagnosisCategory: [],
      projectType: [],
      activeElCollapseName: ["elCollapseItem1", "elCollapseItem2"],
      model: {},
      rules: {
        Null: [
          {
            required: true,
            pattern: /^(?=.*\S).+$/,
            trigger: ["blur", "change"],
            message: "必填项不能为空"
          }
        ]
      },
      transformerModelNum: "",
      capacity: "",
      reformType: ""
    };
  },
  mounted() {
    this.init();
    this.model = Object.assign(this.model, this.value);
  },
  methods: {
    init() {
      request(url + "18").then(res => {
        this.diagnosisCategory = res.data.body;
      });
      request(url + "17").then(res => {
        this.reformType = res.data.body;
      });
      request("/commonController/getTreeOrgs/" + getUserInfo().orgCode).then(
        res => {
          this.company = res.data.body;
        }
      );
      request(
        "/commonController/getModelNum/S_TRANSFORMER_PARAM",
        "get",
        {}
      ).then(res => {
        this.transformerModelNum = res.data.body;
      });
      request("/commonController/getTreeTradeCategories/-1").then(res => {
        this.userTradeType = res.data.body;
      });
      request(url + "11").then(res => {
        this.exCheck = res.data.body;
        this.exReform = res.data.body;
        this.exContract = res.data.body;
        this.exComplete = res.data.body;
      });
    },
    transformerModelNumChange() {
      this.model = Object.assign({}, this.model, { projectType: "" });
      request(
        "/commonController/getModelNum/S_TRANSFORMER_PARAM",
        "get",
        {}
      ).then(res => {
        this.projectType = res.data.body;
        request("/commonController/getCapacityByModelNum", "get", {
          MODEL_NUM: this.value.transformerModelNum
        }).then(res => {
          this.capacity = res.data.body;
          this.projectType = res.data.body;
        });
      });
    },
    diagnosisCategoryChange(val) {
      this.model = Object.assign({}, this.model, { projectType: "" });
      let param = {
        codeType: "18",
        parentCodeType: "18",
        parentCode: val
      };
      request("commonController/getSubDropDownCodes", "get", param).then(
        res => {
          this.projectType = res.data.body;
        }
      );
    },
    reformTypeChange(val) {
      this.model = Object.assign({}, this.model, { projectType: "" });
      let param = {
        codeType: "17",
        parentCodeType: "17",
        parentCode: val
      };
      request("commonController/getSubDropDownCodes", "get", param).then(
        res => {
          this.projectType = res.data.body;
        }
      );
    },
    calculateRCQ(val) {
      if (val) {
        this.model.reConvertQuantity = val / 10;
      } else {
        this.model.reConvertQuantity = "";
      }
    },
    handleInput(val, key) {
      this.$emit("input", { ...this.value, [key]: val });
    },
    save() {
      this.$refs["fmodal"].validate(valid => {
        if (valid) {
          this.$emit("save", Object.assign({}, this.value, this.model));
        }
      });
    },
    handleBlur(e, key) {
      this.$emit("input", { ...this.value, [key]: e.target.value });
    }
  }
};
</script>
