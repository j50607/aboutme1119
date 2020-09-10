<template>
  <div class="loginbyfb notlogin">
    <div class="fblogin_title">
      <h5>Facebook登入設定</h5>
    </div>
    <div class="fbaccount" v-if="FBaccount.email">
      <span>您的Facebook帳號：</span>
      <span>{{FBaccount.email}}</span>
    </div>
    <div class="identity">
      <span>請選擇您目前的會員身分</span>
      <div class="notmember">
        <input
          type="radio"
          name="identity"
          id="notmember"
          v-model="isMember"
          value="1"
          :disabled="isFbAlreadyBind"
        />
        <label for="notmember" @click="FbAccountIsBindAlready">我不是udn.com會員</label>
      </div>
      <div class="member_form no_fb_email" v-if="isMember === '1' && !FBaccount.email">
        <span>
          填寫會員註冊資料並完成 E-mail 啟用認證信函，未來直接使用 Facebook
          帳號登入。
        </span>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form class="form_field" @submit.prevent="handleSubmit(bindNotUdn)">
            <div class="email">
              <label for="email_login">E-mail</label>
              <ValidationProvider
                v-slot="{ failed, errors }"
                name="email"
                rules="required|email"
                tag="div"
              >
                <div class="input_block">
                  <input
                    type="text"
                    id="email_login"
                    v-model="paramDataWithoutFbEmail.email"
                    name="email"
                    :class="{ 'is-invalid': failed }"
                  />
                  <span class="error-text" v-if="failed">
                    {{ errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </div>
            <div class="password">
              <label for="password">密碼</label>
              <ValidationProvider
                v-slot="{ failed, errors }"
                name="pwd"
                rules="required"
                tag="div"
                vid="confirmation"
              >
                <div class="input_block">
                  <input
                    type="password"
                    id="password"
                    v-model="paramDataWithoutFbEmail.pwd"
                    name="pwd"
                    :class="{ 'is-invalid': failed }"
                    autocomplete="off"
                  />
                  <span class="error-text" v-if="failed">
                    {{ errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </div>
            <div class="confirm-pwd">
              <label for="confirm-pwd">確認密碼</label>
              <ValidationProvider
                v-slot="{ failed, errors }"
                name="confirmPwd"
                rules="confirmed:confirmation|required"
                tag="div"
              >
                <div class="input_block">
                  <input
                    type="password"
                    id="confirm-pwd"
                    v-model="paramDataWithoutFbEmail.pwdCheck"
                    name="confirmPwd"
                    :class="{ 'is-invalid': failed }"
                    autocomplete="off"
                  />
                  <span class="error-text" v-if="failed">
                    {{ errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </div>
            <div class="other-message">
              <div class="service">
                <input
                  type="checkbox"
                  name="service"
                  id="service"
                  v-model="service"
                />
                <label for="service"
                  >我同意 <a href="">會員服務條款</a>與
                  <a href="">隱私權聲明</a>
                </label>
              </div>
              <div class="subscribe">
                <input
                  type="checkbox"
                  name="subscribe"
                  id="subscribe"
                  v-model="subscribeEDM"
                />
                <label for="subscribe"
                  >我願意訂閱經濟日報發出的市場相關訊息</label
                >
              </div>
            </div>
            <div class="error-msg">
              {{ errorMsg }}
            </div>
            <button class="sign_button confirm_send" type="submit">
              加入會員
            </button>
          </form>
        </ValidationObserver>
      </div>
      <div class="member_form" v-if="isMember === '1' && FBaccount.email">
        <span
          >將使用Facebook帳號成為udn.com會員，未來直接使用Facebook帳號登入
        </span>
        <ValidationObserver v-slot="{ handleSubmit }" tag="div">
          <form action="" @submit.prevent="handleSubmit(bindNotUdn)">
            <div class="phone">
              <label for="phone">手機號碼</label>
              <div class="phone_input">
                <ValidationProvider
                  v-slot="{ failed, errors }"
                  name="phone"
                  tag="div"
                  :rules="{ required: true, regex: /^[09]{2}[0-9]{8}$/ }"
                >
                  <div class="input_block">
                    <input
                      type="text"
                      id="phone"
                      v-model="paramDataWithFbEmail.phone"
                      name="phone"
                      :class="{ 'is-invalid': failed }"
                      placeholder="請輸入手機號碼"
                    />
                    <span class="error-text" v-if="failed">
                      {{ errors[0] }}
                    </span>
                  </div>
                </ValidationProvider>
              </div>
            </div>
            <div class="other-message">
              <div class="service">
                <input
                  type="checkbox"
                  name="service"
                  id="service"
                  v-model="service"
                />
                <label for="service"
                  >我同意
                  <a
                    href="http://www.udngroup.com/members/service"
                    target="_blank"
                    >會員服務條款</a
                  >與
                  <a
                    href="http://www.udngroup.com/members/udn_privacy"
                    target="_blank"
                    >隱私權聲明</a
                  >
                </label>
              </div>
              <div class="subscribe">
                <input
                  type="checkbox"
                  name="subscribe"
                  id="subscribe"
                  v-model="subscribeEDM"
                />
                <label for="subscribe"
                  >我願意訂閱經濟日報發出的市場相關訊息</label
                >
              </div>
            </div>
            <div class="error-msg">
              {{errorMsg}}
            </div>
            <button class="sign_button confirm_send" type="submit">
              確認送出
            </button>
          </form>
        </ValidationObserver>
      </div>
      <div class="membered">
        <input
          type="radio"
          name="identity"
          id="member"
          v-model="isMember"
          value="2"
        />
        <label for="member">我是udn.com會員</label>
      </div>
      <div class="member_form" v-if="isMember === '2'">
        <span>
          輸入會員登入資訊進行綁定，未來可選擇使用會員登入或Facebook帳號登入。
        </span>
        <ValidationObserver v-slot="{ handleSubmit }" tag="div">
          <form class="form_field" @submit.prevent="handleSubmit(bindForUdn)">
            <div class="email">
              <label for="email_login">E-mail／手機號碼</label>
              <ValidationProvider
                v-slot="{ failed, errors }"
                name="email"
                rules="phoneOrEmail|required"
                tag="div"
              >
                <div class="input_block">
                  <input
                    type="text"
                    id="email_login"
                    v-model="paramData.account"
                    name="email"
                    :class="{ 'is-invalid': failed }"
                  />
                  <span class="error-text" v-if="failed">
                    {{ errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </div>
            <div class="password">
              <label for="password">密碼</label>
              <ValidationProvider
                v-slot="{ failed, errors }"
                name="pwd"
                rules="required"
                tag="div"
                vid="confirmation"
                style="display:flex;"
              >
                <div class="input_block">
                  <input
                    type="password"
                    id="password"
                    v-model="paramData.pwd"
                    name="pwd"
                    :class="{ 'is-invalid': failed }"
                    autocomplete="off"
                  />
                  <span class="error-text" v-if="failed">
                    {{ errors[0] }}
                  </span>
                </div>
                <div class="forget_pwd">
                  <router-link to="/getpassword">忘記密碼？</router-link>
                </div>
              </ValidationProvider>
            </div>
            <div class="error-msg">
              {{ errorMsg }}
            </div>
            <button class="sign_button confirm_send" type="submit">
              確認送出
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'loginByFb',
  data () {
    return {
      paramDataWithoutFbEmail: {
        email: '',
        pwd: '',
        pwdCheck: '',
        isService: 'N',
        isSubscribeEDM: 'N',
        isOpenCom: 'Y'
      },
      paramDataWithFbEmail: {
        phone: '',
        isService: 'N',
        isSubscribeEDM: 'N',
        isOpenCom: 'Y'
      },
      paramData: {
        account: '',
        pwd: ''
      },
      isMember: '1'
    }
  },
  watch: {
    isMember: {
      immediate: true,
      handler (oldData, newData) {
        const vm = this
        if (oldData !== newData) {
          vm.$store.commit('CLEARERRORMSG')
        }
      }
    }
  },
  methods: {
    bindForUdn: function () {
      const vm = this
      vm.$store.dispatch('loginFbBindUdn', vm.paramData)
    },
    bindNotUdn: function () {
      const vm = this
      const paramData = vm.FBaccount.email ? vm.paramDataWithFbEmail : vm.paramDataWithoutFbEmail
      vm.$store.dispatch('loginFbWithoutUdn', paramData)
    },
    FbAccountIsBindAlready: function () {
      const vm = this
      if (vm.isFbAlreadyBind) {
        alert('該 E-mail 已為會員，請選擇「我是udn.com會員」進行綁定')
      }
    }
  },
  computed: {
    ...mapState(['errorMsg', 'FBaccount', 'isFbAlreadyBind']),
    service: {
      get () {
        return false
      },
      set (value) {
        this.paramDataWithFbEmail.isService = value ? 'Y' : 'N'
        this.paramDataWithoutFbEmail.isService = value ? 'Y' : 'N'
      }
    },
    subscribeEDM: {
      get () {
        return false
      },
      set (value) {
        this.paramDataWithFbEmail.isSubscribeEDM = value ? 'Y' : 'N'
        this.paramDataWithoutFbEmail.isSubscribeEDM = value ? 'Y' : 'N'
      }
    }
  },
  created () {
    const vm = this
    if (vm.isFbAlreadyBind) {
      vm.isMember = '2'
    }
  },
  destroyed () {
    document.cookie = 'loginByFbSetting=;expires=' + (new Date(0)).toGMTString()
  }
}
</script>
<style scoped>
a {
  color: #d72c1d;
}
.fbaccount {
  margin-bottom: 20px;
}
.fbaccount span {
  font-size: 15px;
  font-weight: 100;
}
.identity>span {
  font-size: 15px;
  font-weight: 100;
  margin-bottom: 6px;
  display: inline-block;
}
.notmember {
  margin-bottom: 5px;
}
.notmember input {
  margin-right: 3px;
}
.notmember label {
  font-size: 18px;
  margin: 0;
}
.member_form {
  line-height: 1.5;
}
.member_form label {
  font-size: 15px;
  font-weight: 300;
  margin-bottom: 0;
}
label[for="phone"] {
  margin-right: 5px;
}
.member_form > span {
  display: block;
  font-size: 15px;
  font-weight: 100;
  margin-bottom: 18px;
}
.phone {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}
.phone_input {
  width: 60%;
  flex: 1;
}
.input_block {
  position: relative;
  flex: 1;
  line-height: 1.5;
}
.input_block .error-text {
  bottom: -100%;
}
.input_block input {
  font-size: 13px;
  font-weight: 100;
  padding: 5px 0 5px 5px;
}
.other-message input {
  margin-right: 3px;
}
.membered {
  margin-top: 20px;
}
.membered input {
  margin-right: 3px;
}
.membered label {
  font-size: 18px;
  margin: 0;
}
.email,
.password,
.confirm-pwd,
.cell {
  margin-bottom: 10px;
  position: relative;
}
.email div,
.password div,
.confirm-pwd div,
.cell div {
  line-height: 1.5;
}
.other-message {
  margin-bottom: 10px;
  position: relative;
  padding-top: 10px;
}
.forget_pwd {
  font-weight: 100;
  font-size: 15px;
  text-align: right;
  padding-top: 5px;
}
.forget_pwd a {
  color: #000;
}
.forget_pwd a:hover {
  color: #d72c1d;
}
.password .input_block {
  margin-right: 5px;
}
@media screen and (max-width:  767px) {
  .phone {
    flex-wrap: wrap;
  }
  .phone_input {
    width: 100%;
    flex:none;
  }
}
</style>
