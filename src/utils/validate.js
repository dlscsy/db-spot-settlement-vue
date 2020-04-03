/* 校验工具类 */

/**
 * 是否从外部引入资源
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * URL校验
 * @param {string} url
 * @returns {Boolean}
 */
export function validateURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * 小写字母校验
 * @param {string} str
 * @returns {Boolean}
 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * 大写字母校验
 * @param {string} str
 * @returns {Boolean}
 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * 全字母校验
 * @param {string} str
 * @returns {Boolean}
 */
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * 邮箱校验
 * @param {string} email
 * @returns {Boolean}
 */
export function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * 全中文校验
 * @param {string} text
 * @returns {Boolean}
 */
export function validateChinese(text) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^[\u4e00-\u9fa5]+$/;
  return reg.test(text);
}

/**
 * 全数字校验
 * @param {string} number
 * @returns {Boolean}
 */
export function validateNumber(number) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^[0-9]+$/;
  return reg.test(number);
}

/**
 * 手机号校验
 * @param {string} phoneNumber
 * @returns {Boolean}
 */
export function validateCellPhone(phoneNumber) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
  return reg.test(phoneNumber);
}

/**
 * 国内电话号码校验
 * @param {string} telephone
 * @returns {Boolean}
 */
export function validateTelephone(telephone) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/;
  return reg.test(telephone);
}

/**
 * 身份证号校验
 * @param {string} id
 * @returns {Boolean}
 */
export function validateID(id) {
  // eslint-disable-next-line no-useless-escape
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(id);
}

/**
 * 强密码校验
 * 必须包含大小写字母和数字的组合，不能使用特殊字符
 * @param {string} pwd
 * @returns {Boolean}
 */
export function validatePwdNoSpecialChar(pwd) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]+$/;
  return reg.test(pwd);
}

/**
 * 强密码校验
 * 必须包含大小写字母和数字的组合，能使用特殊字符
 * @param {string} pwd
 * @returns {Boolean}
 */
export function validatePwdCanSpecialChar(pwd) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/;
  return reg.test(pwd);
}

/**
 * 账号校验
 * 字母开头，包含字母、数字和下划线
 * @param {string} account
 * @returns {Boolean}
 */
export function validateAccount(account) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^[a-zA-Z][a-zA-Z0-9_]+$/;
  return reg.test(account);
}
