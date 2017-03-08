import api from '../../api'
import * as types from '../mutation_types'
import moment from 'moment'

function __noticeError(message, duration) {
    Notification.error({
        message: message,
        duration: duration || 500
    })
}

function __noticeSuccess(message, duration) {
    Notification.success({
        message: message,
        duration: duration || 500
    })
}

const state = {
    user: {
        id: "",
        userId: 0,
        token: "",
        username: ""
    },//user info
}

const getters = {
    user: state => state.user,
    token: state => window.localStorage.getItem('token')
}

const actions = {
    login({commit, state}, body) {//login action
        return new Promise((resolve, reject) => {
            return api.UserLogin(body).then(response => {
                commit(types.USER_LOGIN, response.body);
                resolve(response);
            }, errorResponse => {
                commit(types.USER_LOGIN_ERROR);
                reject(errorResponse);
            })
        })

    },
    signup({commit, state}, body) {//sign up action
        return new Promise((resolve, reject) => {
            return api.Signup(body).then(response => {
                commit(types.USER_SIGNUP, response.body);
                resolve(response);
            }, errorResponse => {
                commit(types.USER_SIGNUP_ERROR);
                reject(errorResponse);
            })
        })

    },
    getUserInfo({commit, state}, params) {
        return new Promise((resolve, reject) => {
            return api.GetUserInfo(params.id).then(success => {
                commit(types.GET_USER_INFO, success.body);
                resolve(success);
            }, error => {
                commit(types.GET_USER_INFO_ERROR);
                reject(error);
            })
        })
    },
    updateUserInfo({commit, state}, body) {
        return new Promise((resolve, reject) => {
            return api.UpdateUserInfo(body.id, body).then(success => {
                commit(types.UPDATE_USER_INFO, success.body);
                resolve(success);
            }, error => reject(error))
        })
    },
    logout({commit, state}) {
        return new Promise((resolve, reject) => {
            return api.Logout().then(success => {
                commit(types.USER_LOGOUT);
                resolve(success);
            }, error => reject(error));
        })
    },
}

const mutations = {
    [types.USER_LOGIN](state, body) {
        state.user = body;
        window.localStorage.setItem('token', body.id)
        window.localStorage.setItem('token_expired', new Date(body.created).getTime() + (body.ttl) * 1000);
        window.localStorage.setItem('userId', body.userId);
        __noticeSuccess("SignIn successfully")
    },
    [types.USER_LOGIN_ERROR](state) {
        __noticeError("SignIn failed")
    },
    [types.USER_SIGNUP](state, body) {
        state.user = body;
        __noticeSuccess("SignUp successfully")
    },
    [types.USER_SIGNUP_ERROR](state) {
        __noticeError("SignUp failed")
    },
    [types.GET_USER_INFO](state, results) {
        state.user = results;
    },
    [types.GET_USER_INFO_ERROR](state) {
        __noticeError("failed to get user infomation")
    },
    [types.UPDATE_USER_INFO](state, body) {
        __noticeSuccess("Update settings successfully")
        state.user = body;
    },
    [types.USER_LOGOUT](state) {
        state.user = {
            id: "",
            userId: 0,
            token: "",
            username: ""
        }
        window.localStorage.clear();
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}