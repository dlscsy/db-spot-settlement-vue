import Vue from "vue";
// 使用Cookie
import Cookies from "js-cookie";
// 使用normalize.css在默认的HTML元素样式上提供了跨浏览器的高度一致性
import "normalize.css/normalize.css";
// 引入样式
import ElementUI from "element-ui";
import "styles/element-variables.scss";
import "styles/index.scss";

import App from "./App.vue";
import router from "router";
import store from "store";

import "./routerPermission";
// import "./directives";
import "./icons";

// 阻止启动生产消息，常用作指令
Vue.config.productionTip = false;
//引入echart
import echarts from 'echarts'
//将echarts引入到vue的原型中
Vue.prototype.$echarts = echarts


Vue.use(ElementUI, {
  size: Cookies.get("size") || "medium"
});

// 整体前台入口
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
