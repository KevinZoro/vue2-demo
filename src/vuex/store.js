import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
import moment from 'moment'
import { Notification } from 'element-ui'
import _ from 'lodash'

Vue.use(Vuex)

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

export default new Vuex.Store({
    state: {
        user: {
            id: "",
            userId: 0,
            token: "",
            username: ""
        },//user info
        bookmarks: [],
        bookmarkCount: 0
    },
    mutations: {
        USER_LOGIN(state, body) {
            state.user = body;
            window.localStorage.setItem('token', body.id)
            window.localStorage.setItem('token_expired', new Date(body.created).getTime() + (body.ttl) * 1000);
            window.localStorage.setItem('userId', body.userId);
            __noticeSuccess("SignIn successfully")
        },
        USER_LOGIN_ERROR(state) {
            __noticeError("SignIn failed")
        },
        USER_SIGNUP(state, body) {
            state.user = body;
            __noticeSuccess("SignUp successfully")
        },
        USER_SIGNUP_ERROR(state) {
            __noticeError("SignUp failed")
        },
        GET_USER_INFO(state, results) {
            state.user = results;
        },
        GET_USER_INFO_ERROR(state) {
            __noticeError("failed to get user infomation")
        },
        UPDATE_USER_INFO(state, body) {
            __noticeSuccess("Update settings successfully")
            state.user = body;
        },
        USER_LOGOUT(state) {
            state.user = {
                id: "",
                userId: 0,
                token: "",
                username: ""
            }
            window.localStorage.clear();
        },
        GET_BOOKMARK_LIST(state, body) {
            body.list.forEach((value) => {
                for (let key in value) {
                    if (key.toLowerCase().indexOf('time') != -1) {
                        value[key] = moment(value[key]).format('YYYY-MM-DD HH:mm:ss')
                    }
                }
            })
            state.bookmarks = body.list;
        },
        CREATE_BOOKMARK_SUCCESS(state, bookmark) {
            // bookmark.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
            bookmark.bookmarkUser = {
                username: state.user.username
            };
            state.bookmarks = [bookmark].concat(state.bookmarks);
            state.bookmarkCount++;
        },
        GET_BOOKMARK_COUNT(state, data) {
            state.bookmarkCount = data.count;
        },
        EDIT_BOOKMARK_SUCCESS(state, bookmark) {
            state.bookmarks = _.map(state.bookmarks, item => {
                if (item.id == bookmark.id) {
                    bookmark.bookmarkUser = {
                        username: state.user.username
                    };
                    item = bookmark;
                }
                return item;
            })

        },
        DELETE_BOOKMARK_SUCCESS(state, id) {
            state.bookmarks = _.filter(state.bookmarks, item => {
                if (item.id != id) {
                    return item;
                }
            })
            state.bookmarkCount--;
        }
    },
    actions: {
        login({commit, state}, body) {//login action
            return new Promise((resolve, reject) => {
                return api.UserLogin(body).then(response => {
                    commit('USER_LOGIN', response.body);
                    resolve(response);
                }, errorResponse => {
                    commit('USER_LOGIN_ERROR');
                    reject(errorResponse);
                })
            })

        },
        signup({commit, state}, body) {//sign up action
            return new Promise((resolve, reject) => {
                return api.Signup(body).then(response => {
                    commit('USER_SIGNUP', response.body);
                    resolve(response);
                }, errorResponse => {
                    commit('USER_SIGNUP_ERROR');
                    reject(errorResponse);
                })
            })

        },
        getUserInfo({commit, state}, params) {
            return new Promise((resolve, reject) => {
                return api.GetUserInfo(params.id).then(success => {
                    commit('GET_USER_INFO', success.body);
                    resolve(success);
                }, error => {
                    commit('GET_USER_INFO_ERROR');
                    reject(error);
                })
            })
        },
        updateUserInfo({commit, state}, body) {
            return new Promise((resolve, reject) => {
                return api.UpdateUserInfo(body.id, body).then(success => {
                    commit('UPDATE_USER_INFO', success.body);
                    resolve(success);
                }, error => reject(error))
            })
        },
        logout({commit, state}) {
            return new Promise((resolve, reject) => {
                return api.Logout().then(success => {
                    commit('USER_LOGOUT');
                    resolve(success);
                }, error => reject(error));
            })
        },
        getBookmarks({commit, state}, params) {
            // console.log(params);
            return new Promise((resolve, reject) => {
                return api.GetBookmarks(params).then(success => {
                    commit('GET_BOOKMARK_LIST', success.body);
                    resolve(success);
                }, error => reject(error))
            })
        },
        createBookmark({commit, state}, body) {
            return new Promise((resolve, reject) => {
                return api.CreateBookmark(body).then(success => {
                    commit('CREATE_BOOKMARK_SUCCESS', success.body);
                    resolve(success);
                }, error => reject(error));
            })
        },
        getBookmarkCount({commit, state}, params) {//TODO
            return new Promise((resolve, reject) => {
                return api.GetBookmarksCount(params).then(success => {
                    commit('GET_BOOKMARK_COUNT', success.body);
                    resolve(success);
                }, error => reject(error));
            })
        },
        editBookmark({commit, state}, body) {
            return new Promise((resolve, reject) => {
                return api.EditBookmark(body).then(success => {
                    commit('EDIT_BOOKMARK_SUCCESS', success.body);
                    resolve(success);
                }, error => reject(error));
            })
        },
        deleteBookmark({commit, state}, id) {
            return new Promise((resolve, reject) => {
                return api.DeleteBookmark(id).then(success => {
                    commit('DELETE_BOOKMARK_SUCCESS', id);
                    resolve(success);
                }, error => reject(error));
            })
        }
    },
    getters: {
        user: state => state.user,
        token: state => window.localStorage.getItem('token'),
        bookmarks: state => state.bookmarks,
        bookmarkCount: state => state.bookmarkCount
    }
})