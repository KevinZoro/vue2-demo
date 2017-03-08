import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
import moment from 'moment'
import { Notification } from 'element-ui'
import _ from 'lodash';

import * as actions from './actions'
import * as getters from './getters'
import user from './modules/user'
import bookmark from './modules/bookmark'
import * as mutations from './mutations'

Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    getters,
    mutations,
    modules: {
        user,
        bookmark
    }
})