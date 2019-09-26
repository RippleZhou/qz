<template>
  <div class="w_grayBgBox">
    <div class="qz_userHeader">
      <div class="qz_userTops">
        <router-link class="head_lefts" to="/"></router-link>
        <h2>我的</h2>
        <router-link class="head_right" to="/setPage">设置</router-link>
      </div>
    </div>
    <div class="qz_userCons">
      <div class="qz_user_infors">
        <h2>账户余额</h2>
        <div class="qz_user_inMons">
          <span>
            ￥<b>{{userInfor.accountAmount||0}}</b>
          </span>
          <router-link to="/cash" tag="a">去提现</router-link>
        </div>
        <div class="qz_user_txts">
          <div class="qz_user_lis">
            <span>今日收入</span>
            <span>+{{userInfor.todayInAmount||0}}</span>
          </div>
          <div class="qz_user_lis">
            <span>未到账收入</span>
            <span>+{{userInfor.todayNotInAmount||0}}</span>
          </div>
          <div class="qz_user_lis">
            <span>账户明细</span>
            <router-link to="/accountDetails" tag="a">查看历史账单</router-link>
          </div>
        </div>
      </div>
      <div class="qz_user_orders">
        <div class="qz_user_oTit">
          <label>今日完成订单</label>
          <router-link to="/order" tag="a">查看全部订单</router-link>
        </div>
        <div class="qz_orderList" v-for="(item,index) in todayOrder" :key="index">
          <div class="qz_order_tits">
            <span>订单号：{{item.orderCode}}</span>
            <label>¥{{item.districtUserIncome}}</label>
          </div>
          <div class="qz_order_pros" v-for="(ex,ins) in item.orderItemList" :key="ins">
            <img :src="ex.imageUrl"/>
            <div class="qz_order_proRigs">
              <h2>{{ex.productTitle}}</h2>
              <p>单价：¥{{ex.productPrice}}&nbsp;&nbsp;&nbsp;&nbsp;数量：{{ex.productNum}}</p>
              <p>系列：{{ex.productMode}}</p>
            </div>
          </div>
        </div>
        <div class="noListTxt" v-if="offset===-1">没有更多了</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
import { mapGetters } from 'vuex'
import {
  GET_TODAYLIST,
  GET_STOREACCOUNTINFO
} from '@/store/actions.type'
import signJs from '@/utils/sign'
export default {
  name: 'user',
  data() {
    return {
        userInfor:[],//用户信息
        todayOrder:[],//今天订单列表
        offset:1,
        userCode:''
    }
  },
  watch: {
    error() {
      const { error } = this
      if (error && error.length) {
        this.$toast('error')
      }
    }
  },
  computed: mapGetters(['user', 'error']),
  methods: {
    //账户信息
    getStore_AccountInfo() {
      const { userCode } = this.user
      let config = Object.assign({}, { userCode })
      config = signJs.miscellaneous.signedParams(config)
      this.$store.dispatch(GET_STOREACCOUNTINFO, config).then(res =>{
          if(res.status=="OK"){
              this.userInfor=res.message
          }
      })
    },
    getOrderList() {
      const {todayOrder}=this
      let config = Object.assign({},{limit: 10,type:2,offset:this.offset,userCode:this.userCode})
      config = signJs.miscellaneous.signedParams(config)
      this.$store.dispatch(GET_TODAYLIST, config).then(res=>{
          console.log("订单列表：",res)
          let rows=res.rows
          if (rows.length) {
              let newList = todayOrder.concat(rows);
              console.log("newList:",newList)
              this.todayOrder = newList
          } else {
              this.offset = -1;
          }
      })
    },
  },
  created(){
      let _this=this
      const { userCode } = this.user
      this.userCode=userCode
      this.getStore_AccountInfo()
      this.getOrderList(userCode)
      window.onscroll = function () {
          const {offset,todayOrder}=_this
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
          let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
          // console.log("距--" + scrollTop + "--可视区高度--" + windowHeight + "--滚动条总高度--" + scrollHeight);
          if (scrollTop + windowHeight >= scrollHeight-1) {
              if (offset === -1||!todayOrder.length) return;
              _this.offset = Math.ceil(todayOrder.length / 10) * 10;
              _this.getOrderList()
              console.log("距顶部" + scrollTop + "可视区高度" + windowHeight + "滚动条总高度" + scrollHeight);
          }
      }
  },
  mounted() {

  }
}
</script>
<style  lang='less'>
body{
  background: #f2f2f2;
}
</style>
