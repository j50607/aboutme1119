<template>
  <div class="notlogin getpwd">
    <div class="getpwd-title">
      <h5>忘記密碼？</h5>
    </div>
    <ul class="steps">
      <li>
        請輸入您註冊時填寫的E-mail或手機號碼，及頁面驗證碼。
      </li>
      <li>
        若您以手機號碼找回密碼，您將會收到簡訊驗證碼，請於下一頁回填。
      </li>
      <li>
        若您以E-mail找回密碼，您將會收到一封「重設密碼通知函」，請依E-mail指示重設密碼。
      </li>
    </ul>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="input_field" @submit.prevent="handleSubmit(sendGetPwd)">
        <div class="email_field">
          <label for="emailInput">手機號碼 / E-mail</label>
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
                placeholder="請輸入手機號碼或E-mail"
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
        <!-- <div class="captcha_field">
          <label for="captcha-input">請輸入驗證碼</label>
          <ValidationProvider v-slot="{ failed, errors }"
            name="captcha"
            rules="required"
            tag="div">
            <div class="input_block">
              <input
                type="text"
                name="captcha"
                id="captcha-input"
                placeholder="請輸入驗證碼"
                v-model="captcha"
                :class="{ 'is-invalid': failed }"
              />
              <span class="error-text" v-if="failed">
                {{errors[0]}}
              </span>
            </div>
            <img :src="captchaurl" alt="captcha_img" />
            <button class="change-captcha" @click.prevent="getCaptcha()">
              更換驗證碼
            </button>
          </ValidationProvider>
        </div> -->
        <div class="error-msg">
          {{ errormsg }}
        </div>
        <div class="buttons">
          <button class="clear" @click.prevent="clearValue">清除重填</button>
          <button
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
import Ismembered from '../components/BaseDirectLogin'
import { mapGetters } from 'vuex'
export default {
  metaInfo: {
    title: '忘記密碼'
  },
  components: {
    Ismembered
  },
  data () {
    return {
      account: ''
    }
  },
  methods: {
    onCaptchaExpired: function () {
      const vm = this
      vm.$refs.recaptcha.reset()
    },
    sendGetPwd: function () {
      const vm = this
      const account = vm.account
      const captcha = vm.captcha
      vm.$store.dispatch('getPWD', { account, captcha })
    },
    clearValue: function () {
      const vm = this
      vm.account = ''
    }
  },
  computed: {
    ...mapGetters(['errormsg'])
  }
}
</script>
<style scoped>
  ul.steps {
    font-size: 15px;
    font-weight: 100;
    word-break: break-all;
    margin-bottom: 30px;
    padding-left: 1em;
  }
  ul.steps li {
    margin-bottom: 10px;
  }
  .input_field {
    margin-bottom: 20px;
  }
  .input_field label{
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
  .email_field>div {
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
    justify-content: flex-start;
    align-items: center;
    line-height: 1.5;
  }
  .captcha_field img {
    width: 80px;
    height: 20px;
    margin: 0 5px;
  }
  .input_block {
    position: relative;
    flex:1;
  }

  button.change-captcha {
    border: none;
    font-size: 12px;
    background-color: transparent;
    font-weight: 100;
    cursor: pointer;
    padding: 0;
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
}
</style>
