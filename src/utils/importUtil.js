const isEmpty = require("lodash/isEmpty");
const isUndefined = require("lodash/isUndefined");
const isNumber = require("lodash/isNumber");
const moment = require("moment");
import { uuid } from "utils/utils";

//excel读取的日期为浮点数 转成日期类型
export function toDate(val) {
  var date = new Date(1900, 0, val - 1);
  return date;
}

//config: 配置参数，data: excel读取数据，commonParam：公共参数
export function toObject(config, data, commonParam) {
  var resultArr = [];
  var isFail = false;
  var failRows = [];
  var timeErrorRows = [];
  if (!isEmpty(config) && !isEmpty(data)) {
    p: for (var index in data) {
      var temp = {};
      var redata = data[index];
      if (
        !isUndefined(redata["*上报月份"]) &&
        moment(toDate(redata["*上报月份"])).format("YYYY-MM") !=
          commonParam["theMonth"]
      ) {
        //统计年月验证
        isFail = true;
        timeErrorRows.push(Number(index) + 1);
        continue p;
      }
      for (var key in config) {
        var column = config[key];
        var keyWord = key;
        if (!isUndefined(column.required) && column.required) {
          keyWord = "*" + key;
        }
        if (
          !isUndefined(column.required) &&
          column.required &&
          (isUndefined(redata[keyWord]) ||
            (isEmpty(redata[keyWord]) && !isNumber(redata[keyWord])))
        ) {
          //必填项为空时
          isFail = true;
          failRows.push(Number(index) + 1);
          continue p;
        }

        if (!redata[keyWord]) {
          // temp[column.prop] = redata[keyWord];
          continue;
        }
        if (!isUndefined(column.isCode) && column.isCode) {
          //带码值的处理
          temp[column.prop] = redata[keyWord].split("＊")[0];
        } else if (!isEmpty(column.type) && column.type == "date") {
          //日期类型
          if (!isEmpty(column.format)) {
            //格式化日期
            temp[column.prop] = moment(toDate(redata[keyWord])).format(
              column.format
            );
          } else {
            temp[column.prop] = toDate(redata[keyWord]);
          }
        } else {
          temp[column.prop] = redata[keyWord];
        }
      }
      if (!isEmpty(commonParam)) {
        temp = Object.assign(temp, commonParam);
      }
      resultArr.push(temp);
    }
  }
  return {
    data: resultArr,
    isFail,
    failRows: failRows,
    timeErrorRows: timeErrorRows
  };
}

//config: 配置参数，data: excel读取数据，commonParam：公共参数  自身侧
export function toObject4Self(config, data, commonParam) {
  var resultArr = []; //子表数据
  var baseArr = []; //基表数据
  var isFail = false;
  var failRows = [];
  var baseFailRows = [];
  var timeErrorRows = [];
  if (!isEmpty(config) && !isEmpty(data)) {
    var projectId = "";
    p: for (var index in data) {
      var temp = {};
      var basetemp = {};
      var redata = data[index];
      if (
        !isUndefined(redata["*上报月份"]) &&
        moment(toDate(redata["*上报月份"])).format("YYYY-MM") !=
          commonParam["theMonth"]
      ) {
        //统计年月验证
        isFail = true;
        timeErrorRows.push(Number(index) + 1);
        continue;
      }
      for (var key in config) {
        var column = config[key];
        var keyWord = key;
        if (!isUndefined(column.required) && column.required) {
          keyWord = "*" + key;
        }
        if (
          !isUndefined(column.required) &&
          column.required &&
          (isUndefined(redata[keyWord]) ||
            (isEmpty(redata[keyWord]) && !isNumber(redata[keyWord]))) &&
          (isUndefined(column.base) || !column.base) &&
          failRows.indexOf(Number(index) + 1) == -1
        ) {
          //子表必填项校验
          //必填项为空时
          isFail = true;
          failRows.push(Number(index) + 1);
          continue;
        }

        if (redata["*上报月份"] || index == 0) {
          //基表必填项校验
          if (
            !isUndefined(column.required) &&
            column.required &&
            (isUndefined(redata[keyWord]) ||
              (isEmpty(redata[keyWord]) && !isNumber(redata[keyWord]))) &&
            column.base &&
            baseFailRows.indexOf(Number(index) + 1) == -1
          ) {
            //必填项为空时
            isFail = true;
            baseFailRows.push(Number(index) + 1);
            continue p;
          }
        } else {
          if (
            !isUndefined(column.required) &&
            column.required &&
            (isUndefined(redata[keyWord]) ||
              (isEmpty(redata[keyWord]) && !isNumber(redata[keyWord]))) &&
            (isUndefined(column.base) || !column.base) &&
            baseFailRows.indexOf(Number(index) + 1) == -1
          ) {
            //子表必填项校验
            //必填项为空时
            isFail = true;
            baseFailRows.push(Number(index) + 1);
            continue;
          }
        }
        if (!redata[keyWord]) {
          //          temp[column.prop] = redata[keyWord];
          continue;
        }
        if (isUndefined(column.base) || !column.base) {
          //子表数据
          if (!isUndefined(column.isCode) && column.isCode) {
            //带码值的处理
            temp[column.prop] = redata[keyWord].split("＊")[0];
          } else if (!isEmpty(column.type) && column.type == "date") {
            //日期类型
            if (!isEmpty(column.format)) {
              //格式化日期
              temp[column.prop] = moment(toDate(redata[keyWord])).format(
                column.format
              );
            } else {
              temp[column.prop] = toDate(redata[keyWord]);
            }
          } else {
            temp[column.prop] = redata[keyWord];
          }
        } else {
          //基表数据
          if (!isUndefined(column.isCode) && column.isCode) {
            //带码值的处理
            basetemp[column.prop] = redata[keyWord].split("＊")[0];
          } else if (!isEmpty(column.type) && column.type == "date") {
            //日期类型
            if (!isEmpty(column.format)) {
              //格式化日期
              basetemp[column.prop] = moment(toDate(redata[keyWord])).format(
                column.format
              );
            } else {
              basetemp[column.prop] = toDate(redata[keyWord]);
            }
          } else {
            basetemp[column.prop] = redata[keyWord];
          }
        }
      }
      if (!isEmpty(basetemp) && !isEmpty(basetemp["theMonth"])) {
        projectId = uuid(36, 16);
        basetemp["projectId"] = projectId;
        if (!isEmpty(commonParam)) {
          basetemp = Object.assign(basetemp, commonParam);
        }
        baseArr.push(basetemp);
      }
      if (isEmpty(temp)) {
        failRows.pop(Number(index) + 1);
      } else {
        temp["projectId"] = projectId;
        resultArr.push(temp);
      }
    }
  }
  failRows = failRows.concat(baseFailRows);
  return {
    data: { resultArr: resultArr, baseArr: baseArr },
    isFail,
    failRows: Array.from(new Set(failRows)),
    timeErrorRows: timeErrorRows,
    baseFailRows: baseFailRows
  };
}
