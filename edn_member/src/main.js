import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import './assets/application'

import { extend, ValidationProvider, ValidationObserver, localize } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import { required, email, confirmed, regex, excluded, max, min } from 'vee-validate/dist/rules'

localize('zh_TW', TW)

extend('confirmed', {
  ...confirmed,
  message: '確認密碼與密碼需一致'
})
extend('required', {
  ...required,
  message: '此欄位必填'
})
extend('email', {
  ...email,
  message: '請輸入有效的E-mail'
})
extend('excluded', {
  ...excluded,
  message: '答案不得包含特殊字元'
})
extend('regex', {
  ...regex,
  message: '手機號碼格式錯誤'
})
extend('max', {
  ...max,
  message: '內容長度不符合'
})
extend('min', {
  ...min,
  message: '內容長度不符合'
})
extend('phoneOrEmail', (value) => {
  var checkCell = /^[09]{2}[0-9]{8}$/
  var checkEmail = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  var valLength = value.length
  var check09 = value.indexOf('09')
  if (value === '') {
    return false
  // 是否09開頭，是：檢查長度
  } else if (check09 > -1) {
    // 若長度小於等於10，驗證手機格式，
    if (valLength <= 10) {
      if (!checkCell.test(value)) {
        return '手機號碼格式錯誤'
      } else {
        return true
      }
    // 長度大於10，驗證電子信箱格式
    } else {
      if (!checkEmail.test(value)) {
        return 'E-mail格式錯誤'
      } else {
        return true
      }
    }
  // 否：直接驗證電子信箱格式
  } else {
    if (!checkEmail.test(value)) {
      return 'E-mail格式錯誤'
    } else {
      return true
    }
  }
})
// 特殊字元驗證
extend('specialTxt', (value) => {
  var regex = /['/<>[{}';-=+()@"#$%&^*]/
  if (regex.test(value)) {
    return '答案不可含有特殊字元'
  } return true
})
Vue.config.productionTip = false
// Axios
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true
// Vuex
Vue.use(Vuex)

// VueMeta
Vue.use(VueMeta)

// 驗證工具
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// loading component
Vue.component('Loading', Loading)

// 判斷進入的頁面是否需登入狀態，若不需要則放行，若需要則驗證，成功放行，失敗導回登入頁
router.beforeEach((to, from, next) => {
  const tokenApi = `${process.env.VUE_APP_API}/member/isLogin`
  var loginStatus = sessionStorage.getItem('isLoginCall')
  // 需要登入狀態的頁面
  if (to.meta.requiresAuth) {
    if (loginStatus) {
      store.commit('LOGINSTATUS', true)
      next()
    } else {
      axios.get(tokenApi).then(function (res) {
        if (res.data.success) {
          next()
          store.commit('LOGINSTATUS', true)
          sessionStorage.setItem('isLoginCall', true)
        } else {
          alert('尚未登入')
          store.commit('LOGOUT', false)
          router.push('/login')
        }
      })
    }
    // 需要未登入狀態的頁面
  } else if (to.meta.loginedDontGo) {
    // 登入狀態中，不放行
    if (loginStatus) {
      alert('您已登入')
      router.push('/mb_data')
    } else {
      // 不是登入狀態，放行並同步mutation資料
      axios.get(tokenApi).then(function (res) {
        if (res.data.success) {
          next(from)
          sessionStorage.setItem('isLoginCall', true)
        } else {
          store.commit('LOGOUT', false)
          next()
        }
      })
    }
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
