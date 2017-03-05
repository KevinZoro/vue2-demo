<template>
  <div id="home">
    <navbar></navbar>
    <el-row>
        <el-col :span="24" style="text-align: center;"><h1>Welcome to the bookmark system</h1></el-col>
    </el-row>
    
  </div>
</template>

<script> 
    import Navbar from './Navbar.vue'
    export default {
        name: 'home',
        data () {
            return {
                
            }
        },
        computed:{
            
        },
        methods:{
            
        },
        components:{
            Navbar
        },
        created(){
                     
        }
  }
</script>

<style lang="scss">
</style>
