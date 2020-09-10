<template>
    <div class="register_success notlogin">
        <div class="registersuccess_title">
            <h5>手機認證完成</h5>
        </div>
        <p>
            已完成手機號碼註冊與認證，可以馬上使用手機號碼登入。
        </p>
        <div class="success_img">
            <img src="../assets/img/phonesuccess.png" alt="phone_photo">
        </div>
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
    document.cookie = 'pActiveOk=;expires=' + (new Date(0)).toGMTString()
  }
}
</script>
<style scoped>
p {
    font-size: 15px;
    font-weight: 100;
    margin-bottom: 40px;
}
p.notice {
    color: #D72c1d;
}
a {
    color: #d72c1d;
}
.success_img {
    margin: 20px auto 40px auto;
    text-align: center;
}
</style>
