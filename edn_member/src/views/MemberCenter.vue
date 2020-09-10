<template>
  <div class="dashboard">
    <Navbar v-if="!isApp"/>
    <div class="main_tab">
      <Sidebar v-if="isSidebarShow && loginStatus" />
      <div class="content_tab">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import Sidebar from '../components/BaseSidebar'
import Navbar from '../components/BaseNavBar'
export default {
  name: 'member_center',
  components: {
    Sidebar,
    Navbar
  },
  data () {
    return {
      isSidebarShow: true
    }
  },
  computed: {
    ...mapGetters(['loginStatus']),
    ...mapState(['isApp'])
  },
  methods: {
    recordWidth: function () {
      const vm = this
      const wWidth = window.outerWidth
      if (wWidth < 768) {
        vm.isSidebarShow = false
      } else {
        vm.isSidebarShow = true
      }
    }
  },
  mounted () {
    const vm = this
    vm.$nextTick(function () {
      window.addEventListener('resize', vm.recordWidth)
    })
    // Init
    vm.recordWidth()
  },
  beforeDestroy () {
    const vm = this
    window.removeEventListener('resize', vm.recordWidth)
  }
}
</script>
<style scoped>
.main_tab {
  display: flex;
  padding: 30px 85px 30px 80px;
  height: 100%;
}
.content_tab {
  position: relative;
  width: 800px;
  padding: 20px 0px 0px 25px;
  height: 100%;
  flex: 1;
}
/* ipad pro */
@media screen and (max-width: 1024px) {
  .main_tab {
    padding: 0 10px 0 20px;
  }
  .content_tab {
    padding: 20px 10px 80px 10px;
  }
}
@media screen and (max-width: 1016px) {
  .main_tab {
    padding-left: 10px;
  }
}

@media screen and (max-width: 767px) {
  .main_tab {
    padding: 0;
    display: block;
  }
  .content_tab {
    width: 100%;
    padding: 20px 0 0 0px;
  }
  .login_support {
    margin-bottom: 10px;
  }
}
</style>
