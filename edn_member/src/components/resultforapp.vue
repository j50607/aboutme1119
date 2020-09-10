<template>
    <div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['appLoginMsg'])
  },
  mounted () {
    document.querySelector('body').innerText = this.appLoginMsg
  }
}
</script>
<style>
</style>
