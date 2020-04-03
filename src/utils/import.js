import XLSX from "xlsx";
/**
 * 读取Excel文件，转为{@link Object}对象（自定义函数）
 * @return {@link Object}：workbook，整个文档对象；
 */
FileReader.prototype.read2workbook = function() {
  let redABS = false; //是否将文件读取为二进制字符串
  let bytes = new Uint8Array(this.result); //无符号整型数组
  var wb;
  if (redABS) {
    // let fix = new TextDecoder(encode || 'UTF-8').decode(bytes);
    let fix = fixdata(bytes);
    let b2a = btoa(fix); //js原生方法：将字符转为base64编码。对应的atob(base64)方法，将base64转字符
    wb = XLSX.read(b2a, {
      type: "base64"
    });
  } else {
    let len = bytes.byteLength;
    let binarys = new Array(len); //创建定长数组，存储文本
    for (let i = 0; i < len; i++) binarys[i] = String.fromCharCode(bytes[i]);
    let binary = binarys.join("");
    wb = XLSX.read(binary, {
      type: "binary"
    });
  }
  return wb; //workbook
};
/**
 * 解析为...格式
 */
FileReader.prototype.read2 = function(format = "json") {
  let wb = this.read2workbook();
  if (!wb) return null;
  let r = {};
  let formats = ["json", "formulae", "html", "txt", "csv", "dif", "slk", "eth"]; //可被解析的格式
  format = formats.indexOf(format) == -1 ? "json" : format;
  wb.SheetNames.forEach(name => {
    //遍历每张纸数据
    r[name] = XLSX.utils["sheet_to_" + format](wb.Sheets[name]);
  });
  return r;
};
/**
 * 解析为JSON
 * @description: 此解析方式，XLSX将使用表格首行的每列名称，当作sheet数组对象的Key。
 * 故Excel每个工作表格的第一行必须有表头，且名称不可重复。
 */
FileReader.prototype.read2JS = function() {
  return this.read2();
};
/* 重写readAsBinaryString函数 */
FileReader.prototype.readAsBinaryString = function(f) {
  if (!this.onload)
    //如果this未重写onload函数，则创建一个公共处理方式
    this.onload = e => {
      //在this.onload函数中，完成公共处理
      let rs = this.read2workbook();
      rs;
      e;
    };
  this.readAsArrayBuffer(f); //内部会回调this.onload方法
};

/**
 * char值转String
 * @param data {@link Array}：char值；
 * @return {@link String}
 */
function fixdata(data) {
  let w = 1024 << 10; //每次读取1M字节
  let len = Math.floor(data.byteLength / w);
  let o = new Array(len);
  for (var i = 0; i < len; i++)
    o[i] = String.fromCharCode.apply(
      null,
      new Uint8Array(data.slice(i * w, (i + 1) * w))
    );
  o[i] = String.fromCharCode.apply(null, new Uint8Array(data.slice(i * w)));
  return o.join("");
}
