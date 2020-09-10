<template>
    <div class="resend_success notlogin">
        <div class="resendsuccess_title">
            <h5>啟用認證信函已寄送</h5>
        </div>
        <p class="notice">啟用認證信函已寄到您 {{ userAccount }} 信箱。</p>
        <p>若沒有收到認證信函，建議至垃圾郵件夾查看。</p>
        <router-link :to="(isApp) ? forApp : '/login'">
          <button class="confirm_send">重新登入</button>
        </router-link>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isToken: false,
      forApp: {
        name: 'login',
        query: {
          app: 'y'
        }
      }
    }
  },
  computed: {
    ...mapState(['userAccount', 'isApp'])
  },
  created () {
    // const vm = this
    // var token = document.cookie.indexOf('reSendToken')
    // if (token < 0) {
    //   vm.$router.push('/login')
    // }
  },
  destroyed () {
    const vm = this
    vm.$store.dispatch('clearData')
    document.cookie = 'resendActive=;expires=' + (new Date(0)).toGMTString()
  }
}
</script>
<style scoped>
p {
    font-size: 15px;
    font-family: 'Noto Sans CJK TC Thin';
}
p.notice {
    color: #D72c1d;
}
</style>
