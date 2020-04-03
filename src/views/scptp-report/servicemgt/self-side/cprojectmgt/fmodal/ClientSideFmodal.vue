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
              placeholder="请输入内容"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" :rules="rules.Null" prop="projectName">
            <el-input
              :value="value['projectName']"
              @input="handleInput($event, 'projectName')"
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
          <el-form-item label="机组编号" :rules="rules.Null" prop="unitCode">
            <el-input
              :value="value['unitCode']"
              @input="handleInput($event, 'unitCode')"
              placeholder="请输入机组编号"
              clearable
            />
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
          <el-form-item label="机组容量" :rules="rules.fNumPot4" prop="unitCapacity">
            <el-input
              :value="value['unitCapacity']"
              @input="handleInput($event, 'unitCapacity')"
              placeholder="单位：万千瓦"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="投入运行时间">
            <el-date-picker
              :value="value['workingDate']"
              @input="handleInput($event, 'workingDate')"
              type="date"
              placeholder="请选择投入运行时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="目录电价" :rules="rules.fNumPot2" prop="catalogPrice">
            <el-input
              :value="value['catalogPrice']"
              @input="handleInput($event, 'catalogPrice')"
              placeholder="单位：万元/万千瓦时"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="上网电价" :rules="rules.fNumPot2" prop="gridPrice">
            <el-input
              :value="value['gridPrice']"
              @input="handleInput($event, 'gridPrice')"
              placeholder="单位：万元/万千瓦时"
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
          <el-form-item label="机组发电量" :rules="rules.fNumPot4" prop="unitQuantity">
            <el-input
              :value="value['unitQuantity']"
              @input="handleInput($event, 'unitQuantity')"
              placeholder="单位：万千瓦时"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="余额上网电量" :rules="rules.fNumPot4" prop="reQuantity">
            <el-input
              :value="value['reQuantity']"
              @input="handleInput($event, 'reQuantity')"
              @keydown="calculateRCQ"
              placeholder="单位：万千瓦时"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="余额上网电量（折算）" :rules="rules.fNumPot4" prop="reConvertQuantity">
            <el-input
              :value="value['reConvertQuantity']"
              @input="handleInput($event, 'reConvertQuantity')"
              placeholder="单位：万千瓦时"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="企业自用电量" :rules="rules.fNumPot4" prop="selfQuantity">
            <el-input
              :value="value['selfQuantity']"
              @input="handleInput($event, 'selfQuantity')"
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
      activeElCollapseName: [
        "elCollapseItem1",
        "elCollapseItem2",
        "elCollapseItem3"
      ],
      model: {},
      rules: {
        ...rules
      }
    };
  },
  watch: {
    "value.reQuantity" (val) {
      this.calculateRCQ(val);
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      request(url + "5").then(res => {
        this.technologyCategory = res.data.body;
      });
      request("/commonController/getTreeTradeCategories/-1").then(res => {
        this.userTradeType = res.data.body;
      });
      this.technologyCategoryChange(this.value.technologyCategory);
    },
    technologyCategoryChange (val) {
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
    calculateRCQ (val) {
      if (val) {
        this.value.reConvertQuantity = val / 10;
      } else {
        this.value.reConvertQuantity = "";
      }
    },
    handleInput (val, key) {
      this.$emit("input", { ...this.value, [key]: val });
    }
  }
};
</script>
