<template>
  <div>
    <headers :setTitle="setTitle"></headers>
    <div class="qz_boxs qz_topBor">
      <div class="qz_cash_list">
        <label></label>
        <input type="text" placeholder="请输入支付宝账号" v-model="user.aliAccount" />
        <!-- <span>更改支付宝账号</span> -->
      </div>
      <div class="qz_cash_list">
        <input type="text" placeholder="请输入支付宝真实姓名" v-model="user.aliUserName" />
      </div>
      <div class="qz_cash_list">
        <b>￥</b>
        <input type="number" placeholder="请输入提现金额" v-model="user.withdrawAmount" />
      </div>
      <div class="qz_cash_tips" v-cloak>可提现余额¥{{user.accountAmount}}</div>
      <div class="qz_cash_btns" @click="withdrawCash">确认提现</div>
    </div>

    <van-popup v-model="pwShow" closeable :style="{width:'80%'}">
        <h2 class="pwPop_tit">支付密码</h2>
        <!-- 密码输入框 -->
        <van-password-input
            :value="value"
            info=""
            :focused="showKeyboard"
            @focus="ShowKeys"
        />
        <router-link to="/findPayPw" tag="a" class="pwPop_links">忘记密码？</router-link>
    </van-popup>
    <!-- 数字键盘 -->
    <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
        :zIndex="3002"
    />

  </div>
</template>

<script>
//qz_cash.less
import { mapGetters } from "vuex";
import { GET_WITHDRAWCASH } from "@/store/actions.type";
import Headers from "@/components/Headers";
import signJs from "@/utils/sign";
import { Dialog,Toast } from 'vant';
export default {
  name: "cash",
  components: { Headers },
  data() {
    return {
      setTitle: "提现",
      pwShow:false,
      showKeyboard: false,
      value:''
    };
  },
  watch: {
    error() {
      const { error } = this;
      if (error && error.length) {
        this.$toast("error");
      }
    },
    value(newVal) {
        if (newVal.length === 6) {
            Toast.loading({
                mask: true,
                message: "提交中..."
            })
            const {userCode,cellPhone,aliAccount,aliUserName,withdrawAmount} = this.user;
            let config = {userCode,aliUserName,aliAccount,withdrawAmount,cellPhone,payPassWord:newVal};
            config = signJs.miscellaneous.signedParams(config);
            this.$store
              .dispatch(GET_WITHDRAWCASH, config)
              .then((res) => {
                  Toast.clear()
                  console.log("res:",res)
                  if(res.status=='OK'){
                      this.$router.push("/success?withdrawAmount="+withdrawAmount)
                  }else{
                      this.pwShow=false
                      this.showKeyboard=false
                      this.value=''
                      Toast(res.message);
                      // this.$router.push("/success?isTrue=0")
                  }
              })
              .catch(data => {
                  Toast(data.message);
                  this.pwShow=false
                  this.showKeyboard=false
                  this.value=''
                  console.log(data);
              });
        }
    }
  },
  computed: mapGetters(["user", "error"]),
  methods: {
    withdrawCash() {
      if(!this.user.aliAccount){
          Toast('请输入支付宝账号！');
          return
      }
      if(!this.user.aliUserName){
          Toast('请输入支付宝真实姓名！');
          return
      }
      if(!this.user.withdrawAmount){
          Toast('请输入提现金额！');
          return
      }
      if(this.user.withdrawAmount>this.user.accountAmount){
          Toast('提现金额超出可提现余额了！');
          return
      }
      const router = this.$router;
      //检查用户有没有设置支付密码
      if (!this.user.isSettingPayPw) {
        Dialog.confirm({
          title: "提现失败",
          message: "您尚未设置支付密码，是否前去设置"
        })
          .then(() => {
            // on confirm
            console.log(router)
            router.push('/setPayPw')
          })
          .catch(() => {
            // on cancel
          });
        return;
      }
      this.pwShow=true
    },
    onInput(key) {
        this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
        this.value = this.value.slice(0, this.value.length - 1);
    },
      ShowKeys(){
        this.pwShow=true
        this.showKeyboard=true
      }
  },
  created() {
      console.log("payPw:",this.user.isSettingPayPw)
      console.log("user:",this.user)
  }
};
</script>

