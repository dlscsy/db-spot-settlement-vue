import axios from "axios";
import store from "store";
import { getToken } from "@/utils/auth";
import { MessageBox } from "element-ui";

const queryString = require("querystring");
const toLower = require("lodash/toLower");

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BUSINESS_BASE_URL, // 设置基础路径
  // withCredentials: true, // 设置跨域请求时是否需要使用凭证
  timeout: 100000 // 设置超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // console.log("================>", store.getters.token);
      // console.log("================>", getToken());
      config.headers["Auth-Token"] = getToken();
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    let replaceFlag = false;
    if (response.data.httpStatus === 404 || response.status === 404) {
      // TODO;
      // console.log(response.data);
    } else if (response.data.httpStatus === 403 && !replaceFlag) {
      MessageBox.alert(response.data.message, "消息提示", {
        confirmButtonText: "确定",
        type: "warning"
      }).then(() => {
        store.dispatch("user/resetToken").then(() => {
          replaceFlag = true;
          location.replace("/login");
        });
      });
    } else {
      // console.log(response.data);
      return response;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

const asyncFetch = function(url, fetchType, params) {
  let asyncConfig =
    toLower(fetchType) === "get"
      ? {
          url: url,
          method: toLower(fetchType),
          params: params ? { params: JSON.stringify(params) } : {}
        }
      : {
          url: url,
          method: toLower(fetchType),
          data: params
            ? queryString.stringify({ params: JSON.stringify(params) })
            : ""
        };
  return service(asyncConfig);
};

export default asyncFetch;
