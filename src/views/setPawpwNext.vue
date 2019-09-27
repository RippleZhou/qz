<template>
        <div>
                <headers :setTitle="setTitle"></headers>
                <div class="qz_boxs qz_topBor">
                        <div class="qz_setting">设置支付密码</div>
                        <div class="qz_txt">请再次输入支付密码以确认</div>
                </div>
                <!-- 密码输入框 -->
                <van-password-input
                    :value="value"
                    info=""
                    :focused="showKeyboard"
                    @focus="showKeyboard = true"
                />
                <div class="qz_findPw_btns2">
                        <button @click="getModify">完成</button>
                </div>
                <!-- 数字键盘 -->
                <van-number-keyboard
                    :show="showKeyboard"
                    @input="onInput"
                    @delete="onDelete"
                    @blur="showKeyboard = false"
                />
        </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import Headers from "@/components/Headers";
    import { Toast } from "vant";
    import { GET_PAY_PW } from "@/store/actions.type";
    import signJs from "@/utils/sign";
    export default {
        name: "setPawpwNext",
        data() {
            return {
                setTitle: "设置支付密码",
                value: "",
                showKeyboard: false,
                oldVal:''
            };
        },
        computed: mapGetters(["user", "error", "payPw"]),
        watch: {
            value(newVal) {
                if (newVal.length === 6) {
                    this.showKeyboard=false
                }
            }
        },
        methods: {
            onInput(key) {
                this.value = (this.value + key).slice(0, 6);
            },
            onDelete() {
                this.value = this.value.slice(0, this.value.length - 1);
            },
            getModify(){
                let _this =this
                let newVal=this.value
                if(this.oldVal!=newVal){
                    Toast('两次密码输入不一致！');
                    return
                }
                Toast.loading({
                    mask: true,
                    message: "设置中..."
                })
                let {userCode,cellPhone}=this.user
                let isType=localStorage.getItem("isType")
                console.log("isType",isType)
                let authCode=localStorage.getItem("authCode")
                let config={
                    userCode,cellPhone,payPassWord:newVal,type:isType,isSettingPayPw:'0'
                }
                if(isType==1){
                    config.authCode=authCode
                    console.log('aaa')
                }
                config = signJs.miscellaneous.signedParams(config);
                this.$store
                    .dispatch(GET_PAY_PW, config)
                    .then((res) => {
                        if(res.status=="OK"){
                            localStorage.removeItem('isType')
                            localStorage.removeItem('authCode')
                            Toast('支付密码设置成功！');
                            if(isType==0){
                                _this.$router.go(-2)
                            }else{
                                _this.$router.go(-3)
                            }
                        }else{
                            Toast(res.message);
                        }
                    })
                    .catch(data => {
                        console.log(data);
                    });
            }
        },
        components: { Headers },
        created(){
            this.oldVal=this.$route.query.oldVal

        }
    };
</script>

<style lang="less">
        .qz_setting,
        .qz_txt {
                text-align: center;
        }
        .qz_setting {
                font-size: 17px;
                margin-top: 40px;
                margin-bottom: 15px;
        }
        .qz_txt {
                margin-bottom: 30px;
        }
</style>
