import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const plugins = []
// 檢查瀏覽器是否封鎖cookie
try {
  plugins.push(createPersistedState())
} catch {
  document.cookie = 'cookieActived=true'
  if (document.cookie.indexOf('cookieActived') === -1) {
    document.querySelector('html').classList.add('notCookie')
  }
}
var isShowConsole = process.env.VUE_APP_ISSHOWCONSOLE
const checkConsole = function (text, response) {
  if (isShowConsole === 'true') {
    console.log(text, response)
  } else {
    return false
  }
}
var setCookie = function (cookiename, value, expires) {
  document.cookie = `${cookiename}=${value};path=/;domain=udn.com;expires=${expires}`
}
const store = new Vuex.Store({
  plugins,
  state: {
    isLogin: false,
    isLoading: false,
    userAccount: '',
    phone: '',
    userInfo: {},
    errorMsg: '',
    account: '',
    isApp: false,
    appLoginMsg: '',
    errorAccount: '',
    getPhoneCode: false,
    FBaccount: '',
    bottomAccount: '',
    isFbAlreadyBind: true,
    recaptchaToken: '',
    redirectURL: '',
    param: ''
  },
  // mutations操作狀態，不操作非同步行為，如AJAX
  mutations: {
    // state是固定參數，操作上方state物件
    LOGINSTATUS (state, status) {
      state.isLogin = status
    },
    UPDATEEMAIL (state, value) {
      state.userName = value
    },
    LOGOUT (state, status) {
      state.isLogin = status
      state.account = ''
      state.userInfo = {}
      state.isLoading = status
      state.appLoginMsg = ''
      state.phone = ''
      state.userAccount = ''
      state.errorAccount = ''
      state.FBaccount = ''
      state.bottomAccount = ''
      state.recaptchaToken = ''
    },
    // 忘記密碼成功、 重寄啟用信成功,
    STOREACCOUNT (state, account) {
      state.userAccount = account
    },
    // 取得會員資料
    USERDATA (state, { filterData, account, bottomAccount }) {
      state.userInfo = filterData
      state.account = account
      state.bottomAccount = bottomAccount
    },
    ERRORMSG (state, msg) {
      state.errorMsg = msg
    },
    // 手機號碼註冊成功
    PHONESIGNUP (state, phone) {
      state.phone = phone
    },
    UPDATEISLOADING (state, status) {
      state.isLoading = status
    },
    CLEARSTATUS (state) {
      state.isLogin = false
    },
    // 當用戶登出，或手動刪除cookie時(視為登出)，則刪除所有狀態
    CLEARDATA (state) {
      state.account = ''
      state.isLogin = false
      state.userInfo = {}
      state.bottomAccount = ''
      state.userAccount = ''
    },
    CLEARERRORMSG (state, status) {
      state.errorMsg = status
    },
    CLEARERRORACCOUNT (state) {
      state.errorAccount = ''
    },
    FORAPP (state, isShow) {
      state.isApp = isShow
    },
    STORELOGINMSG (state, res) {
      state.appLoginMsg = res
    },
    // 登入帳號未完成啟用
    STOREERRORACCOUNT (state, account) {
      state.errorAccount = account
    },
    GETPHONECODE (state, status) {
      state.getPhoneCode = status
    },
    STOREFBDATA (state, res) {
      state.FBaccount = res
    },
    STORERECAPTCHATOKEN (state, token) {
      state.recaptchaToken = token
    },
    FBACCOUNTISBINDALREADY (state, res) {
      state.isFbAlreadyBind = res
    },
    STOREREDIRECTURL (state, status) {
      state.redirectURL = status
    },
    STOREPARAM (state, status) {
      state.param = status
    }
  },
  // actions操作行為，不直接修改state的狀態，非同步的行為在這裡面操作
  /* global AndroidEDNFunction */
  actions: {
    isLoging (context, status) {
      const url = `${process.env.VUE_APP_API}/member/isLogin`
      axios.get(url).then(res => {
        if (res.data.success) {
          status = true
          context.commit('LOGINSTATUS', status)
          checkConsole('用戶持續登入中', res)
        } else {
          checkConsole('用戶未登入', res)
          status = false
          context.commit('LOGINSTATUS', status)
        }
      })
    },
    login ({ dispatch, commit }, { account, pwd, recaptchaToken, status }) {
      var api =
        account.indexOf('@') > -1
          ? `${process.env.VUE_APP_API}/user/login/email?${store.state.param}`
          : `${process.env.VUE_APP_API}/user/login/phone?${store.state.param}`
      var emailOrPhone = account.indexOf('@') > -1 ? 'email' : 'phone'
      var paramData = {
        pwd: pwd,
        recaptcha: recaptchaToken
      }
      paramData[emailOrPhone] = account
      // APP流程
      if (store.state.isApp) {
        paramData.app = 'y'
        axios.post(api, paramData).then(res => {
          if (res.data.success) {
            checkConsole('登入成功', res)
            commit('LOGINSTATUS', true)
            const expireTime = new Date().getTime() + 1000 * 60 * 525600
            document.cookie =
              'appLogin=true;expires=' + new Date(expireTime).toGMTString()
            var toAppData = {}
            toAppData.status = res.status
            toAppData.message = res.data.message
            toAppData.account = res.data.data.account
            toAppData.activeService = res.data.data.activeService
            toAppData.cookies = res.data.cookie
            toAppData.from = res.data.data.from
            toAppData.email = res.data.data.email
            var json = JSON.stringify(toAppData)
            try {
              window.webkit.messageHandlers.loginResult.postMessage(json)
            } catch (e) {}
            try {
              AndroidEDNFunction.loginResult(json)
            } catch (e) {}
            commit('STORELOGINMSG', json)
            router.push({ path: '/resultforapp', query: { app: 'y' } })
          } else {
            checkConsole('登入失敗', res)
            var errorText = res.data.message.split('::')[1]
            commit('ERRORMSG', `登入失敗，${errorText}`)
          }
        })
        // 非APP流程
      } else {
        commit('UPDATEISLOADING', true)
        axios
          .post(api, paramData)
          .then(res => {
            commit('UPDATEISLOADING', false)
            if (res.data.success) {
              checkConsole('登入成功', res)
              status = res.data.success
              // 若有導頁，則導頁，不拿資料
              if (store.state.redirectURL) {
                top.location = store.state.redirectURL
                commit('STOREREDIRECTURL', '')
              } else {
                sessionStorage.setItem('isLoginCall', true)
                router.push('mb_data')
                commit('LOGINSTATUS', status)
              }
            } else {
              checkConsole('登入失敗', res)
              commit('STOREACCOUNT', account)
              var errorTxt = res.data.message.split('::')
              if (
                errorTxt[0].indexOf('L03') > -1 ||
                errorTxt[0].indexOf('L07') > -1 ||
                errorTxt[0].indexOf('L13') > -1 ||
                errorTxt[0].indexOf('L14') > -1
              ) {
                var goActive = confirm('此帳號尚未啟用，要前往完成啟用流程嗎?')
                if (goActive && account.indexOf('@') > -1) {
                  router.push('/resend')
                } else if (goActive && account.indexOf('@') === -1) {
                  const expireTime = new Date().getTime() + 1000 * 60 * 30
                  document.cookie =
                    'pResendActive=Y;expires=' +
                    new Date(expireTime).toGMTString()
                  dispatch('reSendActive', { account }).then(res => {
                  })
                  router.push('/phoneletterconfirm')
                } else {
                  commit('ERRORMSG', `登入失敗，${errorTxt[1]}`)
                }
              } else {
                commit('ERRORMSG', `登入失敗，${errorTxt[1]}`)
              }
            }
          })
          .catch(function () {
            alert('系統忙碌中，請稍後再試')
            commit('UPDATEISLOADING', false)
          })
      }
    },
    logOut (context, status) {
      context.commit('UPDATEISLOADING', true)
      const api = `${process.env.VUE_APP_API}/member/logout`
      axios.post(api).then(function (res) {
        context.commit('UPDATEISLOADING', false)
        if (res.data.success) {
          checkConsole('登出成功', res)
          // 刪除登入中的sessionStorage
          sessionStorage.removeItem('isLoginCall')
          localStorage.removeItem('vuex')
          router.push('/login')
          context.commit('LOGOUT', false)
        } else {
          // 強制登出，刪除cookie
          checkConsole('登出失敗，強制登出', res)
          const expireTime = new Date().getTime() - 1000
          setCookie('udnmember', 'n', new Date(expireTime).toGMTString())
          sessionStorage.removeItem('isLoginCall')
          localStorage.removeItem('vuex')
          router.push('/login')
          context.commit('LOGOUT', false)
        }
      }).catch(function () {
        context.commit('UPDATEISLOADING', false)
        alert('系統異常，請稍後再試')
      })
    },
    // FB登入
    FbLogin ({ dispatch, commit }, tokenForFb) {
      commit('UPDATEISLOADING', true)
      const expireTime = new Date().getTime() - 1
      document.cookie =
            'loginRedirect=Y;expires=' + new Date(expireTime).toGMTString()
      var query = store.state.isApp ? { app: 'y' } : ''
      const api = `${process.env.VUE_APP_API}/user/login/facebook`
      var paramData = {
        id: store.state.FBaccount.id,
        accessToken: tokenForFb,
        email: store.state.FBaccount.email,
        token_for_business: store.state.FBaccount.token_for_business,
        name: store.state.FBaccount.name,
        avatar: `http://graph.facebook.com/${store.state.FBaccount.id}/picture`
      }
      axios.post(api, paramData).then(res => {
        commit('UPDATEISLOADING', false)
        // FB資料正確且已做完帳號綁定
        if (res.data.success && !res.data.data.redirect) {
          commit('LOGINSTATUS', true)
          // 若是App使用
          if (store.state.isApp) {
            checkConsole('FB登入app成功', res)
            var toAppData = {}
            toAppData.status = res.status
            toAppData.message = res.data.message
            toAppData.account = res.data.data.account
            toAppData.activeService = res.data.data.activeService
            toAppData.cookies = res.data.cookies
            toAppData.from = res.data.data.from
            toAppData.email = res.data.data.email
            var json = JSON.stringify(toAppData)
            try {
              window.webkit.messageHandlers.loginResult.postMessage(json)
            } catch (e) {}
            try {
              AndroidEDNFunction.loginResult(json)
            } catch (e) {}
            commit('STORELOGINMSG', JSON.stringify(toAppData))
            router.push({ path: '/resultforapp', query: { app: 'y' } })
          // web 使用
          } else {
            checkConsole('FB登入成功', res)
            // 若有導頁，則導頁，不拿資料
            if (store.state.redirectURL) {
              top.location = store.state.redirectURL
              commit('STOREREDIRECTURL', '')
            } else {
              sessionStorage.setItem('isLoginCall', true)
              router.push('mb_data')
            }
          }
          // FB資料正確但未完成帳號綁定
        } else if (res.data.success && res.data.data.redirect) {
          commit('FBACCOUNTISBINDALREADY', res.data.data.accountExist)
          if (store.state.isApp) {
            checkConsole('FB登入APP資料正確但未完成帳號綁定', res)
            const expireTime = new Date().getTime() + 1000 * 60 * 30
            document.cookie =
              'loginByFbSetting=Y;expires=' + new Date(expireTime).toGMTString()
            router.push({ path: '/loginbyfb', query })
          } else {
            checkConsole('FB資料正確但未完成帳號綁定', res)
            const expireTime = new Date().getTime() + 1000 * 60 * 30
            document.cookie =
              'loginByFbSetting=Y;expires=' + new Date(expireTime).toGMTString()
            router.push('/loginbyfb')
          }
        } else {
          var errorText = res.data.message.split('::')[1]
          commit('ERRORMSG', `登入失敗，${errorText}`)
          checkConsole('FB登入失敗', res)
        }
      })
    },
    signup (context, { paramData, activeOption }) {
      var api
      var query = store.state.isApp ? { app: 'y' } : ''
      context.commit('UPDATEISLOADING', true)
      // E-mail註冊流程
      if (activeOption === 'email') {
        api = `${process.env.VUE_APP_API}/user/register/email`
        const paramDatas = {
          email: paramData.email,
          pwd: paramData.pwd,
          pwdCheck: paramData.pwdCheck,
          isService: paramData.isService,
          isSubscribeEDM: paramData.isSubscribeEDM,
          isOpenCom: paramData.isOpenCom
        }
        axios.post(api, paramDatas).then(res => {
          context.commit('UPDATEISLOADING', false)
          if (res.data.success) {
            checkConsole('email註冊成功', res)
            const expireTime = new Date().getTime() + 1000 * 60 * 30
            document.cookie =
              'signUp=Y;expires=' + new Date(expireTime).toGMTString()
            router.push({ path: '/regsuccess', query })
          } else {
            checkConsole('註冊失敗', res)
            var errorText = res.data.message.split('::')[1]
            context.commit('ERRORMSG', `註冊失敗，${errorText}`)
          }
        }).catch(function () {
          context.commit('UPDATEISLOADING', false)
          alert('註冊失敗，系統忙碌中請稍後再試')
        })
        // 手機註冊流程
      } else {
        api = `${process.env.VUE_APP_API}/user/register/phone`
        const paramDatas = {
          phone: paramData.email,
          pwd: paramData.pwd,
          pwdCheck: paramData.pwdCheck,
          isService: paramData.isService,
          isSubscribeEDM: paramData.isSubscribeEDM,
          isOpenCom: paramData.isOpenCom
        }
        axios.post(api, paramDatas).then(res => {
          context.commit('UPDATEISLOADING', false)
          if (res.data.success) {
            checkConsole('手機註冊成功', res)
            const expireTime = new Date().getTime() + 1000 * 60 * 30
            document.cookie =
              'pResendActive=Y;expires=' + new Date(expireTime).toGMTString()
            context.commit('STOREACCOUNT', paramData.email)
            router.push({ path: '/phoneletterconfirm', query })
          } else {
            checkConsole('註冊失敗', res)
            const errorText = res.data.message.split('::')[1]
            context.commit('ERRORMSG', `註冊失敗，${errorText}`)
          }
        }).catch(function () {
          context.commit('UPDATEISLOADING', false)
          alert('註冊失敗，系統忙碌中請稍後再試')
        })
      }
    },
    // 手機啟用頁面
    phoneConfirm (context, paramData) {
      context.commit('UPDATEISLOADING', true)
      var query = store.state.isApp ? { app: 'y' } : ''
      const api = `${process.env.VUE_APP_API}/user/register/phone/active`
      axios.post(api, paramData).then(res => {
        context.commit('UPDATEISLOADING', false)
        if (res.data.success) {
          checkConsole('手機號碼啟用成功', res)
          context.commit('CLEARERRORACCOUNT')
          const expireTime = new Date().getTime() + 1000 * 60 * 30
          document.cookie =
            'pActiveOk=Y;expires=' + new Date(expireTime).toGMTString()
          router.push({ path: '/phoneconfirm_success', query })
        } else {
          checkConsole('手機註冊認證失敗', res)
          context.commit('ERRORMSG', `認證失敗, ${res.data.message}`)
        }
      }).catch(function () {
        alert('系統錯誤，請稍後再試')
        context.commit('UPDATEISLOADING', false)
      })
    },
    // 手機認證
    phoneVerification ({ dispatch, commit }, paramData) {
      const api = `${process.env.VUE_APP_API}/member/authCode`
      axios.post(api, paramData).then(res => {
        if (res.data.success) {
          checkConsole('手機認證成功', res)
          alert('手機認證成功')
          dispatch('logOut')
        } else {
          checkConsole('手機認證失敗', res)
          var errorText = res.data.message.split('::')[1]
          commit('ERRORMSG', `認證失敗，${errorText}`)
        }
      })
    },
    // 我的資料頁FB綁定帳號
    bindFbAccount ({ dispatch, commit }, token) {
      const expireTime = new Date().getTime() - 1
      document.cookie =
            'bindRedirect=Y;expires=' + new Date(expireTime).toGMTString()
      var api = `${process.env.VUE_APP_API}/member/bind/facebook`
      var paramData = {
        id: store.state.FBaccount.id,
        accessToken: token,
        email: store.state.FBaccount.email,
        token_for_business: store.state.FBaccount.token_for_business,
        name: store.state.FBaccount.name
      }
      axios.post(api, paramData).then(res => {
        if (res.data.success) {
          alert('Facebook綁定成功')
          checkConsole('FB綁定成功', res)
          location.reload()
        } else {
          var errorText = res.data.message.split('::')[1]
          alert(`Facebook綁定失敗，${errorText}`)
          checkConsole('FB綁定失敗', res)
        }
      })
    },
    // 我的資料頁FB解除綁定帳號
    unbindFbAccount (context) {
      context.commit('UPDATEISLOADING', true)
      const api = `${process.env.VUE_APP_API}/member/unbind/facebook`
      axios.post(api).then(res => {
        context.commit('UPDATEISLOADING', false)
        if (res.data.success) {
          alert('解除綁定成功')
          checkConsole('解除FB綁定成功', res)
          localStorage.removeItem('vuex')
          localStorage.removeItem('status')
          context.commit('LOGOUT', false)
          router.push('/login')
        } else {
          checkConsole('解除FB綁定失敗', res)
          var errorText = res.data.message.split('::')[1]
          alert(`Facebook解除綁定失敗，${errorText}`)
        }
      })
    },
    // FB登入設定頁，綁定UDN帳號
    loginFbBindUdn ({ dispatch, commit }, paramData) {
      const api = paramData.account.indexOf('@') > -1 ? `${process.env.VUE_APP_API}/user/bind/email/facebook` : `${process.env.VUE_APP_API}/user/bind/phone/facebook`
      var sendData = paramData.account.indexOf('@') > -1 ? { email: paramData.account, pwd: paramData.pwd } : { phone: paramData.account, pwd: paramData.pwd }
      if (store.state.isApp) {
        axios.post(api, sendData).then(res => {
          if (res.data.success) {
            checkConsole('FB登入APP綁定udn帳號成功', res)
            alert('FB綁定成功')
            commit('LOGINSTATUS', true)
            var toAppData = {}
            toAppData.status = res.status
            toAppData.message = res.data.message
            toAppData.account = res.data.data.account
            toAppData.activeService = res.data.data.activeService
            toAppData.cookies = res.data.cookies
            toAppData.from = res.data.data.from
            toAppData.email = res.data.data.email
            var json = JSON.stringify(toAppData)
            try {
              window.webkit.messageHandlers.loginResult.postMessage(json)
            } catch (e) {}
            try {
              AndroidEDNFunction.loginResult(json)
            } catch (e) {}
          } else {
            checkConsole('FB登入APP綁定udn帳號失敗', res)
            var errorText = res.data.message.split('::')[1]
            commit('ERRORMSG', `FB綁定失敗，${errorText}`)
          }
        }).catch(() => {
          commit('UPDATEISLOADING', false)
          alert('系統忙碌中，請稍後再試')
        })
        // WEB使用
      } else {
        commit('UPDATEISLOADING', true)
        axios.post(api, sendData).then(res => {
          commit('UPDATEISLOADING', false)
          if (res.data.success) {
            checkConsole('FB綁定udn帳號成功', res)
            alert('FB綁定udn帳號成功')
            // 若有導頁，則導頁，不拿資料
            if (store.state.redirectURL) {
              top.location = store.state.redirectURL
              commit('STOREREDIRECTURL', '')
            } else {
              dispatch('getUserData')
                .then(function () {
                  commit('LOGINSTATUS', true)
                  router.push('/mb_data')
                })
                .catch(res => {
                  alert('取得資料失敗')
                })
            }
          } else {
            checkConsole('FB綁定udn帳號失敗', res)
            var errorText = res.data.message.split('::')[1]
            commit('ERRORMSG', `FB綁定失敗，${errorText}`)
          }
        }).catch(() => {
          commit('UPDATEISLOADING', false)
          alert('系統忙碌中，請稍後再試')
        })
      }
    },
    // FB登入設定頁，不是UDN會員
    loginFbWithoutUdn ({ dispatch, commit }, paramData) {
      if (store.state.isApp) {
        const api = paramData.pwd ? `${process.env.VUE_APP_API}/user/register/facebook` : `${process.env.VUE_APP_API}/user/register/facebook/email`
        axios.post(api, paramData).then(res => {
          if (res.data.success) {
            checkConsole('FB登入APP註冊UDN會員成功', res)
            alert('FB綁定UDN帳號成功，請重新登入')
            router.push('/login')
          } else {
            checkConsole('FB綁定UDN帳號失敗', res)
            var errorText = res.data.message.split('::')[1]
            commit('ERRORMSG', `FB綁定失敗，${errorText}`)
          }
        }).catch(() => {
          commit('UPDATEISLOADING', false)
          alert('系統忙碌中，請稍後再試')
        })
        // web使用
      } else {
        commit('UPDATEISLOADING', true)
        const api = paramData.pwd ? `${process.env.VUE_APP_API}/user/register/facebook` : `${process.env.VUE_APP_API}/user/register/facebook/email`
        axios.post(api, paramData).then(res => {
          commit('UPDATEISLOADING', false)
          if (res.data.success) {
            checkConsole('FB登入註冊UDN會員成功', res)
            const expireTime = new Date().getTime() + 1000 * 60 * 30
            document.cookie =
            'fbregisterOk=Y;expires=' + new Date(expireTime).toGMTString()
            router.push('/loginbyfb_success')
          } else {
            checkConsole('FB綁定UDN帳號失敗', res)
            var errorText = res.data.message.split('::')[1]
            commit('ERRORMSG', `FB綁定失敗，${errorText}`)
          }
        }).catch(() => {
          commit('UPDATEISLOADING', false)
          alert('系統忙碌中，請稍後再試')
        })
      }
    },
    // 儲存FB帳號資料
    storefbdata (context, data) {
      context.commit('STOREFBDATA', data)
    },
    // 取得使用者資料
    getUserData ({ dispatch, commit }) {
      const api = `${process.env.VUE_APP_API}/member/profile`
      commit('UPDATEISLOADING', true)
      return new Promise((resolve, reject) => {
        axios.get(api).then(res => {
          commit('UPDATEISLOADING', false)
          if (res.data.success) {
            resolve('true')
            checkConsole('取得資料成功', res)
            const filterData = {
              addr: res.data.data.addr,
              email: res.data.data.email,
              ext: res.data.data.ext,
              name: res.data.data.name,
              phone: res.data.data.phone,
              sex: res.data.data.sex ? res.data.data.sex : '1',
              stockopen: res.data.data.stockopen,
              tel: res.data.data.tel,
              telzyd: res.data.data.telzyd,
              birthday: {
                y: res.data.data.birthday.y ? res.data.data.birthday.y : '2000',
                m: res.data.data.birthday.m ? res.data.data.birthday.m : '01',
                d: res.data.data.birthday.d ? res.data.data.birthday.d : '01'
              },
              email_active: res.data.data.email_active,
              money_active: res.data.data.money_active,
              phone_active: res.data.data.phone_active,
              facebook_bind: res.data.data.facebook_bind,
              status: res.data.data.status
            }
            // account 為頁面右上角顯示的資訊，有姓名顯示姓名，沒姓名顯示E-mail，沒E-mail顯示手機
            var account = filterData.name
              ? filterData.name
              : filterData.email_active === 'Y'
                ? filterData.email
                : filterData.phone

            // 修改密碼欄位的帳號顯示資訊
            var bottomAccount = filterData.email_active === 'Y'
              ? filterData.email
              : filterData.phone
            commit('USERDATA', { filterData, account, bottomAccount })
          } else {
            checkConsole('取得會員資料失敗', res)
            alert('系統異常，請重新登入')
            dispatch('logOut')
          }
        }).catch(function () {
          commit('UPDATEISLOADING', false)
          alert('系統異常，請重新登入')
          dispatch('logOut')
        })
      })
    },
    updateUserData ({ dispatch, commit }, { updateData, modifyEmailConfirm, modifyPhoneConfirm }) {
      commit('UPDATEISLOADING', true)
      const url = `${process.env.VUE_APP_API}/member/profile`
      axios
        .post(url, updateData)
        .then(res => {
          commit('UPDATEISLOADING', false)
          if (modifyEmailConfirm && res.data.success) {
            checkConsole('修改信箱且更新資料成功', res.data)
            alert('資料更新成功，請至修改的信箱收取認證信')
            dispatch('logOut')
          } else if (modifyPhoneConfirm && res.data.success) {
            checkConsole('修改手機且更新資料成功', res.data)
            commit('STOREACCOUNT', store.state.userInfo.phone)
            alert('手機號碼更新成功，系統將會發送認證簡訊，請於下一頁輸入簡訊驗證碼以完成認證')
            var api = `${process.env.VUE_APP_API}/member/authPhone`
            axios.post(api).then(res => {
              if (res.data.success) {
                checkConsole('手機發送認證簡訊成功', res)
                const expireTime = new Date().getTime() + 1000 * 60 * 30
                document.cookie =
                'pVerification=Y;expires=' + new Date(expireTime).toGMTString()
                store.commit('STOREACCOUNT', updateData.phone)
                router.push('/mb_pverification')
              } else {
                checkConsole('手機發送認證簡訊失敗', res)
                alert('手機認證失敗')
              }
            })
          } else if (res.data.success) {
            checkConsole('更新資料成功', res)
            alert('資料更新成功')
            dispatch('getUserData')
          } else {
            checkConsole('更新資料失敗', res)
            var errorText = res.data.message.split('::')[1]
            alert(`資料更新失敗：${errorText}`)
          }
        })
        .catch(function () {
          alert('系統忙碌中，請稍後再試')
          commit('UPDATEISLOADING', false)
        })
    },

    // 忘記密碼
    getPWD (context, { account, captcha }) {
      var query = store.state.isApp ? { app: 'y' } : ''
      var api
      // email流程
      if (account.indexOf('@') > -1) {
        api = `${process.env.VUE_APP_API}/user/resetPassword`
        axios
          .post(api, {
            email: account
          })
          .then(res => {
            if (res.data.success) {
              checkConsole('忘記密碼確認信成功', res)
              context.commit('STOREACCOUNT', account)
              // cookie 時間30分鐘
              const expireTime = new Date().getTime() + 1000 * 60 * 30
              document.cookie =
                'getPwdToken=Y;expires=' + new Date(expireTime).toGMTString()
              router.push({ path: '/getpwdsuccess', query })
            } else {
              checkConsole('忘記密碼確認信失敗', res)
              var errorText = res.data.message.split('::')[1]
              context.commit('ERRORMSG', `重設密碼失敗，${errorText}`)
            }
          })
        // phone 流程
      } else {
        api = `${process.env.VUE_APP_API}/user/resetPassword/phone`
        axios
          .post(api, {
            phone: account
          })
          .then(res => {
            if (res.data.success) {
              checkConsole('忘記密碼確認信成功', res)
              context.commit('STOREACCOUNT', account)
              // cookie 時間30分鐘
              const expireTime = new Date().getTime() + 1000 * 60 * 30
              document.cookie =
                'getPwdToken=Y;expires=' + new Date(expireTime).toGMTString()
              router.push({ path: '/getpwdsuccess', query })
              window.open(res.data.data.redirecturl)
            } else {
              checkConsole('忘記密碼確認信失敗', res)
              var errorText = res.data.message.split('::')[1]
              context.commit('ERRORMSG', `重設密碼失敗，${errorText}`)
            }
          })
      }
    },
    // 重寄啟用信
    reSendActive (context, { account, captcha }) {
      var query = store.state.isApp ? { app: 'y' } : ''
      // email 重寄啟用信流程
      if (account.indexOf('@') > -1) {
        const api = `${process.env.VUE_APP_API}/user/resendActive`
        axios
          .post(api, {
            email: account
          })
          .then(res => {
            if (res.data.success) {
              checkConsole('重寄啟用信成功', res)
              context.commit('STOREACCOUNT', account)
              // cookie 時間30分鐘
              const expireTime = new Date().getTime() + 1000 * 60 * 30
              document.cookie =
                'resendActive=Y;expires=' + new Date(expireTime).toGMTString()
              router.push({ path: '/resdsuccess', query })
            } else {
              checkConsole('重寄啟用信失敗', res)
              var errorText = res.data.message.split('::')[1]
              context.commit('ERRORMSG', `重寄啟用信失敗，${errorText}`)
            }
          })
        // 手機重發驗證碼流程
      } else {
        const api = `${process.env.VUE_APP_API}/user/register/phone/resendCode`
        axios
          .post(api, {
            phone: account
          })
          .then(res => {
            if (res.data.success) {
              checkConsole('重發簡訊成功', res)
              const expireTime = new Date().getTime() + 1000 * 60 * 30
              document.cookie =
                'pResendActive=Y;expires=' + new Date(expireTime).toGMTString()
              context.commit('STOREACCOUNT', account)
              router.push({ path: '/phoneletterconfirm', query })
            } else {
              checkConsole('重寄簡訊失敗', res)
              var errorText = res.data.message.split('::')[1]
              context.commit('ERRORMSG', `重寄簡訊失敗，${errorText}`)
            }
          })
      }
    },

    // 會員手機號碼註冊重發驗證碼
    resendLetter (context, phone) {
      const api = `${process.env.VUE_APP_API}/user/register/phone/resendCode`
      return new Promise((resolve, reject) => {
        axios.post(api, { phone }).then(res => {
          if (res.data.success) {
            resolve(context.commit('GETPHONECODE', true))
            checkConsole('重寄簡訊啟用信成功', res)
            alert('簡訊驗證碼已傳送至您的手機，請查看手機簡訊')
          } else {
            reject(alert('系統異常，請稍後再試'))
          }
        })
      })
    },
    // 會員手機號碼驗證-發送驗證碼
    sendVerificationCode (context) {
      const api = `${process.env.VUE_APP_API}/member/authPhone`
      return new Promise((resolve, reject) => {
        axios.post(api).then(res => {
          if (res.data.success) {
            resolve(console.log('ok'))
            const expireTime = new Date().getTime() + 1000 * 60 * 30
            document.cookie =
                  'pVerification=Y;expires=' + new Date(expireTime).toGMTString()
            router.push('/mb_pverification')
          } else {
            reject(alert('手機發送認證簡訊失敗'))
          }
        })
      })
    },
    forApp (context, state) {
      context.commit('FORAPP', state)
    },
    storeRecaptchaToken (context, token) {
      context.commit('STORERECAPTCHATOKEN', token)
    },
    clearData (context) {
      context.commit('CLEARDATA')
    }
  },
  getters: {
    loginStatus (state) {
      return state.isLogin
    },
    username (state) {
      return state.userName
    },
    captchaurl (state) {
      return state.captchaUrl
    },
    useracttel (state) {
      return state.userActtel
    },
    userinfo (state) {
      return state.userInfo
    },
    errormsg (state) {
      return state.errorMsg
    },
    account (state) {
      return state.account
    }
  },
  // 模組化vuex，將類似功能放進同一個.js，並import進來，值得注意的是，modules裡面的state 是區域變數，但actions、mutuations是全域變數，因此取名不可重複。
  modules: {}
})

export default store
