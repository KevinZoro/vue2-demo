<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script> 
  export default {
    name: 'app',
    data () {
      return {
        
      }
    },
    methods:{
      
    }
  }
</script>

<style lang="scss">
/*body{
  background-color: #EFF2F7;
}*/
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
