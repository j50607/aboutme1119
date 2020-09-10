<template>
    <div>
        <span class="membered">
          我已經是會員
          <router-link :to="(isApp) ? forApp : '/login'">直接登入</router-link>
        </span>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      forApp: {
        name: 'login',
        query: {
          app: 'y'
        }
      }
    }
  },
  computed: {
    ...mapState(['isApp'])
  }
}
</script>
<style>
span.membered {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 15px;
  font-weight: 300;
  margin-top: 15px;
}
span.membered a {
  color: #d72c1d;
  padding-left: 18px;
}
</style>
