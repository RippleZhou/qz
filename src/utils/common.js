const common = {};
// 验证码
common.getCode = function(_this) {
  const TIME_COUNT = 60;
  console.log("_this.timer", _this.timer);
  if (!_this.timer) {
    _this.count = TIME_COUNT;
    _this.codeShow = false;
    _this.timer = setInterval(() => {
      if (_this.count > 0 && _this.count <= TIME_COUNT) {
        _this.count--;
      } else {
        _this.codeShow = true;
        clearInterval(_this.timer);
        _this.timer = null;
      }
    }, 1000);
  }
};
common.isWeiXin = function() {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
};
common.isZhifb = function() {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/Alipay/i) == "alipay") {
    return true;
  } else {
    return false;
  }
};
common.validatePhoneNum = obj => {
  //手机号码验证
  console.log("obj:", obj);
  var $this = obj;
  if (/^1\d{10}$/.test($this)) {
    return true;
  } else {
    return false;
  }
};
common.isNumberOr = obj => {
  //密码验证
  var $this = obj;
  if (
    new RegExp(
      "(?=.*[a-zA-Z])(?=.*[d])[wW]{6,20}|(?=.*[a-zA-Z])(?=.*[d])[wW]{6,20}[A-Za-z0-9~!@#$^&*()=|{}]{6,}"
    ).test($this)
  ) {
    return true;
  } else {
    return false;
  }
};

export default common;
