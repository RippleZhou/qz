<template>
    <div class="w_grayBgBox">
        <headers :setTitle="setTitle"></headers>
        <div class="qz_boxs">
            <div class="qz_login_setTip">支付密码设置</div>
            <router-link class="qz_login_setList" to="/setPaypw" v-if="!user.isSettingPayPw">设置支付密码</router-link>
            <div v-else>
            <router-link class="qz_login_setList" to="/modifyPayPw">修改支付密码</router-link>
            <router-link class="qz_login_setList" to="/findPayPw">忘记支付密码</router-link>
            </div>
        </div>
    </div>
</template>
<!--qz_login.less-->
<script>
    import { mapGetters } from "vuex";
    import Headers from "@/components/Headers";
    export default {
        name: "setPage",
        data(){
          return{
              setTitle:'设置',
          }
        },
        computed: mapGetters(["user", "error",]),
        components: {Headers},
    }
</script>

