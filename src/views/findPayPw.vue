<template>
        <div>
                <headers :setTitle="setTitle"></headers>
                <div class="qz_boxs qz_topBor">
                        <div class="qz_findPw_list">
                                <label>手机号</label><span>{{user.cellPhone}}</span>
                        </div>
                        <div class="qz_findPw_list2">
                                <label>验证码</label><input type="tel" placeholder="请输入验证码" v-model="codes" maxlength="4"/>
                                <span @click="checkCode" v-if="codeShow">获取验证码</span>
                                <span v-else>{{count}}s</span>
                        </div>
                        <div id="ic"></div>
                        <div class="qz_findPw_btns">
                                <button @click="checkInfor">验证</button>
                        </div>
                </div>
        </div>
</template>

<script>
    import common from '@/utils/common'
    import { mapGetters } from "vuex";
    import { Toast} from "vant";
    import { GET_FIND_PAY_PW } from "@/store/actions.type";
    import signJs from "@/utils/sign";
    import Headers from "../components/Headers";
    export default {
        name: "findPayPw",
        components: {Headers},
        data(){
            return{
                setTitle:'找回支付密码',
                codes:'',
                TIME_COUNT: 0,
                timer: 0,
                count:0,
                codeShow:1,
                clickTime:0,
                isType:1,//1忘记0设置
            }
        },
        computed: mapGetters(["user", "error"]),
        methods:{
            checkInput(){
                if(!this.codes){
                    Toast('验证码不能为空!')
                    return false
                }
                return true
            },
            checkCode(){
                let _this =this
                const myCaptcha = _dx.Captcha(document.getElementById('ic'), {
                    appId: '7035b7125c0596a0ee719ef95e3f5f30',
                    type: 'basic',
                    style: 'popup',
                    success: function(token) {
                        myCaptcha.hide();
                        let config={cellPhone:_this.user.cellPhone,type: 103,token:token}
                        config = signJs.miscellaneous.signedParams(config);
                        let query="cellPhone="+config.cellPhone+"&type="+config.type+"&sign="+config.sign+"&token="+token
                        console.log("query:",query)
                        _this.$axios
                            .get(
                                `${'/warden/common/getmsAuthCode'}?cellPhone=${config.cellPhone}&type=${config.type}&sign=${config.sign}&token=${token}`, {},
                                {headers: {'Content-Type': 'application/json', token: token}}
                            )
                            .then(res => {
                                if (res.data.status == 'OK') {
                                    _this.codeShow=0
                                    common.getCode(_this)
                                }else{
                                    _this.codeShow=1
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                })
                myCaptcha.show()
            },
            checkInfor(){
                let _this =this
                if(!this.checkInput()){return}
                if(this.clickTime){return}
                this.clickTime=1
                let {cellPhone}=this.user
                let config={cellPhone,authCode:_this.codes}
                config = signJs.miscellaneous.signedParams(config);
                this.$store
                    .dispatch(GET_FIND_PAY_PW, config)
                    .then((res) => {
                        if(res.status=="OK"){
                            localStorage.setItem("isType",_this.isType)
                            localStorage.setItem("authCode",_this.codes)
                            _this.$router.push("/setPaypw")
                        }else{
                            _this.clickTime=0
                            Toast(res.message);
                        }
                    })
                    .catch(data => {
                        console.log(data);
                    });
            }
        },
        created(){
            const script = document.createElement('script')
            script.src = `https://cdn.dingxiang-inc.com/ctu-group/captcha-ui/index.js`
            script.language = 'JavaScript'
            document.body.appendChild(script)
        }
    }
</script>

<style scoped>

</style>
