<template>
  <div>

    <div class="qz_accountBox">
      <block v-if="!setType">
      <div class="qz_account_bigLis" v-for="(ex,index) in items" :key="index">
        <div class="qz_biglis_data">{{ex.month}}</div>
        <div class="qz_smalLis">
          <i class="qz_ac_icon01"></i>
          <div class="qz_list_rigs">
            <div class="qz_list_txts">
              <span>订单号：{{ex.orderCode}}</span>
              <label>+{{ex.receiptAmount}}</label>
            </div>
            <div class="qz_list_txts qz_list_txts2">
              <span>{{ex.createTime}}</span>
              <label>账户余额：{{ex.accountAmount}}</label>
            </div>
          </div>
        </div>
      </div>
      </block>
      <block v-else>
      <div class="qz_account_bigLis" v-for="(ex,index) in items" :key="index">
        <div class="qz_biglis_data">{{ex.month}}</div>
        <div class="qz_smalLis">
          <i class="qz_ac_icon03"></i>
          <div class="qz_list_rigs">
            <div class="qz_list_txts">
              <span>提现至-支付宝({{ex.aliAccount}})</span>
              <label>-{{ex.amount}}</label>
            </div>
            <div class="qz_list_txts qz_list_txts2">
              <span>{{ex.withdrawTime}}</span>
              <label>账户余额：{{ex.accountAmount}}</label>
            </div>
          </div>
        </div>
      </div>
      </block>
    </div>
  </div>
</template>

<script>
//qz_accountDetails.less
export default {
  name: "accountList",
  props: ['items','setType'],
  methods: {

  },
};
</script>

<style scoped>
</style>
