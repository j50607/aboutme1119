<template>
  <div class="collect_article">
    <h6 class="title">我的新聞</h6>
    <div class="nav">
      <div class="my_article">
        <transition name="fade">
          <router-link to="/mb_collect/rcm_article">
          推薦新聞</router-link>
        </transition>
      </div>
      <div class="rcm_article">
        <router-link to="/mb_collect/fav_article">
        收藏新聞</router-link>
      </div>
    </div>
    <div class="reedit_article" v-if="!isShow">
      <i class="far fa-edit"></i>
      編輯您收藏的文章
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '文章收藏'
  },
  data () {
    return {
      isShow: false
    }
  },
  created () {
    // const vm = this
    // console.log(vm.$route.path)
  },
  watch: {
    $route (to, from) {
      const vm = this
      const nowPath = to.path
      if (nowPath.indexOf('rcm_article') > -1) {
        vm.isShow = true
      } else {
        vm.isShow = false
      }
    }
  }
}
</script>
<style scoped>
  .my_article {
    margin-right: 20px;
  }
  .nav {
    align-items: flex-end;
    margin-bottom: 20px;
  }
  a {
    padding: 2px 0;
    text-decoration: none;
    color: #c2c2c2;
    font-size: 15px;
  }
  a:hover {
    color: #d72c1d;
  }
  a.router-link-active {
    color: #d72c1d;
    border-bottom: 1px solid #d72c1d;
  }

  .reedit_article {
    font-size: 13px;
    font-weight: 300;
    color: #c2c2c2;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .reedit_article:hover {
    color: #000;
  }

  @media screen and (max-width:767px){
    .my_article, .rcm_article {
      width: 50%;
      text-align: left;
      margin-right: 0;
    }
    a.router-link-active {
      display: block;
      border-bottom: 2px solid #d72c1d;
    }
    .reedit_article {
      padding-left: 0;
    }
  }
</style>
