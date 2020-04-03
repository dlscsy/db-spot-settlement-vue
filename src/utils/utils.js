// 生成唯一标识
export function uuid(len, radix) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );

  var uuid = [],
    i;

  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join("");
}

// 加法
export function addFun(a, b) {
  var str1 = a.toString(),
    str2 = b.toString(),
    r1,
    r2,
    m;
  try {
    r1 = str1.split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = str2.split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (a * m + b * m) / m;
}

// 减法
export function subtract(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //last modify by deeka
  //动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 乘法
export function multiply(a, b) {
  var str1 = a.toString(),
    str2 = b.toString(),
    m = 0;
  try {
    m += str1.split(".")[1].length;
  } catch (e) {
    //
  }
  try {
    m += str2.split(".")[1].length;
  } catch (e) {
    //
  }
  return (
    (Number(str1.replace(".", "")) * Number(str2.replace(".", ""))) /
    Math.pow(10, m)
  );
}

// 除法
export function divide(arg1, arg2) {
  var t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    //
  }
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    //
  }
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}
