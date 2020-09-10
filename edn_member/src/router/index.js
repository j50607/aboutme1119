import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'
import Center from '../views/MemberCenter.vue'
import Login from '../views/Login.vue'
import Getpassword from '../views/GetPassword.vue'
import GetpasswordSuccess from '../components/SuccessGetPassword.vue'
import Register from '../views/Register.vue'
import RegisterSuccess from '../components/SuccessRegister.vue'
import Resend from '../views/ResendActive.vue'
import ResendSuccess from '../components/SuccessResendActive.vue'
import LoginByFb from '../components/LoginByFB.vue'
import LoginByFbSuccess from '../components/SuccessLoginByFB.vue'
import PhoneConfirm from '../components/PhoneActive.vue'
import PhoneConfirmSuccess from '../components/SuccessPhoneActive.vue'
import PhoneVerification from '../components/PhoneVerification.vue'
// import Keyword from '../components/KeywordTracking.vue'
// import Collect from '../components/CollectArticle.vue'
import memberData from '../components/MemberData.vue'
// import FavArticle from '../components/FavoriteArticle.vue'
import Questions from '../components/Questions.vue'
import Announcement from '../components/ServiceAnnouncement.vue'
// import Compaign from '../components/Compaign.vue'
// import Forum from '../components/Fourm.vue'

// for App
import ResultForApp from '../components/resultforapp.vue'

import store from '../store'

Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    name: 'member_center',
    redirect: '/login',
    component: Center,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
        beforeEnter: (to, from, next) => {
          const api = `${process.env.VUE_APP_API}/member/isLogin`
          axios.get(api).then(res => {
            if (res.data.success) {
              store.commit('LOGINSTATUS', true)
              sessionStorage.setItem('isLoginCall', true)
              next({ path: '/mb_data' })
            } else {
              next()
              store.commit('LOGOUT')
            }
          })
        }
      },
      // app登入結果頁面
      {
        path: 'resultforapp',
        name: 'resultforapp',
        component: ResultForApp,
        beforeEnter (to, from, next) {
          if (document.cookie.indexOf('appLogin') === -1) {
            next(from)
          }next()
        }
      },
      // 註冊頁
      {
        path: 'register',
        name: 'register',
        component: Register,
        meta: {
          loginedDontGo: true
        }
      },
      // 註冊成功頁
      {
        path: 'regsuccess',
        name: 'registerSuccess',
        component: RegisterSuccess,
        beforeEnter: (to, from, next) => {
          var token = document.cookie.indexOf('signUp')
          if (token > -1) {
            next()
          } else {
            next(from)
          }
        }
      },
      // 忘記密碼頁
      {
        path: 'getpassword',
        name: 'getpassword',
        component: Getpassword,
        meta: {
          loginedDontGo: true
        }
      },
      // 忘記密碼成功頁
      {
        path: 'getpwdsuccess',
        name: 'getpasswordsuccess',
        component: GetpasswordSuccess,
        beforeEnter: (to, from, next) => {
          var token = document.cookie.indexOf('getPwdToken')
          if (token > -1) {
            next()
          } else {
            next(from)
          }
        }
      },
      // 手機註冊頁面
      {
        path: 'phoneletterconfirm',
        name: 'phoneletterconfirm',
        component: PhoneConfirm,
        beforeEnter: (to, from, next) => {
          var token = document.cookie.indexOf('pResendActive')
          if (token > -1) {
            next()
          } else {
            next(from)
          }
        }
      },
      // 手機註冊認證成功頁面
      {
        path: 'phoneconfirm_success',
        name: 'phoneconfirm_success',
        component: PhoneConfirmSuccess,
        beforeEnter: (to, from, next) => {
          var token = document.cookie.indexOf('pActiveOk')
          if (token > -1) {
            next()
          } else {
            next(from)
          }
        }
      },
      // 手機驗證頁面 (登入狀態中)
      {
        path: 'mb_pverification',
        name: 'mb_pverification',
        component: PhoneVerification,
        beforeEnter: (to, from, next) => {
          var token = document.cookie.indexOf('pVerification')
          if (token > -1) {
            next()
          } else {
            next(from)
          }
        }
      },
      // 重寄啟用信
      {
        path: 'resend',
        name: 'resend',
        component: Resend,
        meta: {
          loginedDontGo: true
        }
      },
      // 重寄啟用信成功頁
      {
        path: 'resdsuccess',
        name: 'resdsuccess',
        component: ResendSuccess,
        beforeEnter: (to, from, next) => {
          var token = document.cookie.indexOf('resendActive')
          if (token > -1) {
            next()
          } else {
            next(from)
          }
        }
      },
      // FB登入設定頁
      {
        path: 'loginbyfb',
        name: 'loginbyfb',
        component: LoginByFb,
        beforeEnter: (to, from, next) => {
          var token = document.cookie.indexOf('loginByFbSetting')
          if (token > -1) {
            next()
          } else {
            next(from)
          }
        }
      },
      // FB登入設定成功
      {
        path: 'loginbyfb_success',
        name: 'lgoinbyfbsuccess',
        component: LoginByFbSuccess,
        beforeEnter: (to, from, next) => {
          var token = document.cookie.indexOf('fbregisterOk')
          if (token > -1) {
            next()
          } else {
            next(from)
          }
        }
      },
      // 修改資料頁
      {
        path: 'mb_data',
        name: 'member_data',
        component: memberData,
        meta: {
          requiresAuth: true
        }
      },
      // 關鍵字追蹤
      // {
      //   path: 'mb_keyword',
      //   name: 'keyword',
      //   component: Keyword,
      //   meta: {
      //     requiresAuth: true
      //   }
      // },
      // 文章收藏
      // {
      //   path: 'mb_collect',
      //   name: 'collect',
      //   component: Collect,
      //   meta: {
      //     requiresAuth: true
      //   },
      //   children: [
      //     // 我的文章
      //     {
      //       path: 'fav_article',
      //       name: 'fav_article',
      //       component: FavArticle,
      //       meta: {
      //         requiresAuth: true
      //       }
      //     },

      //     // 推薦文章
      //     {
      //       path: 'rcm_article',
      //       name: 'rcm_article',
      //       component: RcmArticle,
      //       meta: {
      //         requiresAuth: true
      //       }
      //     }
      //   ]
      // },
      // 常見問題
      {
        path: 'mb_questions',
        name: 'qusetions',
        component: Questions,
        meta: {
          requiresAuth: true
        }
      },
      // 服務公告
      {
        path: 'mb_announcement',
        name: 'announcement',
        component: Announcement,
        meta: {
          requiresAuth: true
        }
      }
      // 展覽
      // {
      //   path: 'mb_compaign',
      //   name: 'compaign',
      //   component: Compaign,
      //   meta: {
      //     requiresAuth: true
      //   }
      // },
      // 論壇
      // {
      //   path: 'mb_forum',
      //   name: 'forum',
      //   component: Forum,
      //   meta: {
      //     requiresAuth: true
      //   }
      // }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: '/member/'
})

export default router
