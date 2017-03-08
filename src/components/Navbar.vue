<template>
    <div id="navbar">
        <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">{{user.username}}'s Bookmarks</el-menu-item>
            <div style="float:right">
                <el-menu-item index="4">{{user.username}}</el-menu-item>
                <el-menu-item index="5"><i class="el-icon-setting"></i></el-menu-item>
                <el-menu-item index="6"><a href="javascript:void(0)" v-on:click="logout">Logout</a></el-menu-item>
            </div>

            <div class="line"></div>
        </el-menu>
        <el-dialog title="User Infomartion" v-model="settingDialogVisible">
            <el-form :model="localUser" :rules="rules">
                <el-form-item label="UserID">
                    <el-input v-model="localUser.id" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="Username" prop="username">
                    <el-input v-model="localUser.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="User Email">
                    <el-input v-model="localUser.email" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="settingDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="updateUserInfo">Done</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "navbar",
        data() {
            return {
                activeIndex: '1',
                settingDialogVisible: false,
                // search:"",
                rules:{
                    username:[{
                        required:true,
                        message:'username is required',
                        trigger:'blur'
                    }]
                }
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
            },
            localUser(){
                return JSON.parse(JSON.stringify(this.user));
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                if (key == 5) {
                    this.settingDialogVisible = true;
                }
            },
            logout() {
                this.$store.dispatch('logout').then(success => this.$router.replace('/login'));
            },
            getUserInfo() {
                this.$store.dispatch('getUserInfo', {
                    id: this.userId
                })
            },
            updateUserInfo() {
                // console.log(this.localUser);
                this.$store.dispatch('updateUserInfo',this.localUser).then(success=>this.settingDialogVisible=false)
            }
        },
        created() {
            this.getUserInfo();
        }
    }

</script>