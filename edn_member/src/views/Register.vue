<template>
  <div class="register notlogin">
    <div class="register_title">
      <h5>加入會員</h5>
      <div class="musthave">
        (<span class="symbol">*</span>為必填)
      </div>
    </div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="form_field" @submit.prevent="handleSubmit(signup)">
        <div class="email">
          <label for="email_login">會員帳號</label><span class="symbol">*</span>
          <ValidationProvider
            v-slot="{ failed, errors }"
            name="email"
            rules="required|phoneOrEmail"
            tag="div"
          >
            <div class="input_block">
              <input
                type="text"
                id="email_login"
                v-model="paramData.email"
                name="email"
                placeholder="請輸入手機號碼或E-mail"
                :class="{ 'is-invalid': failed }"
              />
              <span class="error-text" v-if="failed">
                {{ errors[0] }}
              </span>
            </div>
          </ValidationProvider>
          <div class="notice">
            <span>請填寫正確手機號碼或E-mail，以免影響相關權益。
            </span>
          </div>
        </div>
        <div class="password">
          <label for="password">密碼</label><span class="symbol">*</span>
          <ValidationProvider
            v-slot="{ failed, errors }"
            name="pwd"
            rules="required|min:6"
            tag="div"
            vid="confirmation"
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
                {{errors[0]}}
              </span>
            </div>
          </ValidationProvider>
        </div>
        <div class="confirm-pwd">
          <label for="confirm-pwd">確認密碼</label><span class="symbol">*</span>
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
                v-model="paramData.pwdCheck"
                name="confirmPwd"
                :class="{ 'is-invalid': failed }"
                autocomplete="off"
              />
              <span class="error-text" v-if="failed">
                {{ errors[0]}}
              </span>
            </div>
          </ValidationProvider>
        </div>
        <div class="other-message">
          <div class="service">
            <input type="checkbox" name="service" id="service" v-model="service"/>
            <label for="service"
              >我同意 <a href="http://www.udngroup.com/members/service" target="_blank">會員服務條款</a>與
              <a href="http://www.udngroup.com/members/udn_privacy" target="_blank">隱私權聲明</a>
            </label>
          </div>
          <div class="subscribe">
            <input type="checkbox" name="subscribe" id="subscribe"  v-model="subscribeEDM"/>
            <label for="subscribe">我願意訂閱經濟日報發出的市場相關訊息</label>
          </div>
        </div>
        <div class="error-msg">
          {{ errormsg }}
        </div>
        <button class="sign_button confirm_send" type="submit">
          加入udn會員
        </button>
      </form>
    </ValidationObserver>
    <Ismembered></Ismembered>
  </div>
</template>

<script>
import Ismembered from '../components/BaseDirectLogin.vue'
import { mapGetters } from 'vuex'
export default {
  metaInfo: {
    title: '加入udn會員'
  },
  components: {
    Ismembered
  },
  data () {
    return {
      paramData: {
        email: '',
        pwd: '',
        pwdCheck: '',
        isService: 'N',
        isSubscribeEDM: 'N',
        isOpenCom: 'Y'
      },
      title: '加入會員',
      activePhoneOrEmail: ''
    }
  },
  methods: {
    signup: function (paramData, activeOption) {
      const vm = this
      if (vm.paramData.isService === 'N') {
        alert('請同意會員服務條款與隱私權聲明')
      } else {
        paramData = vm.paramData
        activeOption = (vm.paramData.email.indexOf('@') > -1) ? 'email' : 'phone'
        vm.$store.dispatch('signup', { paramData, activeOption })
      }
    }
  },
  computed: {
    ...mapGetters(['errormsg']),
    service: {
      get () {
        return false
      },
      set (value) {
        this.paramData.isService = (value) ? 'Y' : 'N'
      }
    },
    subscribeEDM: {
      get () {
        return false
      },
      set (value) {
        this.paramData.isSubscribeEDM = (value) ? 'Y' : 'N'
      }
    }
  },
  created () {
  }
}
</script>

<style scoped>
.email-is-invalid,
.cell-is-invalid {
  border: 1px solid #d72c1d !important;
}
.email-error-text,
.cell-error-text {
  position: absolute;
  font-size: 15px;
  font-weight: 100;
  color: #d72c1d;
  bottom: 4px;
  right: 5px;
  display: none;
}
.email-is-invalid + .email-error-text {
  display: block;
}
.cell-is-invalid + .email-error-text + .cell-error-text {
  display: block;
}
.register_title {
  display: flex;
  justify-content: flex-start;
}
span.symbol {
  line-height: 1;
  position: relative;
  top: 2px;
}
.notice {
  font-size: 12px;
  font-weight: 100;
  color: #d72c1d;
  margin-top: 16px;
  line-height: 1!important;
}
.input_block {
  position: relative;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
input:focus {
  outline: none;
}
.form-text {
  margin-bottom: 20px;
}
.form-text span {
  font-size: 15px;
  font-weight: 100;
  color: #000;
}
.email label,
.password label,
.confirm-pwd label,
.cell label {
  font-size: 15px;
  font-weight: 300;
  color: #000;
  margin-bottom: 2px;
}
.email input,
.password input,
.confirm-pwd input,
.cell input {
  width: 100%;
  font-size: 12.5px;
  color: #000;
  padding: 5px 0 5px 15px;
  font-family: "Montserrat ExtraLight";
}
.email,
.password,
.confirm-pwd,
.cell,
.other-message {
  margin-bottom: 10px;
  position: relative;
}
.other-message {
  padding-top: 10px;
}
.email div,
.password div,
.confirm-pwd div,
.cell div {
  line-height: 1.5;
}
.service,
.subscribe,
.enable-service {
  margin-bottom: 0px;
}
label {
  margin-bottom: 0;
}
.other-message label {
  font-size: 13px;
  font-weight: 300;
}
.other-message input {
  margin-right: 3px;
}
.service a {
  color: #d72c1d;
}
</style>
