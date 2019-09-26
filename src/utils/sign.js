
import md5 from 'js-md5'
import {APP_KEY} from '@/service/config'

let signJs = {
  miscellaneous: {
    getSign: {},
    signedParams: {}
  }
}

/**
 * @synopsis zhkj-api-签名算法
 *
 * @param params 需要对象被签名的对象
 *
 * @returns
 */
signJs.miscellaneous.getSign = params => {
  let data = raw(params) + '&key=' + APP_KEY
  return md5(data).toUpperCase()
}
signJs.miscellaneous.signedParams = params => {
  let sign = signJs.miscellaneous.getSign(params)
  return Object.assign(params, { sign: sign })
}

let raw = function(args) {
  let keys = Object.keys(args);
  keys = keys.sort((a,b)=>( a.toLowerCase() > b.toLowerCase()?1:-1))
  let newArgs = {};
  keys.forEach(function(key) {
    newArgs[key] = args[key];
  });
  let string = "";
  for (let k in newArgs) {
    string += "&" + k + "=" + newArgs[k];
  }
  string = string.substr(1);
  console.log(string)
  return string;
};


export default signJs
