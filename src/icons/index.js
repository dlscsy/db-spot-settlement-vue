import Vue from "vue";
import SvgIcon from "@/components/SvgIcon"; // svg component

// 注册全局组件
Vue.component("svg-icon", SvgIcon);

// 找到匹配的文件，第一个参数：从哪个目录下匹配；第二个参数：是否匹配子目录；第三个参数：用于匹配的正则表达式
const req = require.context("./svg", false, /\.svg$/);
// 将匹配通过的所有svg引入到项目中
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
