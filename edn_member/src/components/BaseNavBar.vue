<template>
  <div class="navbar_component">
    <nav class="navbar" v-if="loginStatus">
      <div class="logo">
        <a href="https://money.udn.com/money/index">
          <img src="../assets/img/edn-logo.png" alt="edn_logo" />
        </a>
      </div>
      <Slide class="only_mobile burger-menu" right width="100" :closeOnNavigation="true">
        <div class="user_info">
          <div class="user_count">
            <span class="user_id">
              {{userinfo.name}}
              <!-- 尚未設定 -->
            </span>
            <span class="user_account" v-if="userinfo.email !== '尚未設定'">
              {{userinfo.email}}
              <!-- edn011422@udngroup.com -->
            </span>
            <span class="user_account" v-else>
              {{userinfo.email}}
            </span>
          </div>
        </div>
        <Sidebar></Sidebar>
      </Slide>
      <div
        v-if="isLogin"
        class="user_data only_web"
      >
        <p class="user_name" v-if="userinfo.email !== '尚未設定'">
         {{account}}
        </p>
        <p class="user_name" v-else>
          {{userinfo.phone}}
        </p>
        <button
          class="logout"
          @click.prevent="signOut"
        >登出</button>
      </div>
    </nav>
    <div class="notlogin_nav" v-if="!loginStatus">
      <div class="logo">
        <img src="../assets/img/udn_logo.jpg" alt="udn_logo" />
        <h3>經濟日報</h3>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import { mapGetters } from 'vuex'
import { Slide } from 'vue-burger-menu'
import Sidebar from '../components/BaseSidebar'
export default {
  components: {
    Slide,
    Sidebar
  },
  name: 'Navbar',
  data () {
    return {
      isLogin: true
    }
  },
  methods: {
    signOut: function (status) {
      const vm = this
      const confirmLogOut = confirm('確定要登出？')
      if (confirmLogOut) {
        vm.$store.dispatch('logOut', status)
      }
    }
  },
  computed: {
    ...mapGetters(['account', 'userinfo', 'loginStatus'])
  }
}
</script>

<style>
.navbar_component {
  position: sticky;
  top: 0px;
  background: #f9f9f9;
  z-index: 999;
  padding: 20px 85px 0px 80px;
}
nav.navbar {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  padding: 0;
}
.navbar-brand {
  background: transparent;
  box-shadow: none;
  width: 25%;
  padding: 0;
  font-size: 20px;
}
.logo {
  width: auto;
}
.logo a {
  display: block;
}
.logo img {
  width: 103px;
  height: auto;
  display: block;
}
.user_data {
  width: auto;
  text-align: right;
}
.user_name {
  display: inline-block;
  margin-bottom: 0;
  margin-right: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #7d7d7d;
}
.fixed-top {
  z-index: 999 !important;
}
.logout {
  color:#7d7d7d;
  font-size: 13px;
  font-weight: 300;
  border: none;
  background-color: transparent;
}
.logout:hover {
  color: #d72c1d;
}
.logout:focus {
  outline: none;
}
/* notlogin */
.notlogin_nav {
  width: 350px;
  margin: auto;
  padding-top: 60px;
}

.notlogin_nav .logo {
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.notlogin_nav .logo img {
  width: 36px;
  height: 36px;
  margin-right: 5px;
}
.notlogin_nav .logo h3 {
  color: #001655;
  margin-bottom: 0;
  font-size: 28px;
}

/* notlogin end*/
@media screen and (max-width: 1024px){
  .navbar_component {
    padding: 20px 20px 20px 20px;
  }
}
@media screen and (max-width: 1016px){
  .navbar_component {
    padding: 20px 20px 20px 10px;
  }
}
@media screen and (max-width: 767px) {
  .navbar_component {
    padding: 20px 0px;
  }
  nav.navbar {
    justify-content: space-around;
    flex-wrap: nowrap;
  }
  .menu {
    color: #c2c2c2;
    font-size: 25px;
    font-weight: normal;
  }
  .navbar-brand {
    background-color: transparent;
    margin-right: auto;
    width: auto;
  }
  .logo {
    width: 100%;
  }
  .logo img {
    width: 92px;
  }
  .notlogin_nav {
    width: 100%;
    padding-top: 30px;
  }
  .notlogin_nav .logo {
    margin: 0 auto;
  }

  /* burger-menu  */
  .logo + .burger-menu {
    width:50%;
  }
  .burger-menu {
    width: 100%;
    min-height: 100%;
    position: relative;
  }

  .bm-burger-button {
    right: 0!important;
    top: -10px!important;
    width: 20px!important;
    height: 20px!important;
  }
  .bm-burger-bars {
    background-color: #c2c2c2;
  }
  .bm-menu {
    padding-top: 20px!important;
  }
  .bm-cross-button {
    right: 0!important;
    top: 20px;
  }
  .user_info {
    align-items: center;
    border-bottom: 1px solid #7b7575;
  }
  .bm-item-list>* {
    padding: 0 10px 10px 15px!important;
  }
  .user_count {
    display: flex;
    flex-wrap: wrap;
  }
  .user_id {
    font-size: 18px;
    color: #000;
    width: 100%;
    line-height: 1;
    margin-bottom: 5px;
    min-height: 18px;
  }
  .user_account {
    font-size: 13px;
    color: #7b7575;
    line-height: 1;
  }
  .bm-cross-button::after {
    content:'';
    position: absolute;
    width: 25px;
    height: 25px;
    border: 2px solid #000;
    border-radius: 50%;
    left: -11px;
    top: -5px;
  }
  .bm-cross-button span.bm-cross {
    width: 2px!important;
    top: 2px;
    height: 10px!important;
    left: 1px;
  }
  .line-style {
    position: absolute;
    height: 10%!important;
    left: 0!important;
    right: 0!important;
    top:0%!important
  }
  .line-style:nth-child(1) {
    top: 30%!important;
  }
  .line-style:nth-child(2) {
    top: 60%!important;
  }
  .bm-item-list {
    margin-left: 0!important;
  }
}
</style>
