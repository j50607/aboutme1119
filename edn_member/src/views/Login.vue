<template>
  <div class="notlogin login">
    <span class="notice-text" >如果您已是udn會員，請輸入原E-mail及密碼</span>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="login_field" @submit.prevent="handleSubmit(signin)">
        <div class="email_login">
          <label for="email_login">E-mail／手機號碼</label>
          <ValidationProvider
            v-slot="{ failed, errors }"
            name="email"
            rules="required|phoneOrEmail"
            tag="div"
          >
            <input
              type="text"
              id="email_login"
              v-model="username"
              ref="loginInput"
              name="email"
              :class="{ 'is-invalid': failed }"
            />
            <span class="error-text" v-if="failed">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
        <div class="password">
          <label for="password">密碼</label>
          <ValidationProvider
            v-slot="{ failed, errors }"
            name="pwd"
            rules="required"
            tag="div"
          >
            <input
              :type="type"
              id="password"
              v-model="password"
              name="pwd"
              autocomplete="on"
              :class="{ 'is-invalid': failed }"
            />
            <span class="error-text" v-if="failed">
              {{ errors[0] }}
            </span>
            <i
              class="far fa-eye-slash"
              @click="isShowPwd = !isShowPwd"
              v-if="!isShowPwd"
            ></i>
            <i class="far fa-eye" v-else @click="isShowPwd = !isShowPwd"></i>
          </ValidationProvider>
        </div>
        <vue-recaptcha
          sitekey="6LdHFMcZAAAAAHRS8ip8uIYmdZ4UiJbUauvDq89M"
          ref="defaultlogin"
          size="invisible"
          @verify="defaultLoginVerified"
          @expired="onCaptchaExpired"
        >
        </vue-recaptcha>
        <button class="login_button confirm_send">
          登入
        </button>
      </form>
    </ValidationObserver>
      <div class="for_login">
        <div class="login_support">
          <router-link :to="(isApp) ? forAppGetpassword : 'getpassword'"><span>忘記密碼</span></router-link>
          <router-link :to="(isApp) ? forAppResend : 'resend'"><span>重寄啟用信</span></router-link>
          <router-link :to="(isApp) ? forAppRegister : 'register'"><span>加入udn會員</span></router-link>
        </div>
        <div class="error-msg">
          {{ errormsg }}
        </div>
        <div class="other_logins">
          <div class="other_logins_title">
            <span>您也可以使用現有的社群帳號：</span>
          </div>
          <div class="other_login_buttons">
            <a href="" class="fb other_login" @click.prevent="fbSignin()">
              <i class="fab fa-facebook-square icon"></i>
              <span>快速登入</span>
            </a>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
/* global FB */
import VueRecaptcha from 'vue-recaptcha'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'login',
  metaInfo: {
    title: '登入'
  },
  components: {
    VueRecaptcha
  },
  data () {
    return {
      username: '',
      password: '',
      isShowPwd: false,
      forAppResend: {
        name: 'resend',
        query: {
          app: 'y'
        }
      },
      forAppGetpassword: {
        name: 'getpassword',
        query: {
          app: 'y'
        }
      },
      forAppRegister: {
        name: 'register',
        query: {
          app: 'y'
        }
      }
    }
  },
  methods: {
    onCaptchaExpired: function () {
      const vm = this
      vm.$refs.defaultlogin.reset()
    },
    defaultLoginVerified: function (recaptchaToken) {
      const vm = this
      const account = vm.username
      const pwd = vm.password
      vm.$store.dispatch('login', { account, pwd, recaptchaToken })
    },
    signin (account, pwd) {
      const vm = this
      vm.$refs.defaultlogin.execute()
    },
    fbSignin: function () {
      const vm = this
      FB.getLoginStatus(function (res) {
        // 判斷若已登入FB狀態，直接打FbLogin API
        if (res.authResponse) {
          var tokenForFb = res.authResponse.accessToken
          FB.api('/me?fields=name,id,email,token_for_business', function (response) {
            vm.$store.dispatch('storefbdata', response).then(function () {
              vm.$store.dispatch('FbLogin', tokenForFb)
            })
          })
        } else {
          // 若未登入FB狀態，導頁到FB登入頁並記錄cookie。
          const expireTime = new Date().getTime() + 1000 * 60 * 30
          document.cookie =
            'loginRedirect=Y;expires=' + new Date(expireTime).toGMTString()
          top.location = vm.isApp ? `https://www.facebook.com/v7.0/dialog/oauth?response_type=code,token&client_id=253554794800658&redirect_uri=${process.env.VUE_APP_FBREDIRECT}/member/login?app=y&scope=email` : `https://www.facebook.com/v7.0/dialog/oauth?response_type=code,token&client_id=253554794800658&redirect_uri=${process.env.VUE_APP_FBREDIRECT}/member/login&scope=email`
        }
      }, true)
    }
  },
  computed: {
    ...mapGetters(['errormsg']),
    ...mapState(['isApp']),
    type: function () {
      return this.isShowPwd ? 'text' : 'password'
    }
  },
  created () {
    const vm = this
    const redirectUrl = new URL(window.location)
    const params = redirectUrl.searchParams
    const paramsToApi = params.toString()
    vm.$store.commit('STOREPARAM', paramsToApi)
    if (params.has('redirect')) {
      vm.$store.commit('STOREREDIRECTURL', params.get('redirect'))
    }
  }
}
</script>

<style scoped>
.login_field {
  margin-bottom: 10px;
}
#email_login + .error-text {
  position: absolute;
  bottom: -45%;
  transform: translateY(-40%);
  right: 0;
  font-size: 12px;
  font-weight: 100;
  line-height: 1.5;
  font-weight: 100;
  color: #d72c1d;
  display: none;
}
#email_login.is-invalid + .error-text {
  display: block;
}
.notice-text {
  display: block;
  margin-bottom: 20px;
  font-size: 15px;
}
.email_login {
  margin-bottom: 10px;
  position: relative;
}
.email_login label,
.password label {
  font-size: 15px;
  font-weight: 300;
  color: #000;
  margin-bottom: 5px;
}
.email_login input,
.password input {
  width: 100%;
  font-size: 13px;
  font-weight: 100;
  color: #000;
  padding: 5px 0 5px 15px;
}
.password {
  margin-bottom: 30px;
  position: relative;
}
label {
  margin-bottom: 0;
}
.fa-eye-slash,
.fa-eye {
  position: absolute;
  right: 10px;
  bottom: 6px;
  font-size: 14px;
  cursor: pointer;
}
.login_button:hover {
  background-color: #ee4e3f;
}
.login_support {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
.login_support a {
  font-size: 15px;
  text-align: center;
  font-weight: 100;
  padding: 5px 8px;
  position: relative;
  color: #000;
}
.login_support a:hover {
  color: #d72c1d;
}
.login_support a:after {
  content: "";
  width: 1px;
  height: 10px;
  position: absolute;
  right: 0;
  background-color: #000;
  top: 50%;
  transform: translateY(-50%);
}
.login_support a:last-child:after {
  display: none;
}
.other_logins {
  text-align: center;
}
.other_logins_title {
  position: relative;
  text-align: left;
}
.other_logins_title span {
  color: #000;
  font-weight: 100;
  font-size: 15px;
  background-color: #f9f9f9;
  z-index: 1;
  line-height: 30px;
  position: relative;
  text-align: left;
}
.other_login {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 0;
  width: 100%;
  border: 1px solid #d8d8d8;
  border-radius: 5px;
  color: #636363;
  background-color: transparent;
}
a.fb:hover {
  background-color: #f1f1f1;
}
.other_login_buttons span {
  vertical-align: middle;
  display: table-cell;
  font-size: 15px;
  margin: 0;
}
.other_login_buttons i.fa-facebook-square {
  color: #3c5a99;
  font-size: 22px;
  margin-right: 8px;
}
.password .error-text {
  display: block;
  bottom:-45%;
  right: 0;
}
@media screen and (max-width: 767px) {

}
</style>
