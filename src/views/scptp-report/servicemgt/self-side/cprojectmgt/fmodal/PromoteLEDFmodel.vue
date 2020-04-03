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
          <el-form-item label="用户名称" :rules="rules.Null" prop="userName">
            <el-input
              :value="value['userName']"
              @input="handleInput($event, 'userName')"
              placeholder="请输入用户名称"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" :rules="rules.Null" prop="projectName">
            <el-input
              :value="value['projectName']"
              @input="handleInput($event, 'projectName')"
              placeholder="请输入项目名称"
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
          <i class="el-icon-edit" />改造项目明细
        </div>
      </template>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="是否系统内改造"
            :rules="rules.Null"
            prop="exReform"
          >
            <el-select
              :value="value['exReform']"
              @input="handleInput($event, 'exReform')"
              style="width:100%;"
              clearable
            >
              <el-option
                v-for="o in exReform"
                :key="o.value"
                :label="o.label"
                :value="o.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="项目实施单位"
            :rules="rules.Null"
            prop="implCompany"
          >
            <el-input
              :value="value['implCompany']"
              @input="handleInput($event, 'implCompany')"
              placeholder="请输入项目实施单位"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="项目实施方式"
            :rules="rules.Null"
            prop="implType"
          >
            <el-select
              :value="value['implType']"
              @input="handleInput($event, 'implType')"
              style="width:100%;"
              @change="implTypeChange"
              clearable
            >
              <el-option
                v-for="o in implType"
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
          <el-form-item
            label="LED灯具改造数量"
            :rules="rules.Null"
            prop="ledNum"
          >
            <el-input
              :value="value['ledNum']"
              @input="handleInput($event, 'ledNum')"
              placeholder="单位：盏"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="年节电能力"
            :rules="rules.Null"
            prop="saveAbility"
          >
            <el-input
              :value="value['saveAbility']"
              @input="handleInput($event, 'saveAbility')"
              placeholder="单位：万千瓦时"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="灯具总降低功率">
            <el-input
              :value="value['reducePowerRate']"
              @input="handleInput($event, 'reducePowerRate')"
              placeholder="单位：万千瓦"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="项目投资金额">
            <el-input
              :value="value['investAmount']"
              @input="handleInput($event, 'investAmount')"
              placeholder="单位：万元"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="改造完成时间或合同开始时间" label-width="200px">
            <el-date-picker
              :value="value['contractStartDate']"
              @input="handleInput($event, 'contractStartDate')"
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
          <el-form-item label="合同截止时间">
            <el-date-picker
              :value="value['contractEndDate']"
              @input="handleInput($event, 'contractEndDate')"
              type="month"
              placeholder="请选择时间"
              format="yyyy-MM"
              value-format="yyyy-MM"
              style="width: 100%;"
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
      exReform: "",
      implType: ""
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
        this.implType = res.data.body;
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
    implTypeChange(val) {
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
    }
  }
};
</script>
