<template>
    <div id="commonLogin">
        <h1 style="color:#20A0FF">BookMark</h1>
        <!--<img src="../assets/logo.png" alt="">-->
        <el-input v-model="email" placeholder="请输入邮箱地址"></el-input>
        <el-input v-model="username" placeholder="请输入用户名" v-show="!isLogin"></el-input>
        <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
        <el-button v-on:click="userLogin(isLogin)" type="primary">{{isLogin?"登录":"注册"}}</el-button>
        <el-button v-on:click="redirect(isLogin)">{{isLogin?"注册":"登录"}}</el-button>
    </div>
</template>

<script>
    import api from '../api'
    import CryptoJS from 'crypto-js'
    export default {
        name: 'commonLogin',
        props: ["isLogin"],
        data() {
            return {
                email: "",
                password: "",
                username: ""
            }
        },
        computed: {
            hashPassword() {
                return CryptoJS.HmacSHA1(this.password, 'mobilenow').toString(CryptoJS.enc.Base64);
            }
        },
        methods: {
            redirect(isLogin) {
                this.$router.replace({ path: (isLogin ? '/signup' : '/login') })
            },
            login() {
                this.$store.dispatch('login', {
                    email: this.email,
                    password: this.hashPassword
                }).then(response => {
                    this.$router.replace('/Home');
                })
            },
            signup() {
                this.$store.dispatch('signup', {
                    email: this.email,
                    password: this.hashPassword,
                    username: this.username
                }).then(success => {
                    setTimeout(() => {
                        this.login()
                    }, 1000);
                })
            },
            showWarningTips(message) {
                this.$message({
                    message: message ,
                    type: 'warning',
                    duration: 2000
                });
            },
            userLogin(isLogin) {
                if (this.email.length == 0 || this.password.length == 0) {
                    this.showWarningTips("请输入邮箱和密码");
                } else if (!isLogin && this.username.length == 0) {
                    this.showWarningTips("请输入用户名");
                } else if (this.password.length < 8) {
                    this.showWarningTips("密码长度不能小于8");
                } else {
                    if (isLogin) {
                        this.login();
                    } else {
                        this.signup();
                    }
                }
            }
        }
    }

</script>

<style lang="scss">
    .el-input {
        margin-bottom: 5px;
    }
    
    #commonLogin {
        text-align: center;
        margin: 0 30%;
    }
</style>