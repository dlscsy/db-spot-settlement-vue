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
          <el-form-item label="诊断用户名称" :rules="rules.Null" prop="userName">
            <el-input
              :value="value['userName']"
              @input="handleInput($event, 'userName')"
              placeholder="请输入诊断用户名称"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="诊断实施单位" :rules="rules.Null" prop="implCompany">
            <el-input
              :value="value['implCompany']"
              @input="handleInput($event, 'implCompany')"
              placeholder="请输入诊断实施单位"
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
              placeholder="请选择"
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
          <i class="el-icon-edit" />诊断明细
        </div>
      </template>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="诊断时间" :rules="rules.Null" prop="diagnosisDate">
            <el-date-picker
              :value="value['diagnosisDate']"
              @input="handleInput($event, 'diagnosisDate')"
              type="date"
              placeholder="请选择诊断时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="诊断费用" :rules="rules.Null" prop="diagnosisCost">
            <el-input
              :value="value['diagnosisCost']"
              @input="handleInput($event, 'diagnosisCost')"
              placeholder="单位：万元"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="诊断类别" :rules="rules.Null" prop="diagnosisCategory">
            <el-select
              :value="value['diagnosisCategory']"
              @input="handleInput($event, 'diagnosisCategory')"
              style="width:100%;"
              @change="diagnosisCategoryChange"
              clearable
            >
              <el-option
                v-for="o in diagnosisCategory"
                :key="o.value"
                :label="o.label"
                :value="o.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="是否意向开展改造">
            <el-select
              :value="value['exReform']"
              @input="handleInput($event, 'exReform')"
              style="width:100%;"
              clearable
            >
              <el-option v-for="o in exReform" :key="o.value" :label="o.label" :value="o.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否意向开展合同能源管理">
            <el-select
              :value="value['exContract']"
              @input="handleInput($event, 'exContract')"
              style="width:100%;"
              clearable
            >
              <el-option v-for="o in exContract" :key="o.value" :label="o.label" :value="o.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否完成改造">
            <el-select
              :value="value['exComplete']"
              @input="handleInput($event, 'exComplete')"
              style="width:100%;"
              clearable
            >
              <el-option v-for="o in exComplete" :key="o.value" :label="o.label" :value="o.value"></el-option>
            </el-select>
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
              <el-option v-for="o in reformType" :key="o.value" :label="o.label" :value="o.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="诊断报告年节电量">
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
  data () {
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
      exReform: "",
      exContract: "",
      exComplete: "",
      reformType: ""
    };
  },
  mounted () {
    this.init();
    this.model = Object.assign(this.model, this.value);
  },
  methods: {
    init () {
      request(url + "18").then(res => {
        this.diagnosisCategory = res.data.body;
      });
      request(url + "17").then(res => {
        this.reformType = res.data.body;
      });
      request("/commonController/getTreeTradeCategories/-1").then(res => {
        this.userTradeType = res.data.body;
      });
      request("/commonController/getTreeOrgs/" + getUserInfo().orgCode).then(
        res => {
          this.company = res.data.body;
        }
      );
      request(url + "11").then(res => {
        this.exCheck = res.data.body;
        this.exReform = res.data.body;
        this.exContract = res.data.body;
        this.exComplete = res.data.body;
      });
    },
    diagnosisCategoryChange (val) {
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
    reformTypeChange (val) {
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
    calculateRCQ (val) {
      if (val) {
        this.model.reConvertQuantity = val / 10;
      } else {
        this.model.reConvertQuantity = "";
      }
    },
    handleInput (val, key) {
      this.$emit("input", { ...this.value, [key]: val });
    },
    save () {
      this.$refs["fmodal"].validate(valid => {
        if (valid) {
          this.$emit("save", Object.assign({}, this.value, this.model));
        }
      });
    }
  }
};
</script>
