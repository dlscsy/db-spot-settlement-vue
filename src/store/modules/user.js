// import { Message } from "element-ui";
import { JSEncrypt } from "jsencrypt";
import request from "@/utils/request";
import {
  getToken,
  setToken,
  removeToken,
  getUserInfo,
  setUserInfo,
  removeUserInfo
} from "@/utils/auth";
import { SET_TOKEN, SET_USER_INFO } from "store/MutationTypes";

const state = {
  token: getToken(),
  userInfo: getUserInfo()
};

const mutations = {
  [SET_TOKEN](state, token) {
    state.token = token;
  },
  [SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
  }
};

const actions = {
  login({ commit }, params) {
    // console.log(params);
    return new Promise((resolve, reject) => {
      let encryptor = new JSEncrypt(); // 新建JSEncrypt对象
      encryptor.setPublicKey(params.publicKey); // 设置公钥
      let rsaAccount = encryptor.encrypt(params.loginForm.account); // 对用户名进行加密
      let rsaPassWord = encryptor.encrypt(params.loginForm.password); // 对密码进行加密

      // commit(SET_TOKEN, "1");
      // commit(SET_USER_INFO, "{}");
      // setToken("1");
      // setUserInfo("{}");
      // location.reload();
      // resolve();

      request("/loginController/login", "post", {
        account: rsaAccount,
        password: rsaPassWord
      })
        .then(res => {
          if (
            res.data.httpStatus === 200 &&
            res.data.businessCode === "B0000"
          ) {
            commit(SET_TOKEN, res.data.body.TOKEN);
            commit(SET_USER_INFO, res.data.body.LOGIN_USER);
            setToken(res.data.body.TOKEN);
            setUserInfo(res.data.body.LOGIN_USER);
            location.reload();
            resolve();
          } else {
            // Message.error({ message: res.data.message });
            throw res.data.message;
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      request("/loginController/logout", "post", state.userInfo)
        .then(() => {
          commit(SET_TOKEN, "");
          commit(SET_USER_INFO, {});
          removeToken();
          removeUserInfo();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit(SET_TOKEN, "");
      commit(SET_USER_INFO, {});
      removeToken();
      removeUserInfo();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
