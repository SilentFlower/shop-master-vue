class DateUtils {
  static format(dateStr,fmtStr) {
    if (dateStr == null || dateStr == "") {
      return "";
    }
    let date = new Date(dateStr);
    let ret;
    let fmt = fmtStr || 'yyyy-MM-dd HH:mm:SS';
    let opt = {
      "y+": date.getFullYear().toString(), // 年
      "M+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "H+": date.getHours().toString(), // 时
      "m+": date.getMinutes().toString(), // 分
      "S+": date.getSeconds().toString() // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
    };
    return fmt;
  }

  static formatTimestamp(timestamp,fmt) {
    return DateUtils.format(new Date(timestamp),fmt);
  }

  static formatTableDate(row, column, cellValue, index) {
    if(cellValue){
      return DateUtils.format(new Date(cellValue),'yyyy-MM-dd');
    }
    else{
      return '';
    }
  }
  static formatTableTime(row, column, cellValue, index) {
    if(cellValue){
      return DateUtils.format(new Date(cellValue));
    }
    else{
      return '';
    }
  }
}
export default DateUtils;
