<template>
  <div>
    <headers :setTitle="setTitle"></headers>
    <div class="qz_boxs qz_topBor">
      <div class="qz_setting">设置支付密码</div>
      <div class="qz_txt">请设置支付密码，用户提现验证</div>
    </div>
    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      info=""
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    />

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
export default {
  name: "setPaypw",
  data() {
    return {
      setTitle: "设置支付密码",
      value: "",
      showKeyboard: false
    };
  },
  computed: mapGetters(["user", "error", "payPw"]),
  watch: {
    value(newVal) {
      if (newVal.length === 6) {
          this.$router.push("/setPawpwNext?oldVal="+newVal)
      }
    }
  },
  methods: {
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  },
  components: { Headers }
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
