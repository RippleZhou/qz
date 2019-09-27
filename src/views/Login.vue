<template>
  <div>
    <headers :setTitle="setTitle"></headers>
    <div class="qz_boxs qz_topBor">
      <div class="qz_login_box">
        <div class="qz_login_head">
          <img
            src="http://zhkjmalltest.oss-cn-shanghai.aliyuncs.com/mall-20181229-9a0844b635bf4f1b99f9fe388d048d56.jpg"
          />物业帮区长端
        </div>
        <div class="qz_login_list">
          <input type="text" placeholder="请输入账号" v-model="users.cellPhone" />
        </div>
        <div class="qz_login_list">
          <input type="password" placeholder="请输入密码" v-model="users.passWord" />
        </div>
      </div>
      <div class="qz_login_btns" @click="getLogin">登录</div>
      <div class="qz_login_tip" @click="forgotPsd">忘记密码?</div>
    </div>
  </div>
</template>
<script>
//qz_login.less
import Headers from '@/components/Headers'
import { SIGN_IN } from '@/store/actions.type'
import signJs from '@/utils/sign'
// import { constants } from 'crypto'
export default {
  name: 'login',
  components: { Headers },
  data() {
    return {
      setTitle: '登录',
      users: {
        cellPhone: '',
        passWord: '',
        userType: '3', //登录角色 1配送员 3 区长 4居间方,
        loginType: '1' //登录方式 1密码登录 2手机验证码登录 3 微信登录,
      }
    }
  },
  methods: {
    async getLogin() {
      let _this = this
      if (_this.users.cellPhone == '' || _this.users.passWord == '') {
        _this.$toast('用户名和密码不能为空')
      } else {
        let data = {
          cellPhone: _this.users.cellPhone,
          passWord: _this.users.passWord,
          userType: parseInt(_this.users.userType),
          loginType: parseInt(_this.users.loginType)
        }
        this.$store
          .dispatch(SIGN_IN, signJs.miscellaneous.signedParams(data))
          .then(() => {
            this.$router.push('/user')
          })
          .catch(data => {
            console.log(data)
          })
      }
    },
    forgotPsd() {
      console.log(1112)
      let _this = this
      _this.$router.push('/findPassword')
    }
  }
}
</script>

