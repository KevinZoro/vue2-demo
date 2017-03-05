import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
const hostUrl="http://0.0.0.0:3000"

function api(){}

api.Signup=function(body){
    return Vue.http.post(hostUrl+'/api/Users',body)
}
api.UserLogin=function(body){
    return Vue.http.post(hostUrl+'/api/Users/login',body);
}
api.Logout = function(query){
    return Vue.http.post(hostUrl+'/api/Users/logout',{},query)
}
api.GetUserInfo=function(userId,token){
    return Vue.http.get(hostUrl+'/api/Users/'+userId,{
        params:{
            'access_token':token
        }
    })
}
export default api;


