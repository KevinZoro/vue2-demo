import Vue from 'vue'
import VueResource from 'vue-resource'
import router from '../router'
import { Notification } from 'element-ui'

Vue.use(VueResource);
const hostUrl = "http://0.0.0.0:3000"

function api() { }
Vue.http.interceptors.push(function (request, next) {
    // modify headers
    if (!request.params) request.params = {};
    request.params.access_token = window.localStorage.getItem('token');

    // continue to next interceptor
    next(function (response) {
        if (response.status == '401' && (response.url.indexOf('/api/cmsUsers/login') == -1) && (response.url.indexOf('/api/cmsUsers/signup') == -1)) {
            //   console.log("bad")
            Notification.error({
                message: "未登录或token失效",
                duration: 2000
            })
            router.replace({ path: '/login' });
        } else if (!response.ok) {
            Notification.error({
                message: response.statusText,
                duration: 500
            })
        }
    });
});

api.Signup = function (body) {
    return Vue.http.post(hostUrl + '/api/cmsUsers', body)
}
api.UserLogin = function (body) {
    return Vue.http.post(hostUrl + '/api/cmsUsers/login', body);
}
api.Logout = function () {
    return Vue.http.post(hostUrl + '/api/cmsUsers/logout');
}
api.GetUserInfo = function (userId) {
    return Vue.http.get(hostUrl + '/api/cmsUsers/' + userId);
}
api.UpdateUserInfo = function (userId,body){
    return Vue.http.put(hostUrl + '/api/cmsUsers/' + userId,body);
}
api.GetBookmarks = function (params) {
    return Vue.http.get(hostUrl + '/api/bookmarks/list', { params })
}
api.CreateBookmark = function (body) {
    body.userId = window.localStorage.getItem('userId');
    return Vue.http.post(hostUrl + '/api/bookmarks', body);
}
api.GetBookmarksCount = function (params) {
    return Vue.http.get(hostUrl + '/api/bookmarks/list/count', { params })
}
api.EditBookmark = function (body) {
    return Vue.http.put(hostUrl + '/api/bookmarks/' + body.id, body);
}
api.DeleteBookmark = function (id) {
    return Vue.http.delete(hostUrl + '/api/bookmarks/' + id);
}
export default api;


