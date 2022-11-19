export const phoneRule = (rules, val, callback) => {
  if((val??'') == '') {
    callback(new Error('请输入手机号码'))
  }else {
    console.log(val);
    if(/^1[3|4|5|6|7|8|9]\d{9}$/g.test(val)) {
      callback()
    }else {
      callback(new Error('请输入正确的手机号码'))
    }
  }
}