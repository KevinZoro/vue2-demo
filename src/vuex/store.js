import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
import { Notification } from 'element-ui'

Vue.use(Vuex)

function __noticeError(message,duration){
    Notification.error({
        message:message,
        duration:duration||500
    })
}

function __noticeSuccess(message,duration){
    Notification.success({
        message:message,
        duration:duration||500
    })
}

export default new Vuex.Store({
    state:{
        user:{
            id:"",
            userId:0,
            token:"",
            username:""
        },//user info
    },
    mutations:{
        USER_LOGIN(state,body){
            state.user = body;
            window.localStorage.setItem('token',body.id)
            window.localStorage.setItem('token_expired',new Date(body.created).getTime()+(body.ttl)*1000);
            window.localStorage.setItem('userId',body.userId);
            __noticeSuccess("登录成功")
        },
        USER_LOGIN_ERROR(state){
            __noticeError("登录失败")
        },
        USER_SIGNUP(state,body){
            state.user = body;
            __noticeSuccess("注册成功")
        },
        USER_SIGNUP_ERROR(state){
            __noticeError("注册失败")
        },
        GET_USER_INFO(state,results){
            state.user.username=results.username;
        },
        GET_USER_INFO_ERROR(state){
            __noticeError("获取用户信息失败")
        },
        USER_LOGOUT(state){
            state.user = {
                id:"",
                userId:0,
                token:"",
                username:""
            }
            window.localStorage.clear();
        }
    },
    actions:{
        login({commit,state},body){//login action
            return new Promise((resolve,reject)=>{
                return api.UserLogin(body).then(response=>{
                    commit('USER_LOGIN',response.body);
                    resolve(response);
                },errorResponse=>{
                    commit('USER_LOGIN_ERROR');
                    reject(errorResponse);
                })
            })
            
        },
        signup({commit,state},body){//sign up action
            return new Promise((resolve,reject)=>{
                return api.Signup(body).then(response=>{
                    commit('USER_SIGNUP',response.body);
                    resolve(response);
                },errorResponse=>{
                    commit('USER_SIGNUP_ERROR');
                    reject(errorResponse);
                })
            })
           
        },
        getUserInfo({commit,state},params){
            return new Promise((resolve,reject)=>{
                api.GetUserInfo(params.id,params.token).then(success=>{
                    commit('GET_USER_INFO',success.body);
                    resolve(success);
                },error=>{
                    commit('GET_USER_INFO_ERROR'),
                    reject(error);
                })
            })
            
        },
        logout({commit,state}){
            return new Promise((resolve,reject)=>{
                return api.Logout({
                    params:{
                        access_token:window.localStorage.getItem('token')
                    }
                }).then(success=>{
                    commit('USER_LOGOUT');
                    resolve(success);
                },error=>reject(error));
            })
            
        }
    },
    getters:{
        user:state=>state.user,
        token:state=>window.localStorage.getItem('token')
    }
})