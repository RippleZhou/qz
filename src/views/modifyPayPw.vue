<template>
        <div>
                <headers :setTitle="setTitle"></headers>
                <div class="qz_boxs qz_topBor">
                        <div class="qz_mody_list">
                                <label>旧支付密码</label><input type="tel" placeholder="请输入旧支付密码" v-model="oldPw"/>
                        </div>
                        <div class="qz_mody_list">
                                <label>新支付密码</label><input type="tel" placeholder="请输入新支付密码" v-model="newPw"/>
                        </div>
                        <div class="qz_mody_list">
                                <label>确认新支付密码</label><input type="tel" placeholder="请再次输入新支付密码" v-model="newPw2"/>
                        </div>
                        <div class="qz_mody_btns">
                                <button @click="modifyPw">确认修改</button>
                        </div>
                </div>
        </div>
</template>

<script>
    //qz_login.less
    import { mapGetters } from "vuex";
    import { Toast} from "vant";
    import { GET_MODIFY_PAY_PW } from "@/store/actions.type";
    import signJs from "@/utils/sign";
    import Headers from "../components/Headers";
    export default {
        name: "modifyPayPw",
        data(){
            return{
                setTitle:'修改支付密码',
                oldPw:'',
                newPw:'',
                newPw2:''
            }
        },
        computed: mapGetters(["user", "error"]),
        components: {Headers},
        methods:{
            modifyPw(){
                let _this=this
                if(!this.oldPw){
                Toast('旧支付密码不能为空！')
                 return
                }
                if(!this.newPw){
                    Toast('新支付密码不能为空！')
                    return
                }
                if(!this.newPw2){
                    Toast('支付密码不能为空！')
                    return
                }
                if(this.newPw!=this.newPw2){
                    Toast('两次输入的密码不一致！')
                    return
                }
                let {userCode}=this.user
                let config={userCode,oldPayPassWord:_this.oldPw,newPayPassWord:_this.newPw}
                config = signJs.miscellaneous.signedParams(config);
                this.$store
                    .dispatch(GET_MODIFY_PAY_PW, config)
                    .then((res) => {
                        if(res.status=="OK"){
                            Toast('支付密码修改成功！');
                            setTimeout(function(){
                                this.$router.go(-1);
                            },2000)
                        }else{
                            Toast(res.message);
                        }
                    })
                    .catch(data => {
                        console.log(data);
                    });
            }
        }
    }
</script>

<style scoped>

</style>
