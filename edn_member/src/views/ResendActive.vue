<template>
  <div class="notlogin resend">
    <div class="resend_title">
      <h5>重寄啟用信／簡訊</h5>
    </div>
    <ul class="steps">
      <li>
        沒有收到會員啟用信時，建議您到垃圾郵件夾查看，或於下方輸入您申請會員的E-mail，送出後將重新發送一封會員啟用信。
      </li>
      <li>
        送出後系統若告知E-mail錯誤，可能是註冊時E-mail輸入錯誤，建議您重新註冊。
      </li>
    </ul>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="input_field" @submit.prevent="handleSubmit(resendActive)">
        <div class="email_field">
          <label for="emailInput">E-mail／手機號碼</label>
          <ValidationProvider
            v-slot="{ failed, errors}"
            name="email"
            rules="required|phoneOrEmail"
            tag="div"
          >
            <div class="input_block">
              <input
                type="text"
                id="emailInput"
                placeholder="請輸入E-mail或手機號碼"
                v-model="account"
                name="email"
                :class="{ 'is-invalid': failed }"
              />
              <span v-if="failed" class="error-text">
                {{errors[0]}}
              </span>
            </div>
          </ValidationProvider >
        </div>
        <div class="error-msg">
          {{ errormsg }}
        </div>
        <div class="buttons">
          <button class="clear" @click.prevent="clearValue">清除重填</button>
          <button
            type="submit"
            class="confirm_send"
          >
            確認送出
          </button>
        </div>
      </form>
    </ValidationObserver>
    <Ismembered></Ismembered>
  </div>
</template>
<script>
import Ismembered from '../components/BaseDirectLogin.vue'
import { mapGetters, mapState } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  metaInfo: {
    title: '重發啟用信'
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    Ismembered
  },
  data () {
    return {
      account: '',
      title: '重發啟用信'
    }
  },
  methods: {
    clearValue: function () {
      const vm = this
      vm.account = ''
    },
    resendActive: function () {
      const vm = this
      const account = vm.account
      const captcha = vm.captcha
      vm.$store.dispatch('reSendActive', { account, captcha })
    }
  },
  computed: {
    ...mapGetters(['errormsg']),
    ...mapState(['errorAccount'])
  },
  destroyed () {
    const vm = this
    vm.$store.commit('CLEARERRORACCOUNT')
  }
}
</script>
<style scoped>
ul.steps {
  font-size: 15px;
  font-weight: 100;
  margin-bottom: 30px;
  padding-left: 1em;
}
ul.steps li {
  margin-bottom: 10px;
  word-break: break-all;
}
.input_field {
  margin-bottom: 20px;
}
.input_field label {
  font-size: 15px;
  font-weight: 100;
  color: #000;
  margin-bottom: 2px;
  width: auto;
  margin-right: 5px;
}
.input_field input {
  width: 100%;
  font-size: 12.5px;
  font-weight: 100;
  color: #000;
  padding: 5px 0 5px 5px;
}
.email_field {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  position: relative;
}
.email_field div {
  flex: 1;
}
.captcha_field {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}
.captcha_field>div {
  flex:1;
  display: flex;
  align-items: center;
  line-height: 1.5;
}
.captcha_field img {
  width: 80px;
  height: 20px;
  margin: 0 5px;
}
.captcha_field input {
  margin-right: 5px;
}
button.change-captcha {
  border: none;
  font-size: 12px;
  font-weight: 100;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
}
.input_block {
  position: relative;
  flex:1;
}
@media screen and (max-width: 767px) {
  .input_field label {
    width: 100%;
  }
  .input_field input {
    width: 100%;
  }
  .email_field {
    flex-wrap: wrap;
  }
  .captcha_field {
    flex-wrap: wrap;
  }
  .input_block {
    position: relative;
  }
  .buttons {
    padding-top: 10px;
  }
}
</style>
