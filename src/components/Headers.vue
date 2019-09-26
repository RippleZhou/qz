<template>
  <div class="headers">
    <a class="head_lefts" href="javascript:;" @click="goBack()"></a>
    <div class="head_cons">{{setTitle}}</div>
    <a class="head_rights" href="javascript:;" @click="goSetting()"></a>
  </div>
</template>

<script>
export default {
  name: 'headers',
  props: ['setTitle'],
  methods: {
    goBack() {
      if (window.history.length == 1) {
        this.$router.replace({ path: '/' })
      } else {
        this.$router.go(-1)
      }
    },
    goSetting() {
      this.$router.push('/qzSetting')
    }
  }
}
</script>

<style scoped>
</style>
