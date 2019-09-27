<template>
  <div>
    <headers :setTitle="setTitle"></headers>
    <div class="qz_boxs qz_topBor">
      <div class="qz_login_box">
        <div class="qz_login_list">
          <input
            type="tel"
            placeholder="请输入手机号"
            v-model="user.cellPhone"
            oninput="if(value.length>11)value=value.slice(0,11)"
          />
        </div>
        <div class="qz_login_list qz_login_list2">
          <input type="tel" placeholder="请输入验证码" v-model="user.code" />
          <span @click="getMyCode" v-show="codeShow">获取验证码</span>
          <span v-show="!codeShow">{{count}}&nbsp;s</span>
          <div id="ic"></div>
        </div>
        <div class="qz_login_list">
          <input
            v-model="user.pwdInput"
            oninput="if(value.length>6)value=value.slice(0,20)"
            type="password"
            placeholder="请输入新密码（最少6位字符，数字+字母）"
          />
        </div>
      </div>
      <div class="qz_login_btns" @click="submit">提交</div>
    </div>
  </div>
</template>
<script>
//qz_login.less
import common from '@/utils/common'
import Headers from '@/components/Headers'
import signJs from '@/utils/sign'
export default {
  name: 'findPassword',
  components: { Headers },
  data() {
    return {
      setTitle: '找回密码',
      codeShow: true,
      TIME_COUNT: 0,
      timer: 0,
      count: 0,
      user: {
        token: '',
        userType: 3,
        cellPhone: '',
        type: '103' //短信模板类型：101：注册;102：登录；103：找回密码/支付密码；105:注册成功;106:修改手机绑定;110:微信绑定手机号
      }
    }
  },
  mounted() {
    this.getCode1()
  },
  methods: {
    viewDefault: function() {
      window.scroll(0, 0)
    },
    getCode1() {
      const script = document.createElement('script')
      script.src = `https://cdn.dingxiang-inc.com/ctu-group/captcha-ui/index.js`
      script.language = 'JavaScript'
      document.body.appendChild(script)
    },
    getMyCode() {
      let _this = this
      if (_this.user.cellPhone == '') {
        _this.$toast('请输入手机号')
      } else {
        common.validatePhoneNum(_this.user.cellPhone)
        const myCaptcha = _dx.Captcha(document.getElementById('ic'), {
          appId: '7035b7125c0596a0ee719ef95e3f5f30',
          type: 'basic',
          style: 'popup',
          success: function(token) {
            common.getCode(_this)
            // console.log('token:', token) //这里是通过第三方获取的token 可以打印出token的值
            let data = {
              cellPhone: _this.user.cellPhone,
              type: parseInt(_this.user.type),
              token: token
            }
            // console.log('token:', token) //这里也可以打印出token的值
            let params = signJs.miscellaneous.signedParams(data)
            _this.$axios
              .get(
                `${'/warden/common/getmsAuthCode'}?cellPhone=${
                  params.cellPhone
                }&type=${params.type}&sign=${params.sign}&token=${token}`,
                {},
                {
                  headers: {
                    'Content-Type': 'application/json',
                    token: token //这里是拼接地址传的token
                  }
                }
              )
              .then(res => {
                // console.log(res)
                if (res.data.status == 'OK') {
                  // console.log(res)
                }
              })
              .catch(error => {
                console.log(error)
              })
          }
        })
        myCaptcha.show()
      }
    },
    submit() {
      let _this = this
      let data = {
        // authCode: "1111",
        authCode: (_this.user.code).toString(),
        cellPhone: _this.user.cellPhone,
        passWord: _this.user.pwdInput,
        userType: _this.user.userType
      }

      if (!common.validatePhoneNum(_this.user.cellPhone)) {
        _this.$toast('请输入正确的手机号码')
      } else if (!_this.user.code) {
        _this.$toast('验证码不能为空')
      } else if (!_this.user.pwdInput) {
        _this.$toast('密码不能为空')
      } else if (common.isNumberOr(_this.user.pwdInput)) {
        // _this.$toast('密码格式不正确')
        // console.log(_this.user.pwdInput)
        console.log(common.isNumberOr(_this.user.pwdInput))
      } else {
        _this.$axios
          .post(
            '/warden/user/resetPassWord',
            signJs.miscellaneous.signedParams(data)
          )
          .then(res => {
            // console.log(res)
            if (res.data.status == 'OK') {
            _this.$router.push('/')
            } else {
              _this.$toast('res.data.message')
            }
          })
      }
    }
  }
}
</script>

<style scoped>
</style>
