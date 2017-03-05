<template>
  <div id="login">
    <common-login :isLogin="1"></common-login>
  </div>
</template>

<script>
import commonLogin from './commonLogin.vue'
export default {
  name: 'login',
  data () {
    return {
      
    }
  },
  methods:{
  
  },
  components:{
    commonLogin
  }
}
</script>

<style lang="scss">

</style>
