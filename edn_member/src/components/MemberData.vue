<template>
  <div>
    <div class="remain_data">
      <div class="first">
        <h6 class="title">
          我的資料
        </h6>
        <div class="musthave">(<span class="symbol">*</span>為必填)</div>
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form class="form_field" @submit.prevent="handleSubmit(updateData)">
          <div class="data_part1">
            <div class="name_field">
              <div class="name">
                <span>姓名</span>
                <span class="symbol">*</span>
              </div>
              <div class="name_input">
                <ValidationProvider
                  v-slot="{ failed, errors }"
                  name="name"
                  rules="required|max:32|min:2"
                  tag="div"
                >
                  <input
                    type="text"
                    v-model="userData.name"
                    placeholder="尚未設定"
                    name="name"
                    :class="{ 'is-invalid': failed }"
                  />
                  <span class="error-text" v-if="failed">
                    {{ errors[0] }}
                  </span>
                </ValidationProvider>
              </div>
              <div class="gender">
                <div class="male">
                  <input
                    id="male"
                    v-model="userData.sex"
                    type="radio"
                    name="gender"
                    value="1"
                  />
                  <span />
                  <label for="male">先生</label>
                </div>
                <div class="female">
                  <input
                    id="female"
                    v-model="userData.sex"
                    type="radio"
                    name="gender"
                    value="2"
                  />
                  <span />
                  <label for="female">小姐</label>
                </div>
              </div>
            </div>
            <div class="birthday_field">
              <div class="birthday">
                <span>生日</span>
              </div>
              <div class="bth_select_year">
                <select id="bth_year" name="bth_year" v-model="userBY">
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}年
                  </option>
                </select>
              </div>
              <div class="bth_select_month">
                <select id="bth_month" name="bth_month" v-model="userBM">
                  <option value="01">
                    1月
                  </option>
                  <option value="02">
                    2月
                  </option>
                  <option value="03">
                    3月
                  </option>
                  <option value="04">
                    4月
                  </option>
                  <option value="05">
                    5月
                  </option>
                  <option value="06">
                    6月
                  </option>
                  <option value="07">
                    7月
                  </option>
                  <option value="08">
                    8月
                  </option>
                  <option value="09">
                    9月
                  </option>
                  <option value="10">
                    10月
                  </option>
                  <option value="11">
                    11月
                  </option>
                  <option value="12">
                    12月
                  </option>
                </select>
              </div>
              <div class="bth_select_day">
                <select id="bth_day" name="bth_day" v-model="userBD">
                  <option value="01">
                    1日
                  </option>
                  <option value="02">
                    2日
                  </option>
                  <option value="03">
                    3日
                  </option>
                  <option value="04">
                    4日
                  </option>
                  <option value="05">
                    5日
                  </option>
                  <option value="06">
                    6日
                  </option>
                  <option value="07">
                    7日
                  </option>
                  <option value="08">
                    8日
                  </option>
                  <option value="09">
                    9日
                  </option>
                  <option value="10">
                    10日
                  </option>
                  <option value="11">
                    11日
                  </option>
                  <option value="12">
                    12日
                  </option>
                  <option value="13">
                    13日
                  </option>
                  <option value="14">
                    14日
                  </option>
                  <option value="15">
                    15日
                  </option>
                  <option value="16">
                    16日
                  </option>
                  <option value="17">
                    17日
                  </option>
                  <option value="18">
                    18日
                  </option>
                  <option value="19">
                    19日
                  </option>
                  <option value="20">
                    20日
                  </option>
                  <option value="21">
                    21日
                  </option>
                  <option value="22">
                    22日
                  </option>
                  <option value="23">
                    23日
                  </option>
                  <option value="24">
                    24日
                  </option>
                  <option value="25">
                    25日
                  </option>
                  <option value="26">
                    26日
                  </option>
                  <option value="27">
                    27日
                  </option>
                  <option value="28">
                    28日
                  </option>
                  <option value="29">
                    29日
                  </option>
                  <option value="30">
                    30日
                  </option>
                  <option value="31">
                    31日
                  </option>
                </select>
              </div>
            </div>
            <div class="cellphone_field">
              <div class="cellphone">
                <span class="">手機</span>
                <span class="symbol" v-if="userinfo.phone">*</span>
              </div>
              <ValidationProvider
                :rules="userData.phone ? { required: true, regex: /^[09]{2}[0-9]{8}$/ } : 'none'"
                v-slot="{ failed, errors }"
                tag="div"
                style="flex:1;"
                name="cellphone"
              >
                <div class="cellphone_input">
                  <input
                    v-model="userData.phone"
                    type="text"
                    placeholder="更新手機資料以完成驗證"
                    :class="{ 'is-invalid': failed }"
                    name="cellphone"
                  />
                  <span class="error-text" v-if="failed">
                    {{ errors[0] }}
                  </span>
                  <div class="actived" :class="{'account-invalid': failed && userinfo.phone_active === 'N' || userinfo.phone === ''}">
                    <img src="../assets/img/vertification.png" alt="已認證圖片" v-if="userinfo.phone_active === 'Y'" class="actived_img">
                    <img src="../assets/img/unvertification.png" alt="未認證圖片" class="actived_img" v-else>
                    <span @click="verticate(userinfo.phone_active === 'Y', 'phone')">
                      {{ userinfo.phone_active === "Y" ? "已" : "未" }}認證
                    </span>
                  </div>
                </div>
              </ValidationProvider>
            </div>
            <div class="phone_field">
              <div class="phone">
                <span class="">市話</span>
              </div>
              <div class="phone_select">
                <select
                  id="area_code"
                  v-model="userData.telzyd"
                  name="area_code"
                >
                  <option value="區碼">
                    區碼
                  </option>
                  <option value="02">
                    02
                  </option>
                  <option value="03">
                    03
                  </option>
                  <option value="037">
                    037
                  </option>
                  <option value="04">
                    04
                  </option>
                  <option value="049">
                    049
                  </option>
                  <option value="05">
                    05
                  </option>
                  <option value="06">
                    06
                  </option>
                  <option value="07">
                    07
                  </option>
                  <option value="08">
                    08
                  </option>
                  <option value="089">
                    089
                  </option>
                  <option value="082">
                    082
                  </option>
                  <option value="0826">
                    0826
                  </option>
                  <option value="0836">
                    0836
                  </option>
                </select>
              </div>
              <div class="phone_input">
                <input v-model="userData.tel" type="text" />
              </div>
              <div class="extension">
                <span>分機</span>
              </div>
              <div class="extension_input">
                <ValidationProvider
                  rules="max:6"
                  v-slot="{ failed, errors }"
                  tag="div"
                  name="ext"
                >
                  <input
                    v-model="userData.ext"
                    type="text"
                    name="ext"
                    :class="{ 'is-invalid': failed }"
                  />
                  <span class="error-text" v-if="failed">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="data_part2">
            <div class="address_field">
              <div class="address">
                <span>地址</span>
              </div>
              <div class="address_input">
                <ValidationProvider
                  rules="min:9"
                  v-slot="{ failed, errors }"
                  tag="div"
                  style="flex:1;"
                  name="addr"
                >
                  <input
                    v-model="userData.addr"
                    type="text"
                    name="addr"
                    :class="{ 'is-invalid': failed }"
                  />
                  <span class="error-text" v-if="failed">
                    {{ errors[0] }}
                  </span>
                </ValidationProvider>
              </div>
            </div>
            <div class="lastfield">
              <div class="email_field">
                <div class="email">
                  <span class="">E-mail</span>
                  <span class="symbol" v-if="userinfo.email">*</span>
                </div>
                <ValidationProvider
                  :rules="userData.email ? 'required|email' : 'none'"
                  v-slot="{ failed, errors }"
                  tag="div"
                  name="email"
                  style="flex:1"
                >
                  <div class="email_input">
                    <input
                      v-model="userData.email"
                      type="text"
                      name="email"
                      placeholder="更新E-mail資料以完成驗證"
                      :class="{ 'is-invalid': failed }"
                    />
                    <span class="error-text" v-if="failed">{{
                      errors[0]
                    }}</span>
                    <div class="actived" :class="{'account-invalid': failed && userinfo.email_active === 'N' || userinfo.email === ''}">
                      <img src="../assets/img/vertification.png" alt="已認證圖片" v-if="userinfo.email_active === 'Y'" class="actived_img">
                    <img src="../assets/img/unvertification.png" alt="未認證圖片" class="actived_img" v-else>
                      <span @click="verticate(userinfo.email_active === 'Y', 'email')">
                        {{ userinfo.email_active === "Y" ? "已" : "未" }}認證
                      </span>
                    </div>
                  </div>
                </ValidationProvider>
              </div>
              <div class="confirm_button">
                <button class="confirm" type="submit">
                  更新資料
                </button>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <div id="modify_password" class="modify_password">
      <div class="first">
        <h6 class="title">
          修改密碼
        </h6>
        <span
          >請確認會員帳號，我們將發送重設密碼通知函／簡訊給您，請依照指示重設密碼，若重複收到，請以最新的為主。</span
        >
      </div>
      <div class="email_data">
        <p>帳號</p>
        <span>
          {{bottomAccount}}
        </span>
        <div class="confirm_button">
          <button class="confirm" @click.prevent="modifyPwd">
            確認送出
          </button>
        </div>
      </div>
    </div>
    <div class="account_setting">
      <div class="first">
        <h6 class="title">
          帳號設定
        </h6>
        <span>完成綁定後即可直接使用FB帳號登入</span>
      </div>
      <div class="other_platform">
        <div class="l_facebook">
          <button
            class="bind"
            v-if="userinfo.facebook_bind === 'N'"
            @click="bind"
          >
            <i class="fab fa-facebook-square icon" />
            立即綁定
          </button>
          <button class="unbind" @click="unbind" v-else>
            <i class="fab fa-facebook-square icon" />
            解除綁定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* global FB */
import { mapGetters, mapState } from 'vuex'
export default {
  metaInfo: {
    title: '維護個人資料'
  },
  name: 'mb_data',
  data () {
    return {
      userData: {
        name: '',
        email: '',
        sex: '',
        birthday: '',
        phone: '',
        tel: '',
        telzyd: '',
        ext: '',
        addr: ''
      },
      years: [],
      paramData: {},
      userBY: '',
      userBM: '',
      userBD: ''
    }
  },
  computed: {
    userBirthday: function () {
      const vm = this
      vm.userData.birthday = vm.userBY + vm.userBM + vm.userBD
      return vm.userBY + vm.userBM + vm.userBD
    },
    ...mapGetters(['userinfo']),
    ...mapState(['bottomAccount', 'isApp'])
  },
  methods: {
    getData: function () {
      const vm = this
      vm.$store.dispatch('getUserData').then(function () {
      })
    },
    updateData: function () {
      const vm = this
      const isUpdatePhone = vm.userinfo.phone !== vm.userData.phone
      const isUpdateEmail = vm.userinfo.email !== vm.userData.email

      if (isUpdateEmail) {
        var modifyEmailConfirm = confirm('修改後需重新驗證並重新登入方可生效，確定要修改嗎？')
      } else if (isUpdatePhone) {
        var modifyPhoneConfirm = confirm('確定以此手機號碼進行簡訊驗證嗎？')
      } else {
        var confirmDataCorrect = confirm('確定資料無誤?')
      }
      if (modifyEmailConfirm || modifyPhoneConfirm || confirmDataCorrect) {
        vm.userData.birthday = vm.userBY + vm.userBM + vm.userBD

        // 更新資料的參數只帶有值的，故需先過濾資料
        var keys = Object.keys(vm.userData)
        var values = Object.values(vm.userData)
        var hasValue = [] // userData中有的值
        var hasValIndex = [] // userData中有值的位置
        var hasValKeys = [] // userData中有值的屬性名
        // 取得有值的value的位置，塞進hasValIndex陣列裡
        // 取得不為空值與null的值，塞進hasValue陣列裡
        values.forEach(function (item, index) {
          if (item !== '' && item !== null) {
            hasValIndex.push(index)
            hasValue.push(item)
          }
        })
        // 取得有值的key 並塞進hasValKeys陣列裡
        for (var i = 0; i < hasValIndex.length; i++) {
          hasValKeys.push(keys[hasValIndex[i]])
        }
        // 將有值的Key and Value 塞進要更新資料API的參數(paramData)裡
        for (var j = 0; j < hasValKeys.length; j++) {
          vm.paramData[hasValKeys[j]] = hasValue[j]
        }
        const updateData = vm.paramData
        vm.$store.dispatch('updateUserData', { updateData, modifyEmailConfirm, modifyPhoneConfirm })
      }
    },
    modifyPwd: function () {
      const vm = this
      var api = vm.bottomAccount.indexOf('@') > -1 ? `${process.env.VUE_APP_API}/member/resetPassword` : `${process.env.VUE_APP_API}/member/resetPassword/authPhone`
      var confirmModifyPwd = confirm('確定要修改密碼?')
      if (confirmModifyPwd && vm.bottomAccount.indexOf('@') > -1) {
        vm.$http
          .post(api, {
            email: vm.bottomAccount
          })
          .then(res => {
            if (res.data.success) {
              console.log('重設密碼成功', res)
              alert(`重設密碼確認信已寄至您的信箱：${vm.bottomAccount}`)
            } else {
              alert('重設密碼失敗', res.data.message.split('::')[1])
              console.log('重設密碼失敗', res)
            }
          })
      } else if (confirmModifyPwd && vm.bottomAccount.indexOf('@') === -1) {
        vm.$http.post(api).then(res => {
          if (res.data.success) {
            console.log('手機重設密碼成功', res)
            alert(`重設密碼之驗證碼已寄至您的手機:${vm.bottomAccount}`)
            window.open(res.data.data.redirecturl)
          } else {
            alert('手機重設密碼失敗', res.data.message.split('::')[1])
            console.log('重設密碼失敗', res)
          }
        })
      }
    },
    getBirthdayYear: function () {
      const vm = this
      var year = new Date().getFullYear()
      for (var i = 0; i < 101; i++) {
        vm.years.push(Number(year - i))
      }
    },
    unbind: function () {
      const vm = this
      var confirmUnbind = confirm('解除綁定後，系統將會自動登出，請再次確認是否解除綁定。')
      if (confirmUnbind) {
        vm.$store.dispatch('unbindFbAccount')
      }
    },
    bind: function () {
      const vm = this
      FB.getLoginStatus(function (res) {
        // 判斷若已登入FB狀態，直接打FbLogin API
        if (res.authResponse) {
          FB.api('/me?fields=name,id,email,token_for_business', function (response) {
            console.log('取得FB使用者資料', response)
            vm.$store.dispatch('storefbdata', response).then(function () {
              vm.$store.dispatch('bindFbAccount', res.authResponse.accessToken)
            })
          })
        } else {
          // 若未登入FB狀態，導頁到FB登入頁並記錄cookie。
          const expireTime = new Date().getTime() + 1000 * 60 * 30
          document.cookie =
            'bindRedirect=Y;expires=' + new Date(expireTime).toGMTString()
          top.location = vm.isApp ? `https://www.facebook.com/v7.0/dialog/oauth?response_type=code,token&client_id=253554794800658&redirect_uri=${process.env.VUE_APP_FBREDIRECT}/member/mb_data?app=y&scope=email` : `https://www.facebook.com/v7.0/dialog/oauth?response_type=code,token&client_id=253554794800658&redirect_uri=${process.env.VUE_APP_FBREDIRECT}/member/mb_data&scope=email`
        }
      }, true)
    },
    verticate: function (isActive, phoneOrEmail) {
      const vm = this
      var api
      var confirmCertification
      if (isActive) {
        return false
      } else {
        // email進行認證
        if (phoneOrEmail === 'email') {
          confirmCertification = confirm('前往認證信箱？系統將會發送認證信函至您的信箱，並將您登出，請前往收信以完成認證動作')
          if (confirmCertification) {
            api = `${process.env.VUE_APP_API}/user/resendActive`
            vm.$http.post(api, { email: vm.userinfo.email }).then(res => {
              if (res.data.success) {
                console.log('email認證信成功', res)
                alert(`認證信函已寄至您的信箱：${vm.userinfo.email}`)
                vm.$store.dispatch('logOut')
              } else {
                console.log('email認證失敗', res)
              }
            })
          }
        // 手機進行認證
        } else {
          confirmCertification = confirm('確定以此手機號碼進行簡訊驗證嗎？系統將會發送認證簡訊，請於下一頁輸入簡訊驗證碼以完成認證')
          if (confirmCertification) {
            api = `${process.env.VUE_APP_API}/member/authPhone`
            vm.$http.post(api).then(res => {
              if (res.data.success) {
                console.log('手機發送認證簡訊成功', res)
                const expireTime = new Date().getTime() + 1000 * 60 * 30
                document.cookie =
                'pVerification=Y;expires=' + new Date(expireTime).toGMTString()
                vm.$store.commit('STOREACCOUNT', vm.userinfo.phone)
                vm.$router.push('/mb_pverification')
              } else {
                console.log('手機發送認證簡訊失敗', res)
                alert('手機認證失敗')
              }
            })
          }
        }
      }
    },
    getProfile: function () {
      const vm = this
      FB.api('/me?fields=name,id,email,token_for_business', function (res) {
        console.log('取得FB使用者資料', res)
        vm.$store.dispatch('storefbdata', res)
      })
    },
    getUserData: function () {
      const vm = this
      vm.$store.dispatch('getUserData').then(function () {
        vm.userData = JSON.parse(JSON.stringify(vm.userinfo))
        vm.userBY = vm.userinfo.birthday.y
        vm.userBM = vm.userinfo.birthday.m
        vm.userBD = vm.userinfo.birthday.d
        delete vm.userData.email_active
        delete vm.userData.facebook_bind
        delete vm.userData.money_active
        delete vm.userData.phone_active
        delete vm.userData.status
      })
    }
  },
  created () {
    const vm = this
    vm.getBirthdayYear()
    vm.getUserData()
  }
}
</script>

<style scoped>
input {
  line-height: 1;
}
input::placeholder {
  font-size: 14px;
}
.remain_data {
  margin-bottom: 40px;
}
.first:first-child {
  margin-bottom: 10px;
  display: flex;
}
.data_part1 {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}
/* name_field */
.name_field {
  width: 40%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #acacac;
  padding-right: 20px;
}
.name,
.birthday,
.cellphone,
.phone,
.address {
  width: 36px;
  margin-right: 12px;
  font-size: 15px;
  font-weight: 300;
  color: #000;
}
.name_input {
  margin-right: 5px;
  width: 130px;
  flex: 1;
  position: relative;
}
.name_input input {
  width: 100%;
  font-size: 16px;
  padding: 5px 10px;
  background: #fff;
  font-weight: 300;
}
.gender {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  align-self: end;
}
.gender .female,
.gender .male {
  position: relative;
  width: auto;
  color: #000;
}

.gender span {
  position: absolute;
  left: 3px;
  bottom: 0px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #dbdbdb;
  margin: 0;
  cursor: pointer;
  background-color: #fff;
}
.gender input {
  width: 20px;
  height: 20px;
  opacity: 0;
  z-index: 2;
  position: relative;
  top: 10px;
  cursor: pointer;
  background: #fff;
}
.gender label[for="male"],
.gender label[for="female"] {
  width: auto;
  position: relative;
  display: inline-block;
  top: 5px;
  font-size: 13px;
  font-weight: 3;
  margin: 0;
  cursor: pointer;
}
.gender input#male:checked + span::after,
.gender input#female:checked + span::after {
  position: absolute;
  content: "";
  width: 5px;
  height: 5px;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  border-radius: 50%;
  background: #c2c2c2;
}

/* birthday_field */
.birthday_field {
  width: 40%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: auto;
  margin-bottom: 20px;
}
.bth_select_year {
  width: 120px;
  flex: 1;
}
.bth_select_month {
  margin: 0 10px;
  width: 75px;
}
.bth_select_day {
  width: 75px;
}
.birthday_field select {
  padding: 2px 10px;
}

option {
  background-color: #fff;
  border: 1px solid #a5a5a5;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  line-height: 30px;
  color: #acacac;
}

/* cellphone_field */
.cellphone_field {
  width: 40%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  padding-right: 20px;
}
.cellphone_input {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.cellphone_input input {
  width: 70%;
  font-size: 16px;
  font-weight: 300;
  padding: 5px 10px;
  background-color: #fff;
  flex:1;
}
.cellphone_input .error-text {
  bottom: -100%;
  right: 75px;
}
.actived {
  width: auto;
  margin-left: 5px;
  font-size: 12px;
  cursor: pointer;
  color: #000;
  display: flex;
  align-items: center;
}
.actived_img {
  width: 18px;
  height: 18px;
  margin: 3px;
}
.phone_field {
  width: 40%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: auto;
  margin-bottom: 20px;
}
.phone_select {
  width: 65px;
  margin-right: 10px;
}
.phone_select select {
  padding: 2px 5px;
}
.phone_input {
  flex: 1;
}
.extension_input {
  width: 60px;
  position: relative;
}
.account-invalid {
  color: #ccc;
  cursor: auto;
}
.account-invalid:before {
  content: '';
  width: 70px;
  height: 100%;
  position: absolute;
  top: 0;
}
.phone_input input,
.extension_input input {
  width: 100%;
  padding: 5px 10px;
  background: #fff;
  font-size: 13px;
}

.extension_input input {
  padding: 5px 0px;
  text-align: center;
}
.extension {
  width: 28px;
  font-size: 13px;
  font-weight: 300;
  color: #000;
  margin: 0 5px;
  align-self: flex-end;
}
/* data_part2 */
.data_part2 {
  width: 100%;
}
.address_field {
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  color: #acacac;
}
.address_field input {
  width: 100%;
  font-size: 15px;
  padding: 5px 10px;
  background-color: #fff;
  font-weight: 300;
}
.email {
  width: auto;
  margin-right: 12px;
  font-size: 15px;
  font-weight: 200;
  color: #000;
}
.email_field {
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  color: #acacac;
}
.email_input {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
}
.email_input .error-text {
  bottom: -100%;
  right: 75px;
}
.address_input {
  flex: 1;
  position: relative;
}

.email_field input {
  width: 80%;
  font-size: 16px;
  font-weight: 300;
  padding: 5px 10px;
  background-color: #fff;
  flex: 1;
}
.lastfield {
  display: flex;
}
.description {
  font-size: 15px;
  font-weight: 100;
  color: #000;
  margin-bottom: 10px;
  line-height: 1;
}
.description .notice {
  color: #d72c1d;
}
.desc_form {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.confirm_button {
  margin-left: auto;
}
.confirm {
  width: 128px;
  height: 27px;
  background: #d72c1d;
  color: #f9f9f9;
  padding: 3px 30px;
  border: none;
  border-radius: 3px;
  margin-left: auto;
  font-size: 15px;
}
.confirm:hover {
  background: #ee4e3f;
}

/* 修改密碼 */
.modify_password {
  margin-bottom: 40px;
}
.modify_password .first {
  width: 80%;
  display: block;
}
.modify_password .first h6 {
  margin-bottom: 10px;
}
.modify_password .first span {
  color: #000;
  font-size: 15px;
  font-weight: 100;
  line-height: 1;
}
.email_data {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  align-items: center;
}
.email_data p {
  width: auto;
  margin: 0 10px 0 0;
  color: #000;
  font-size: 15px;
  font-weight: 100;
}
.email_data span {
  color: #7d7d7d;
  font-size: 15px;
  font-family: "Montserrat ExtraLight";
}
.vertification {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.vertification span {
  width: auto;
  margin-right: 10px;
  color: #000;
  font-size: 15px;
  font-weight: 300;
}
.vertification input {
  width: 105px;
  margin-right: 10px;
  padding: 5px 10px;
  font-size: 16px;
  background-color: #fff;
}
.captcha {
  display: flex;
  align-items: flex-end;
  width: auto;
  justify-content: flex-start;
  width: 40%;
  height: 25px;
}
.captcha_img {
  align-self: center;
  width: 60px;
  height: 20px;
  margin-right: 5px;
}
span.captcha_reload {
  width: auto;
  display: block;
  font-size: 13px;
  font-weight: 100;
  color: #000;
  margin-right: 0;
  cursor: pointer;
}

/* 帳號設定  */
.account_setting .first {
  display: block;
}
.account_setting span {
  color: #000;
  font-size: 15px;
  font-weight: 100;
  line-height: 1;
}

.other_platform {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
button.unbind,
button.bind {
  border: 1px solid #c2c2c2;
  padding: 5px 0px;
  border-radius: 3px;
  margin-right: 3px;
  background-color: #f9f9f9;
  color: #636363;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 210px;
  height: 40px;
}

button.unbind:hover,
button.bind:hover {
  background-color: #f1f1f1;
}
.icon {
  font-size: 30px;
  margin-right: 8px;
}
.fa-facebook-square {
  color: #3c5a99;
}
.fa-google {
  color: #fa0;
}
/* validate */
.required {
  color: #d72c1d;
  font-size: 8px;
  line-height: 1;
}
.required input {
  border: 1px solid #d72c1d;
}
.passed input {
  border: 1px solid #dbdbdb;
}
/* mpdal */
.modal-footer {
  border: none;
  font-weight: 300;
}
.btn-secondary {
  background-color: #fff;
  color: #007bff;
  border: 1px solid #c2c2c2;
}
@media screen and (max-width: 1023px) and (min-width: 768px) {
  .name_field,
  .cellphone_field {
    padding-right: 10px;
    width: 45%;
  }
  .birthday_field,
  .phone_field {
    width: 53%;
  }
  .phone_select {
    width: 50px;
  }
  .address_field,
  .email_field {
    width: 98%;
  }
  .actived {
    width: 72px;
  }
  .name,
  .birthday,
  .cellphone,
  .phone,
  .address,
  .email {
    margin-right: 10px;
  }
  .extension {
    margin: 0 2px;
  }
  .extension span {
    font-size: 10px;
  }
  .confirm {
    width: 80px;
    font-size: 12px;
    padding: 3px 5px;
  }
  .true_name_field {
    padding-right: 10px;
  }
  .true_id_field {
    padding-right: 10px;
  }
  .true_name_field span,
  .true_id_field span,
  .true_cell_field span,
  .true_address_field span {
    margin-right: 5px;
  }
}
@media screen and (max-width: 767px) {
  .first {
    margin-bottom: 20px !important;
    width: 100%;
  }
  .data_part1 {
    width: 100%;
    margin-bottom: 0px;
    flex-direction: column;
  }
  .data_part2 {
    width: 100%;
    flex-direction: column;
  }
  .name,
  .birthday,
  .cellphone,
  .phone,
  .address,
  .email {
    margin-right: 10px;
  }
  .name_field,
  .birthday_field,
  .cellphone_field,
  .phone_field {
    width: 100%;
    padding-right: 0;
    margin-bottom: 17px;
  }
  .birthday_field select {
    padding: 2px 5px;
  }
  .bth_select_year {
    width: 120px;
    flex: 1;
  }
  .bth_select_day {
    width: 25%;
  }
  .bth_select_month {
    margin: 0 5px;
    width: 25%;
  }
  .phone_field {
    flex-wrap: wrap;
    align-items: center;
  }
  .phone_select {
    width: 80px;
  }
  .phone_input {
    width: calc(100% - 136px);
    flex: none;
  }
  .extension {
    width: auto;
    margin: 0 10px 0 auto;
  }
  .extension span {
    padding-top: 6px;
    font-size: 15px;
  }
  .extension_input {
    padding-top: 6px;
    width: calc(100% - 136px);
  }
  .phone_input input,
  .extension_input input {
    padding: 5px;
    text-align: left;
  }
  .address_field {
    width: 100%;
    margin-bottom: 17px;
  }
  .stock_field {
    flex-direction: column;
  }
  .email_field {
    width: 100%;
    padding-right: 0;
    margin-bottom: 30px;
  }
  .lastfield {
  display: block;
}
  .usestock {
    width: 100%;
  }
  #useStockService {
    margin-right: 3px;
  }
  .usestock label[for="useStockService"] {
    padding-left: 3px;
  }
  .usestock input + label span {
    left: -15px;
    top: 0;
  }
  .fa-check {
    left: -13px;
  }
  .desc_form {
    flex-direction: column;
  }
  .modify_password .first {
    width: 100%;
  }
  .vertification {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .vertification span {
    width: auto;
    margin-right: 3px;
    font-size: 12px;
  }
  .vertification input {
    width: 20%;
    flex: 1;
    margin-right: 3px;
  }
  .captcha {
    width: auto;
  }
  .vertification .captcha_reload {
    font-size: 10px;
    margin-right: 0;
  }
  .captcha_img {
    margin-right: 3px;
  }
  .confirm_button {
    width: 100%;
    margin-top: 15px;
  }
  .confirm_button button {
    width: 100%;
  }
  .other_platform {
    flex-direction: row;
  }
  .email_data {
    display: block;
  }
  .unbind {
    width: 100%;
    margin-right: 0;
  }
  .error-text {
    top: 100%;
    transform: translateY(0);
  }
  .other_platform {
    flex-wrap: wrap;
  }
  .other_platform a {
    width: 100%;
  }
  .l_facebook {
    width: 100%;
  }
  button.unbind,
  button.bind {
    width: 100%;
  }
}
</style>
