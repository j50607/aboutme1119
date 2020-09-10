<template>
  <nav class="sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item">
          <h6 class="nav-link font-weight-bold">會員資料</h6>
          <ul class="flex-column">
            <li class="">
              <router-link class="link" to="/mb_data"
                >我的資料</router-link
              >
            </li>
          </ul>
        </li>
        <!-- <li class="nav-item">
          <h6 class="nav-link font-weight-bold">我的新聞</h6>
          <ul class="flex-column">
            <li class="">
              <router-link class="link" to="/mb_collect/fav_article"
                >新聞收藏</router-link
              >
            </li>
            <li class="">
              <router-link class="link" to="/mb_keyword"
                >我的追蹤</router-link
              >
            </li>
          </ul>
        </li> -->
        <!-- <li class="nav-item">
          <h6 class="nav-link font-weight-bold">活動訊息</h6>
          <ul class="flex-column">
            <li class="">
              <router-link class="link" to="/member/mb_forum">論壇</router-link>
            </li>
            <li class="">
              <router-link class="link" to="/mb_compaign">展覽</router-link>
            </li>
          </ul>
        </li> -->
        <li class="nav-item">
          <h6 class="nav-link font-weight-bold">客服中心</h6>
          <ul class="flex-column">
            <li class="">
              <router-link class="link" to="/mb_announcement">
                服務公告
              </router-link>
            </li>
            <li class="">
              <router-link class="link" to="/mb_questions">
                常見問題
              </router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <h6 class="nav-link font-weight-bold">其他</h6>
          <ul class="flex-column">
            <li class="">
              <a
                class="link"
                href="http://www.udngroup.com/members/benefits"
                target="_blank"
                >聯合報系會員權益</a
              >
            </li>
            <li class="">
              <a
                class="link"
                href="http://www.udngroup.com/members/service"
                target="_blank"
                >會員服務條款</a
              >
            </li>
            <li class="">
              <a
                class="link"
                href="http://www.udngroup.com/members/udn_privacy"
                target="_blank"
                >隱私權聲明</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="signout">
      <img src="../assets/img/signout.png" alt="signout_img" class="signout_img">
      <span @click="signOut">登出</span>
    </div>
  </nav>
</template>

<script>
// import $ from 'jquery'
export default {
  methods: {
    signOut: function () {
      const vm = this
      const confirmLogOut = confirm('確定要登出？')
      if (confirmLogOut) {
        vm.$store.dispatch('logOut', status)
      }
    }
  }
}
</script>
<style scoped>
h6 {
  color: #000 !important;
  margin: 0;
  padding: 0 10px 5px 10px;
  font-weight: normal !important;
  font-size: 18px;
}
.sidebar {
  position: sticky;
  position: -webkit-sticky;
  z-index: 100; /* Behind the navbar */
  height: auto;
  width: 195px;
}
.sidebar-sticky {
  position: relative !important;
  height: 100%;
  background-color: #f3f3f3;
  padding-top: 20px;
}
li.nav-item {
  margin-bottom: 40px;
}
ul {
  list-style-type: none;
  padding: 0;
  padding: 0px 10px;
}
a.link {
  color: #7d7d7d;
  font-size: 18px;
  font-weight: 300;
}
a.link:hover {
  text-decoration: none;
  color: #d72c1d;
  opacity: 0.7;
}
a.router-link-active {
  color: #d72c1d;
  opacity: 0.7;
}
.signout {
  display: none;
}
@media screen and (max-width: 1016px) {
  .sidebar {
    width: 175px;
  }
}
@media screen and (max-width: 767px) {
  .sidebar {
    width: 100%;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  .sidebar-sticky {
    background: #f9f9f9;
  }
  h6 {
    font-size: 12px;
    color: #7b7575 !important;
    padding: 0 0 5px 0;
  }
  a.link {
    color: #000;
    font-size: 18px;
  }
  ul {
    padding: 0;
    background-color: #f9f9f9;
  }
  ul.nav {
    padding-bottom: 80px;
  }
  li.nav-item {
    margin-bottom: 20px;
  }
  li.nav-item li {
    line-height: 1.2;
  }
  .signout {
    position: absolute;
    bottom: 0;
    color: #000;
    cursor: pointer;
    display: block;
    line-height: 1;
  }
  .signout_img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .signout span {
    font-size: 14px;
    font-weight: 300;
  }
}
</style>
