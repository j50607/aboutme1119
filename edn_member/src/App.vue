<template>
  <div id="app">
    <Loading :active.sync="isLoading"></Loading>
    <router-view />
    <Footer v-if="!isApp"/>
    <div id="fb-root"></div>
  </div>
</template>

<script>
/* global FB */
import Footer from './components/BaseFooter'
import { mapState } from 'vuex'
// import Navbar from './components/navbar'
export default {
  metaInfo: {
    titleTemplate: '會員中心-%s'
  },
  name: 'App',
  components: {
    Footer
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['isLoading', 'isApp'])
  },
  methods: {
    checkBrowser: function () {
      const vm = this
      var ua = navigator.userAgent
      if (ua.indexOf('Chrome') > -1) {
        document.querySelector('html').classList.add('browserOK')
      } else if (ua.indexOf('Firefox') > -1) {
        document.querySelector('html').classList.add('browserOK')
      } else if (ua.indexOf('Edge') > -1) {
        document.querySelector('html').classList.add('browserOK')
      } else if (ua.indexOf('Safari') > -1) {
        document.querySelector('html').classList.add('browserOK')
      } else if (ua.indexOf('Opera') > -1) {
        document.querySelector('html').classList.add('browserOK')
      } else if (ua.toLowerCase().match(/rv:([\d.]+)\) like gecko/)) {
        document.querySelector('html').classList.add('browserOK')
      } else if (vm.isWebview()) {
        document.querySelector('html').classList.add('browserOK')
      } else {
        document.querySelector('html').classList.add('notIE11')
      }
    },
    isWebview: function () {
      var useragent = navigator.userAgent
      var rules = ['WebView', '(iPhone|iPod|iPad)(?!.*Safari\\/)', 'Android.*(wv|\\.0\\.0\\.0)']
      var regex = new RegExp(`(${rules.join('|')})`, 'ig')
      return Boolean(useragent.match(regex))
    }
  },
  watch: {
    $route (to, from) {
      const vm = this
      vm.$store.commit('CLEARERRORMSG', '')
      if (vm.$route.query.app === 'y') {
        vm.$store.dispatch('forApp', true)
      }
    }
  },
  created () {
    const vm = this
    vm.isWebview()
    vm.checkBrowser()
    if (vm.$route.query.app === 'y') {
      vm.$store.dispatch('forApp', true)
    } else {
      vm.$store.dispatch('forApp', false)
    }
    const paramURL = new URL(window.location)
    const params = paramURL.searchParams
    const paramsToApi = params.toString()
    vm.$store.commit('STOREPARAM', paramsToApi)
    if (params.has('redirect')) {
      vm.$store.commit('STOREREDIRECTURL', params.get('redirect'))
    }
  },
  mounted () {
    const vm = this
    window.fbAsyncInit = function () {
      FB.init({
        appId: '253554794800658',
        cookie: true,
        xfbml: true,
        version: 'v4.0'
      })
      FB.AppEvents.logPageView()
      FB.getLoginStatus(res => {
        // 若已登入FB且有導頁的cookie，回到頁面時直接打api
        if (res.status === 'connected' && document.cookie.indexOf('loginRedirect') > -1) {
          console.log('FB redirect OK')
          var tokenForFb = res.authResponse.accessToken
          FB.api('/me?fields=name,id,email,token_for_business', function (response) {
            vm.$store.dispatch('storefbdata', response).then(function () {
              vm.$store.dispatch('FbLogin', tokenForFb)
            })
          })
        } else if (res.status === 'connected' && document.cookie.indexOf('bindRedirect') > -1) {
          FB.api('/me?fields=name,id,email,token_for_business', function (response) {
            vm.$store.dispatch('storefbdata', response).then(function () {
              vm.$store.dispatch('bindFbAccount', res.authResponse.accessToken)
            })
          })
        } else {
          console.log('FB redirect not OK')
        }
      }, true)
    }
  }
}
</script>

<style lang="scss">
@import './assets/dashboard';
@import '~bootstrap/dist/css/bootstrap.min.css';
#app {
  max-width: 1190px;
  width: 100%;
  min-height: 100vh;
  height: auto;
  margin: 0 auto;
  padding: 0 0 100px 0;
  position: relative;
}

@media screen and (max-width: 767px){
  #app  {
    padding: 0px 17px 80px 17px;
    width: 100%;
  }
}
</style>
