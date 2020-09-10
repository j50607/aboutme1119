<template>
    <div class="loginbyfb_success notlogin">
        <div class="loginbyfb_success_title">
            <h5>恭喜您！帳號綁定成功</h5>
        </div>
        <p>親愛的會員您好：</p>
        <ul>
            <li>下次可使用Facebook帳號快速登入。</li>
            <li>您可以開始在經濟日報登入會員，享受優質的新聞服務。</li>
        </ul>
        <router-link to="/mb_data">
          <button class="confirm_send">回到會員中心</button>
        </router-link>
    </div>
</template>
<script>
export default {
  destroyed () {
    const vm = this
    vm.$store.dispatch('clearData')
    document.cookie = 'fbregisterOk=;expires=' + (new Date(0)).toGMTString()
  }
}
</script>
<style scoped>
p {
    font-size: 15px;
    font-weight: 100;
    margin-bottom: 8px;
}
ul {
    padding: 0;
    padding-left: 1em;
    margin-bottom: 18px;
    font-size: 15px;
    font-weight: 100;
}
ul li:first-child {
    margin-bottom: 5px;
}
</style>
