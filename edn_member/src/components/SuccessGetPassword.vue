<template>
    <div class="notlogin getpwd_success">
        <div class="getpwdsuccess_title">
            <h5 v-if="userAccount.indexOf('@') > -1">重設密碼已寄送</h5>
            <h5 v-else>重設密碼通知</h5>
            <div class="p-group" v-if="userAccount.indexOf('@') > -1">
              <p class="notice">密碼通知函已寄到您 {{ userAccount }} 信箱</p>
              <p>若沒有收到通知信，建議至垃圾郵件夾查看</p>
            </div>
            <div class="p-group" v-else>
              <p class="notice">系統已將您自動導頁至重設密碼頁面，並已將簡訊認證碼寄到您的手機 {{ userAccount.replace(/^(\d{4})\d{4}(\d+)/,"$1****$2") }}</p>
              <p>請依照頁面指示填入欄位資訊以重設密碼</p>
            </div>
        </div>
        <router-link to="/member/login">
          <button class="confirm_send">重新登入</button>
        </router-link>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  metaInfo: {
    title: '重設密碼'
  },
  data: function () {
    return {
    }
  },
  computed: {
    ...mapState(['userAccount'])
  },
  methods: {
  },
  created () {
    // const vm = this
    // var token = document.cookie.indexOf('reGetToken')
    // if (token < 0) {
    //   vm.$router.push('/member/login')
    // }
  },
  destroyed () {
    const vm = this
    vm.$store.dispatch('clearData')
    document.cookie = 'getPwdToken=;expires=' + (new Date(0)).toGMTString()
  }
}
</script>
<style scoped>
p {
    font-size: 15px;
    font-weight: 100;
}
p.notice {
    color: #D72c1d;
}
</style>
