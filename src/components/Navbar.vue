<template>
    <div id="navbar">
        <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">{{user.username}}'s Bookmarks</el-menu-item>
            <el-menu-item index="6" style="float:right;"><a href="javascript:void(0)" v-on:click="logout">Logout</a></el-menu-item>
            <el-menu-item index="5" style="float:right;">{{user.username}}</el-menu-item>
            <!--<el-menu-item index="4" style="float:right;"><el-input v-model="search" placeholder="Search" icon="search"></el-input></el-menu-item>-->
            <div class="line"></div>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "navbar",
        data() {
            return {
                activeIndex: '1',
                // search:"",
            };
        },
        computed: {
            user() {
                return this.$store.getters.user;
            },
            userId() {
                return window.localStorage.getItem('userId');
            },
            token() {
                return window.localStorage.getItem('token');
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            logout() {
                this.$store.dispatch('logout').then(success => this.$router.replace('/login'));
            },
            getUserInfo() {
                this.$store.dispatch('getUserInfo', {
                    id: this.userId
                })
            }
        },
        created() {
            this.getUserInfo();
        }
    }

</script>