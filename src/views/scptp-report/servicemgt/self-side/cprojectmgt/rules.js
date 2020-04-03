export default {
  Null: [
    {
      required: true,
      pattern: /^(?=.*\S).+$/,
      trigger: ["blur", "change"],
      message: "必填项不能为空"
    }
  ],
  //必填，最多2位小数
  NumPot2: [
    {
      required: true,
      pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
      trigger: "blur",
      message: "请填写数字,最多2位小数"
    }
  ],
  //必填，最多4位小数
  NumPot4: [
    {
      required: true,
      pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,4})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9]{1,3})?$)/,
      trigger: "blur",
      message: "请填写数字,最多4位小数"
    }
  ],
  //非必填，最多2位小数
  fNumPot2: [
    {
      required: false,
      pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
      trigger: "blur",
      message: "请填写数字,最多2位小数"
    }
  ],
  //非必填，最多2位小数
  fNumPot4: [
    {
      required: false,
      pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,4})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9]{1,3})?$)/,
      trigger: "blur",
      message: "请填写数字,最多4位小数"
    }
  ]
};
