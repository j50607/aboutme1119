<template>
  <div class="phoneconfirm notlogin">
    <div class="resend_title">
      <h5>輸入簡訊驗證碼</h5>
      <span>請於下方輸入簡訊啟用碼，系統將寄送驗證碼至您的手機。</span>
    </div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form action="" class="form_field" @submit.prevent="handleSubmit(send(userAccount))">
        <div class="newsletter">
          <div class="phone_label">
            <label for="newsletter">{{userAccount.replace(/^(\d{4})\d{4}(\d+)/,"$1****$2") }}</label>
            <span class="counttimer" v-if="getPhoneCode">{{ count }}秒後重發簡訊認證碼</span>
            <span class="resend" @click="resendLetter()" v-else>重發簡訊認證碼</span>
          </div>
          <div class="input_field">
            <ValidationProvider
              v-slot="{ failed, errors }"
              name="newsletter"
              rules="required"
              tag="div"
            >
              <div class="input_block">
                <input
                  type="text"
                  id="newsletter_input"
                  name="newsletter"
                  :class="{ 'is-invalid': failed }"
                  placeholder="請輸入簡訊認證碼"
                  v-model="paramData.authcode"
                />
                <span class="error-text" v-if="failed">
                  {{ errors[0] }}
                </span>
              </div>
            </ValidationProvider>
          </div>
        </div>
        <div class="secure_field">
          <div class="secure_title">
            <h5>安全性問答設定</h5>
            <span
              >請於下方輸入安全提示問答，並妥善保管您的安全提示設定，於未來修改密碼時使用。</span
            >
          </div>
          <div class="secure">
            <div class="secure_label">
              <label for="secure_question">題目：</label>
              <ValidationProvider
                v-slot="{ failed, errors }"
                name="secure_question"
                rules="required"
                tag="div"
              >
                <div class="input_block">
                  <select
                    name="secure_question"
                    id="secure_question"
                    :class="{ 'is-invalid': failed }"
                    v-model="questionQ"
                    value="請選擇一個題目"
                  >
                    <option value="default">請選擇一個題目</option>
                    <option v-for="qes in question" :key="qes.index" :value="qes">
                      {{ qes }}
                    </option>
                  </select>
                  <span class="error-text" v-if="failed">
                    {{ errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </div>
            <div class="custom_question">
              <ValidationProvider
                v-slot="{ failed, errors}"
                name="custom_question"
                rules="required"
                tag="div"
                v-if="questionQ === '自訂'"
              >
                <div class="input_block">
                  <input type="text" id="custom_question" name="custom_question" :class="{'is-invalid' : failed}" v-model="paramData.question" placeholder="請輸入您自訂的題目">
                  <span class="error-text" v-if="failed">{{errors[0]}}</span>
                </div>
              </ValidationProvider>
            </div>
            <div class="input_field">
              <label for="secure_q_input">答案：</label>
              <ValidationProvider rules="required|specialTxt" v-slot="{failed, errors}" tag="div">
                <div class="input_block">
                  <input
                    type="text"
                    id="secure_q_input"
                    name="secure_input"
                    :class="{ 'is-invalid': failed }"
                    placeholder="請輸入您的回答"
                    v-model="paramData.answer"
                  />
                  <span class="error-text" v-if="failed">
                    {{ errors[0] }}
                  </span>
                </div>
              </ValidationProvider>
            </div>
          </div>
        </div>
        <div class="error-msg">
          {{ errormsg }}
        </div>
        <button class="confirm_send">
          送出
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      question: [],
      questionQ: 'default',
      customQ: '',
      paramData: {
        question: '',
        answer: '',
        authcode: ''
      },
      count: 20
    }
  },
  computed: {
    ...mapGetters(['errormsg']),
    ...mapState(['userAccount', 'getPhoneCode'])
  },
  methods: {
    send: function (phone) {
      const vm = this
      if (vm.questionQ !== '自訂') vm.paramData.question = vm.questionQ
      const sendData = {
        question: vm.paramData.question,
        answer: vm.paramData.answer,
        authcode: vm.paramData.authcode
      }
      // console.log(sendData)
      vm.$store.dispatch('phoneVerification', sendData)
    },
    resendLetter: function () {
      const vm = this
      vm.$store.dispatch('sendVerificationCode').then(function () {
        vm.countDownTimer()
      })
    },
    countDownTimer () {
      const vm = this
      if (vm.getPhoneCode && vm.count > 0) {
        setTimeout(() => {
          vm.count -= 1
          if (vm.count === 0) {
            vm.$store.commit('GETPHONECODE', false)
            vm.count = 20
          }
          vm.countDownTimer()
        }, 1000)
      } else {
      }
    },
    getSecureQuestion: function () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/security/defaultList`
      vm.$http.get(api).then(res => {
        if (res.data.success) {
          console.log('取得安全性問答題目', res)
          vm.question = res.data.data.question
        } else {
          console.log('安全性問答題目取得失敗')
        }
      })
    }
  },
  created () {
    const vm = this
    vm.getSecureQuestion()
    vm.$store.commit('GETPHONECODE', false)
  },
  destroyed () {
    document.cookie = 'pVerification=;expires=' + (new Date(0)).toGMTString()
  }
}
</script>
<style scoped>
.resend_title,
.secure_title {
  margin-bottom: 20px;
}
.input_block {
  position: relative;
}
select + .error-text {
  display: block;
}
h5 + span {
  font-size: 15px;
  font-weight: 300;
}
.newsletter {
  display: flex;
  align-items: center;
  margin-bottom: 60px;
}
.phone_label {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 70%;
  margin-right: 20px;
}
.form_field label {
  margin: 0;
  font-size: 15px;
  width: 100%;
  text-align: center;
}
.form_field input {
    font-size: 16px;
    padding: 5px 10px;
    font-weight: 100;
}
.phone_label span.resend {
  font-size: 12px;
  font-weight: 100;
  cursor: pointer;
  text-decoration: underline;
  width: 100%;
  text-align: center;
}
.phone_label span.counttimer {
  font-size: 12px;
  font-weight: 100;
  width: 100%;
  text-align: center;
}
.secure_field {
    margin-bottom: 20px;
}
.secure_label {
  margin-bottom: 15px;
}
.secure_label, .input_field {
  display: flex;
  align-items: center;

}
.secure_label label, .input_field label{
  width: auto;
  margin-right: 3px;
}
.secure_label label + div, .input_field label + div {
  flex:1;
}
.secure_label select {
    padding: 2px 5px;
}
.secure_label option {
    background-color: #fff;
    border: 1px solid #a5a5a5;
    border-radius: 3px;
    line-height: 30px;
    color: #acacac;
}
.custom_question {
  width: calc(100% - 48px);
  margin-left: auto;
  margin-bottom: 15px;
}
@media screen and (max-width: 767px) {
    .newsletter {
        flex-wrap: wrap;
        margin-bottom: 40px;
    }
    .phone_label, .secure_label {
        width: 100%;
        flex-wrap: nowrap;
        margin-right: 0;
        margin-bottom: 15px;
    }
    .input_field {
        width: 100%;
    }
    .secure_field {
        margin-bottom: 40px;
    }
    .secure {
        flex-wrap: wrap;
    }
}
</style>
