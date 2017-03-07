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
        //   console.log(response);
        if (response.status == '401' && (response.url.indexOf('/api/login') == -1) && (response.url.indexOf('/api/signup') == -1)) {
            //   console.log("bad")
            Notification.error({
                message: "未登录或token失效",
                duration: 2000
            })
            router.replace({ path: '/login' });
        }
    });
});

api.Signup = function (body) {
    return Vue.http.post(hostUrl + '/api/Users', body)
}
api.UserLogin = function (body) {
    return Vue.http.post(hostUrl + '/api/Users/login', body);
}
api.Logout = function () {
    return Vue.http.post(hostUrl + '/api/Users/logout');
}
api.GetUserInfo = function (userId) {
    return Vue.http.get(hostUrl + '/api/Users/' + userId)
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
api.DeleteBookmark = function(id){
    return Vue.http.delete(hostUrl+'/api/bookmarks/'+id);
}
export default api;


