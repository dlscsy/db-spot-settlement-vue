<template>
  <el-collapse v-model="activeElCollapseName">
    <el-collapse-item name="elCollapseItem1">
      <template slot="title">
        <div class="sproject-mgt-fmodal-collapse-title-container">
          <i class="el-icon-edit" />节能服务本月数据
        </div>
      </template>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="科学用电示范点"
            :rules="rules.Null"
            prop="projectCode_14"
          >
            <el-input
              :value="value['projectCode_14']"
              @input="handleInput($event, 'projectCode_14')"
              placeholder
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="印发宣传资料"
            :rules="rules.Null"
            prop="projectCode_15"
          >
            <el-input
              :value="value['projectCode_15']"
              @input="handleInput($event, 'projectCode_15')"
              placeholder
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="基金投入(万元)"
            :rules="rules.Null"
            prop="projectCode_29"
          >
            <el-input
              :value="value['projectCode_29']"
              @input="handleInput($event, 'projectCode_29')"
              placeholder
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item name="elCollapseItem2">
      <template slot="title">
        <div class="sproject-mgt-fmodal-collapse-title-container">
          <i class="el-icon-edit" />节能宣传
        </div>
      </template>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="走进社区"
            :rules="rules.Null"
            prop="projectCode_16"
          >
            <el-input
              :value="value['projectCode_16']"
              @input="handleInput($event, 'projectCode_16')"
              placeholder
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="走进学校"
            :rules="rules.Null"
            prop="projectCode_17"
          >
            <el-input
              :value="value['projectCode_17']"
              @input="handleInput($event, 'projectCode_17')"
              placeholder
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="走进农村"
            :rules="rules.Null"
            prop="projectCode_18"
          >
            <el-input
              :value="value['projectCode_18']"
              @input="handleInput($event, 'projectCode_18')"
              placeholder
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item name="elCollapseItem3">
      <template slot="title">
        <div class="sproject-mgt-fmodal-collapse-title-container">
          <i class="el-icon-edit" />节能展示中心
        </div>
      </template>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="数量" :rules="rules.Null" prop="projectCode_19">
            <el-input
              :value="value['projectCode_19']"
              @input="handleInput($event, 'projectCode_19')"
              placeholder
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="参观批次"
            :rules="rules.Null"
            prop="projectCode_20"
          >
            <el-input
              :value="value['projectCode_20']"
              @input="handleInput($event, 'projectCode_20')"
              placeholder
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="参观市民人数"
            :rules="rules.Null"
            prop="projectCode_21"
          >
            <el-input
              :value="value['projectCode_21']"
              @input="handleInput($event, 'projectCode_21')"
              placeholder
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="参观中小学生人数"
            :rules="rules.Null"
            prop="projectCode_22"
          >
            <el-input
              :value="value['projectCode_22']"
              @input="handleInput($event, 'projectCode_22')"
              placeholder
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item name="elCollapseItem5">
      <template slot="title">
        <div class="sproject-mgt-fmodal-collapse-title-container">
          <i class="el-icon-edit" />节能降耗交流研讨班
        </div>
      </template>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="举办期次"
            :rules="rules.Null"
            prop="projectCode_23"
          >
            <el-input
              :value="value['projectCode_23']"
              @input="handleInput($event, 'projectCode_23')"
              placeholder
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="参加户数"
            :rules="rules.Null"
            prop="projectCode_24"
          >
            <el-input
              :value="value['projectCode_24']"
              @input="handleInput($event, 'projectCode_24')"
              placeholder
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="参加人数"
            :rules="rules.Null"
            prop="projectCode_25"
          >
            <el-input
              :value="value['projectCode_25']"
              @input="handleInput($event, 'projectCode_25')"
              placeholder
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item name="elCollapseItem4">
      <template slot="title">
        <div class="sproject-mgt-fmodal-collapse-title-container">
          <i class="el-icon-edit" />节能降耗交流研讨班
        </div>
      </template>

      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item
            label="节能咨询"
            :rules="rules.Null"
            prop="projectCode_26"
          >
            <el-input
              :value="value['projectCode_26']"
              @input="handleInput($event, 'projectCode_26')"
              placeholder
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="节能告知"
            :rules="rules.Null"
            prop="projectCode_27"
          >
            <el-input
              :value="value['projectCode_27']"
              @input="handleInput($event, 'projectCode_27')"
              placeholder
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="节能合理化建议"
            :rules="rules.Null"
            prop="projectCode_28"
          >
            <el-input
              :value="value['projectCode_28']"
              @input="handleInput($event, 'projectCode_28')"
              placeholder
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
//import TreeSelect from "components/TreeSelect";
const url = "/commonController/getDropDownCodesByCodeType/";
export default {
  components: {
    //TreeSelect
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
      technologyCategory: [],
      projectType: [],
      activeElCollapseName: [
        "elCollapseItem1",
        "elCollapseItem2",
        "elCollapseItem3",
        "elCollapseItem4",
        "elCollapseItem5"
      ],
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
      }
    };
  },
  mounted() {
    this.init();
    this.model = Object.assign(this.model, this.value);
  },
  methods: {
    init() {
      request(url + "1").then(res => {
        this.technologyCategory = res.data.body;
      });
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
