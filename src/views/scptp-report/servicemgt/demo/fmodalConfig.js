import {
  validateChinese,
  validateEmail,
  validateCellPhone,
  validateTelephone,
  validateID,
  validatePwdCanSpecialChar,
  validateAccount
} from "utils/validate";

const isEmpty = require("lodash/isEmpty");

// form表单区域配置
export const fmodalConfig = {
  // 必填
  mainTitle: "用户信息",
  // 选填，表单每行显示表单项个数，必须能被24整除
  itemsInRowNum: 2,
  // 选填，配置项参考el-dialog的API
  modalMeta: {
    "destroy-on-close": true
  },
  // 选填，配置项参考el-form的API
  formMeta: {},
  // 必填
  items: [
    {
      key: "userName",
      label: "用户姓名",
      type: "input",
      subType: "text",
      widgetMeta: {
        placeholder: "请输入用户姓名"
      },
      initValue: ""
    },
    {
      key: "account",
      label: "用户账号",
      type: "input",
      subType: "text",
      widgetMeta: {
        placeholder: "请输入用户账号"
      },
      initValue: "",
      validateExistField: true
    },
    {
      key: "pwd",
      label: "用户密码",
      type: "password",
      widgetMeta: {
        placeholder: "请输入用户密码"
      },
      initValue: ""
    },
    {
      key: "contactNum",
      label: "联系电话",
      type: "input",
      subType: "text",
      widgetMeta: {
        placeholder: "请输入用户联系电话"
      },
      initValue: ""
    },
    {
      key: "email",
      label: "邮箱",
      type: "input",
      subType: "text",
      widgetMeta: {
        placeholder: "请输入邮箱"
      },
      initValue: ""
    },
    // {
    //   key: "sex",
    //   label: "用户性别",
    //   type: "select",
    //   url: "/commonController/getCodesByType/0",
    //   fetchType: "get",
    //   widgetMeta: {
    //     placeholder: "请选择用户性别"
    //   },
    //   initValue: ""
    // },
    {
      key: "regdate",
      label: "注册日期",
      type: "date",
      subType: "date",
      widgetMeta: {
        placeholder: "请选择注册日期",
        "value-format": "yyyy-MM-dd"
      },
      initValue: ""
    },
    {
      key: "orgCode",
      label: "所属组织机构",
      type: "tree-select",
      url: "/commonController/getTreeOrgs/00",
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择所属组织机构",
        clearable: true
      },
      initValue: ""
    },
    {
      key: "identificationNum",
      label: "身份证号",
      type: "input",
      subType: "text",
      widgetMeta: {
        placeholder: "请输入身份证号"
      },
      initValue: ""
    }
  ],
  rules: {
    userName: [
      { required: true, message: "姓名不能为空", trigger: "blur" },
      {
        validator: (rule, value, callback) => {
          if (!validateChinese(value) && !isEmpty(value)) {
            callback(new Error("姓名应该为中文格式"));
          }
          callback();
        }
      }
    ],
    account: [
      { required: true, message: "账号不能为空", trigger: "blur" },
      { min: 6, max: 16, message: "长度为6到16个字符", trigger: "blur" },
      {
        trigger: "blur",
        validator: (rule, value, callback) => {
          if (!validateAccount(value)) {
            callback(
              new Error("账号必须以字母开头，包含大小写字母、数字和下划线")
            );
          }
          callback();
        }
      }
    ],
    pwd: [
      { required: true, message: "密码不能为空", trigger: "blur" },
      { min: 8, max: 10, message: "长度为8到10个字符", trigger: "blur" },
      {
        trigger: "blur",
        validator: (rule, value, callback) => {
          if (!validatePwdCanSpecialChar(value)) {
            callback(new Error("密码须包含大小写字母和数字，可以含特殊字符"));
          }
          callback();
        }
      }
    ],
    contactNum: [
      {
        trigger: "blur",
        validator: (rule, value, callback) => {
          if (
            !validateCellPhone(value) &&
            !validateTelephone(value) &&
            !isEmpty(value)
          ) {
            callback(new Error("请输入正确的手机号或者电话号码"));
          }
          callback();
        }
      }
    ],
    email: [
      {
        trigger: "blur",
        validator: (rule, value, callback) => {
          if (!validateEmail(value) && !isEmpty(value)) {
            callback(new Error("邮箱格式不正确"));
          }
          callback();
        }
      }
    ],
    orgId: [
      { required: true, message: "所属组织机构不能为空", trigger: "blur" }
    ],
    identificationNum: [
      {
        trigger: "blur",
        validator: (rule, value, callback) => {
          if (!validateID(value) && !isEmpty(value)) {
            callback(new Error("身份证号格式不正确"));
          }
          callback();
        }
      }
    ]
  },
  // 选填，子表单的配置
  childrenForm: [
    // {
    //   mainTitle: "",
    //   itemsInRowNum: 2,
    //   modalMeta: {},
    //   formMeta: {},
    //   items: [],
    //   rules: []
    // }
  ]
};
