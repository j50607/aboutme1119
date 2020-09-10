<template>
    <div class="register_success notlogin">
        <div class="registersuccess_title">
            <h5>感謝您的加入</h5>
        </div>
        <p class="notice">
            已完成資料填寫，僅需到註冊電子信箱啟用認證信函，即可完成註冊。
        </p>
        <p>
            如果收不到認證信函，可要求再重發啟用信(
            <router-link to="/resend">重寄啟用信</router-link> )。未經認證的帳號無法啟動任何會員服務，並於40天內自動刪除會員資料。
        </p>
        <router-link to="/login">
          <button class="confirm_send">馬上登入</button>
        </router-link>
    </div>
</template>
<script>
export default {
  destroyed () {
    const vm = this
    vm.$store.dispatch('clearData')
    document.cookie = 'signUp=;expires=' + (new Date(0)).toGMTString()
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
a {
    color: #d72c1d;
}
</style>
