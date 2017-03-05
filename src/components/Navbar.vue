<template>
    <div id="navbar">
        <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">{{user.username}}'s Bookmarks</el-menu-item>
            <!--<el-submenu index="2">
                <template slot="title">精选</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>-->
            <!--<el-menu-item index="3"><a href="https://www.ele.me" target="_blank">所有文章</a></el-menu-item>-->
            <el-menu-item index="6" style="float:right;"><a href="javascript:void(0)" v-on:click="logout">登出</a></el-menu-item>
            <el-menu-item index="5" style="float:right;">{{user.username}}</el-menu-item>
            <el-menu-item index="4" style="float:right;"><el-input v-model="search" placeholder="搜索" icon="search"></el-input></el-menu-item>
            <div class="line"></div>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name:"navbar",
        data() {
            return {
                activeIndex: '1',
                search:"",
            };
        },
        computed:{
            user(){
                return this.$store.getters.user;
            },
            userId(){
                return window.localStorage.getItem('userId');
            },
            token(){
                return window.localStorage.getItem('token');
            }
        },
        methods: {
            logout(){
                this.$store.dispatch('logout').then(success=>this.$router.replace('/login'));
            },
            getUserInfo(){
                this.$store.dispatch('getUserInfo',{
                    id:this.userId,
                    token:this.token
                })
            }
        },
        created(){
             this.getUserInfo();  
        }
    }
</script>