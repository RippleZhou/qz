<template>
  <div class="w_grayBgBox">
    <headers :setTitle="setTitle"></headers>

    <!--顶部分类-->
    <div class="qz_detail_Tab">
      <div class="tab_txt" v-for="(list,index) in listTab" :key="index" :class="tabType==index?'txt_active':''" @click="tabClick(index)">{{list}}</div>
    </div>
    <!--内容块-->
    <div class="qz_detail_Cons">
      <account-list :items="items" :setType="tabType"></account-list>
      <div class="noListTxt" v-if="offset===-1">没有更多了</div>
    </div>

  </div>
</template>

<script>
    //qz_accountDetails.less
    import { mapGetters } from 'vuex'
    import { GET_INCOME,GET_WALLET} from '@/store/actions.type'
    import signJs from '@/utils/sign'
    import Headers from "@/components/Headers";
    import AccountList from "./AccountList";
    export default {
      name: "accountDetails",
      components: {AccountList, Headers},
      data(){
        return{
          userCode:'',
          setTitle:'账户明细',
          listTab:['收支明细','提现记录'],
          tabType:0,
          items:[],
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
      mounted(){

      },
      methods:{
          tabClick(index){
              if(this.tabType==index)return
              this.tabType=index
              this.items.splice(0,this.items.length);
              this.offset=1
              if(this.tabType){
                  this.getWithdrawList()
              }else{
                  this.getIncomeList()
              }
          },
          getIncomeList() {
              const {items}=this
              let config = Object.assign({},{limit: 10,userCode:this.userCode,offset:this.offset})
              config = signJs.miscellaneous.signedParams(config)
              this.$store.dispatch(GET_INCOME, config).then(res=>{
                  console.log("收支列表：",res)
                  let rows=res.rows
                  if (rows.length) {
                      let newList = items.concat(rows);
                      this.items = newList
                      console.log("收支items:",this.items)
                  } else {
                      this.offset = -1;
                  }
              })
          },
          getWithdrawList() {
              const {items}=this
              let config = Object.assign({},{limit: 10,userCode:this.userCode,offset:this.offset})
              config = signJs.miscellaneous.signedParams(config)
              this.$store.dispatch(GET_WALLET, config).then(res=>{
                  console.log("提现列表：",res)
                  let rows=res.rows
                  if (rows.length) {
                      let newList = items.concat(rows);
                      this.items = newList
                      console.log("提现items:",this.items)
                  } else {
                      this.offset = -1;
                  }
              })
          },
      },
      created(){
          let _this =this
          const { userCode } = this.user
          this.userCode=userCode
          console.log("userCode",this.userCode)
          if(_this.tabType){
              _this.getWithdrawList()
          }else{
              _this.getIncomeList()
          }
          window.onscroll = function () {
              const {offset,items}=_this
              let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
              let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
              let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
              // console.log("距--" + scrollTop + "--可视区高度--" + windowHeight + "--滚动条总高度--" + scrollHeight);
              if (scrollTop + windowHeight >= scrollHeight-1) {
                  if (offset === -1||!items.length) return;
                  _this.offset = Math.ceil(items.length / 10) * 10;
                  if(_this.tabType){
                      _this.getWithdrawList()
                  }else{
                      _this.getIncomeList()
                  }
                  console.log("距顶部" + scrollTop + "可视区高度" + windowHeight + "滚动条总高度" + scrollHeight);
              }
          }

      }
    }
</script>

<style scoped>

</style>
