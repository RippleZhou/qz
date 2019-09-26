<template>
  <div>
    <headers :setTitle="setTitle"></headers>
    <router-link to="/user" class="qz_suc_topTxt">完成</router-link>
    <!-- <div class="qz_suc_topTxt" @click="">完成</div> -->
    <div class="qz_boxs qz_sucBox">
      <div class="qz_sucCons">
        <h2>提现成功！</h2>
        <p>成功转出{{withdrawAmount}}元至支付宝账号</p>
      </div>
      <!--<div class="qz_sucCons qz_errorCon">-->
        <!--<h2>提现失败！</h2>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
//qz_cash.less
import Headers from '@/components/Headers'
export default {
  name: 'success',
  components: { Headers },
  data() {
    return {
      setTitle: '提现成功',
        withdrawAmount:0
    }
  },
  created(){
    this.withdrawAmount=this.$route.query.withdrawAmount
    console.log("withdrawAmount",this.$route.query.withdrawAmount)
  }
}
</script>

