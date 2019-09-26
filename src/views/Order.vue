<template>
  <div class="w_grayBgBox">
    <headers :setTitle="setTitle"></headers>
    <div class="qz_orderBox">

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
</template>
<script>
//qz_order.less
import Headers from '@/components/Headers'
import { mapGetters } from 'vuex'
import signJs from '@/utils/sign'
import { GET_TODAYLIST } from '@/store/actions.type'
export default {
  name: 'order',
  components: { Headers },
  data() {
    return {
      setTitle: '全部订单',
      todayOrder:[],//订单列表
      offset:1,
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
      getOrderList(userCode) {
          const {todayOrder}=this
          let config = Object.assign({},{limit: 10,type:1,offset:this.offset},{ userCode })
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
  mounted() {
  },
  created(){
      let _this=this
      const { userCode } = this.user
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
              _this.getOrderList(userCode)
              console.log("距顶部" + scrollTop + "可视区高度" + windowHeight + "滚动条总高度" + scrollHeight);
          }
      }
  }
}
</script>
<style  lang='less'>
  body{
    background: #f2f2f2;
  }
</style>
