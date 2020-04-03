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
          <el-form-item label="分类" :rules="rules.Null" prop="category">
            <el-select
              :value="value['category']"
              @input="handleInput($event, 'category')"
              style="width:100%;"
              @change="isShow"
              clearable
            >
              <el-option v-for="o in category" :key="o.value" :label="o.label" :value="o.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
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
              placeholder="请输入内容"
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
        <el-col :span="8">
          <el-form-item label="技术分类" :rules="rules.Null" prop="technologyCategory">
            <el-select
              :value="value['technologyCategory']"
              @input="handleInput($event, 'technologyCategory')"
              style="width:100%;"
              @change="technologyCategoryChange"
              clearable
            >
              <el-option
                v-for="o in technologyCategory"
                :key="o.value"
                :label="o.label"
                :value="o.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目类型" :rules="rules.Null" prop="projectType">
            <el-select
              :value="value['projectType']"
              @input="handleInput($event, 'projectType')"
              style="width:100%;"
              clearable
            >
              <el-option v-for="o in projectType" :key="o.value" :label="o.label" :value="o.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
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
        <el-col :span="8">
          <el-form-item label="项目施工单位名称" :rules="rules.Null" prop="implCompany">
            <el-input
              :value="value['implCompany']"
              @input="handleInput($event, 'implCompany')"
              placeholder="请输入项目施工单位名称"
              clearable
            />
          </el-form-item>
        </el-col>
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
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="是否经过第三方审核" :rules="rules.Null" prop="exCheck">
            <el-select
              :value="value['exCheck']"
              @input="handleInput($event, 'exCheck')"
              style="width:100%;"
              clearable
            >
              <el-option v-for="o in exCheck" :key="o.value" :label="o.label" :value="o.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同开始时间" :rules="rules.Null" prop="contractStartDate">
            <el-date-picker
              :value="value['contractStartDate']"
              @input="handleInput($event, 'contractStartDate')"
              type="month"
              placeholder="请选择合同开始时间"
              format="yyyy-MM"
              value-format="yyyy-MM"
              style="width: 100%;"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同截止时间" :rules="rules.Null" prop="contractEndDate">
            <el-date-picker
              :value="value['contractEndDate']"
              @input="handleInput($event, 'contractEndDate')"
              type="month"
              placeholder="请选择合同截止时间"
              format="yyyy-MM"
              value-format="yyyy-MM"
              style="width: 100%;"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="项目竣工时间" :rules="rules.Null" prop="projectCompleteDate">
            <el-date-picker
              :value="value['projectCompleteDate']"
              @input="handleInput($event, 'projectCompleteDate')"
              type="month"
              placeholder="请选择项目竣工时间"
              format="yyyy-MM"
              value-format="yyyy-MM"
              style="width: 100%;"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="节能服务推动方式"
            :rules="rules.Null"
            prop="savePromoteType"
            v-if="showSavePromoteType"
          >
            <el-select
              :value="value['savePromoteType']"
              @input="handleInput($event, 'savePromoteType')"
              style="width:100%;"
              clearable
            >
              <el-option
                v-for="o in savePromoteType"
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
          <i class="el-icon-edit" />基本情况
        </div>
      </template>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="口径二投资金额" :rules="rules.NumPot2" prop="investAmount1">
            <el-input
              :value="value['investAmount1']"
              @input="handleInput($event, 'investAmount1')"
              placeholder="单位：万元"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="口径一投资金额" :rules="rules.NumPot2" prop="investAmount">
            <el-input
              :value="value['investAmount']"
              @input="handleInput($event, 'investAmount')"
              placeholder="单位：万元"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="口径二上年度用电规模" :rules="rules.NumPot4" prop="eleScale1">
            <el-input
              :value="value['eleScale1']"
              @input="handleInput($event, 'eleScale1')"
              placeholder="单位：万千瓦时"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="口径一上年度用电规模" :rules="rules.NumPot4" prop="eleScale">
            <el-input
              :value="value['eleScale']"
              @input="handleInput($event, 'eleScale')"
              placeholder="单位：万千瓦时"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item name="elCollapseItem3">
      <template slot="title">
        <div class="sproject-mgt-fmodal-collapse-title-container">
          <i class="el-icon-edit" />本月电量信息
        </div>
      </template>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="口径二实际节约电量" :rules="rules.NumPot4" prop="saveQuantity1">
            <el-input
              :value="value['saveQuantity1']"
              @input="handleInput($event, 'saveQuantity1')"
              placeholder="单位：万千瓦时"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="口径二折算后节约电量" :rules="rules.NumPot4" prop="saveConvertQuantity1">
            <el-input
              :value="value['saveConvertQuantity1']"
              @input="handleInput($event, 'saveConvertQuantity1')"
              placeholder="单位：万千瓦时"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="口径二实际节约电力" :rules="rules.NumPot4" prop="savePower1">
            <el-input
              :value="value['savePower1']"
              @input="handleInput($event, 'savePower1')"
              placeholder="单位：万千瓦"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="口径二折算后节约电力" :rules="rules.NumPot4" prop="saveConvertPower1">
            <el-input
              :value="value['saveConvertPower1']"
              @input="handleInput($event, 'saveConvertPower1')"
              placeholder="单位：万千瓦"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="口径二节约电费" :rules="rules.NumPot2" prop="saveCost1">
            <el-input
              :value="value['saveCost1']"
              @input="handleInput($event, 'saveCost1')"
              placeholder="单位：万元"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="口径一实际节约电量" :rules="rules.NumPot4" prop="saveQuantity">
            <el-input
              :value="value['saveQuantity']"
              @input="handleInput($event, 'saveQuantity')"
              placeholder="单位：万千瓦时"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="口径一折算后节约电量" :rules="rules.NumPot4" prop="saveConvertQuantity">
            <el-input
              :value="value['saveConvertQuantity']"
              @input="handleInput($event, 'saveConvertQuantity')"
              placeholder="单位：万千瓦时"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="口径一实际节约电力" :rules="rules.NumPot4" prop="savePower">
            <el-input
              :value="value['savePower']"
              @input="handleInput($event, 'savePower')"
              placeholder="单位：万千瓦"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="口径一折算后节约电力" :rules="rules.NumPot4" prop="saveConvertPower">
            <el-input
              :value="value['saveConvertPower']"
              @input="handleInput($event, 'saveConvertPower')"
              placeholder="单位：万千瓦"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="口径一节约电费" :rules="rules.NumPot2" prop="saveCost">
            <el-input
              :value="value['saveCost']"
              @input="handleInput($event, 'saveCost')"
              placeholder="单位：万元"
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
      technologyCategory: [],
      projectType: [],
      category: [],
      exCheck: [],
      savePromoteType: [],
      activeElCollapseName: [
        "elCollapseItem1",
        "elCollapseItem2",
        "elCollapseItem3"
      ],
      showSavePromoteType: false,
      showExSelfImpl: false,
      model: {},
      rules: {
        ...rules
      }
    };
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      request(url + "5").then(res => {
        this.technologyCategory = res.data.body;
      });
      request(url + "3").then(res => {
        this.category = res.data.body;
      });
      request(url + "11").then(res => {
        this.exCheck = res.data.body;
      });
      request(url + "14").then(res => {
        this.savePromoteType = res.data.body;
      });
      request("/commonController/getTreeTradeCategories/-1").then(res => {
        this.userTradeType = res.data.body;
      });
      this.technologyCategoryChange(this.value.technologyCategory);
    },
    technologyCategoryChange (val) {
      this.model = Object.assign({}, this.model, { projectType: "" });
      let param = {
        codeType: "6",
        parentCodeType: "5",
        parentCode: val
      };
      request("commonController/getSubDropDownCodes", "get", param).then(
        res => {
          this.projectType = res.data.body;
        }
      );
    },
    isShow (val) {
      this.showSavePromoteType = val == "5";
    },
    handleInput (val, key) {
      this.$emit("input", { ...this.value, [key]: val });
    }
  }
};
</script>
