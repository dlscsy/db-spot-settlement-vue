import Cookies from "js-cookie";

const TokenKey = "LOGINUSER_TOKEN";
const UserInfoKey = "USER_INFO";

const isEmpty = require("lodash/isEmpty");

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getUserInfo() {
  if (isEmpty(Cookies.get(UserInfoKey))) {
    return null;
  }
  return JSON.parse(Cookies.get(UserInfoKey));
}

export function setUserInfo(userInfo) {
  return Cookies.set(UserInfoKey, userInfo);
}

export function removeUserInfo() {
  return Cookies.remove(UserInfoKey);
}
