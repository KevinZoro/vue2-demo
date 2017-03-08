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
    bookmarks: [],
    bookmarkCount: 0
}

const getters = {
    bookmarks: state => state.bookmarks,
    bookmarkCount: state => state.bookmarkCount
}

const actions = {
    getBookmarks({commit, state}, params) {
        // console.log(params);
        return new Promise((resolve, reject) => {
            return api.GetBookmarks(params).then(success => {
                commit(types.GET_BOOKMARK_LIST, success.body);
                resolve(success);
            }, error => reject(error))
        })
    },
    
    getBookmarkCount({commit, state}, params) {//TODO
        return new Promise((resolve, reject) => {
            return api.GetBookmarksCount(params).then(success => {
                commit(types.GET_BOOKMARK_COUNT, success.body);
                resolve(success);
            }, error => reject(error));
        })
    },

    deleteBookmark({commit, state}, id) {
        return new Promise((resolve, reject) => {
            return api.DeleteBookmark(id).then(success => {
                commit(types.DELETE_BOOKMARK_SUCCESS, id);
                resolve(success);
            }, error => reject(error));
        })
    }
}

const mutations = {
    [types.GET_BOOKMARK_LIST](state, body) {
        body.list.forEach((value) => {
            for (let key in value) {
                if (key.toLowerCase().indexOf('time') != -1) {
                    value[key] = moment(value[key]).format('YYYY-MM-DD HH:mm:ss')
                }
            }
        })
        state.bookmarks = body.list;
    },
    [types.CREATE_BOOKMARK_SUCCESS](state, body) {
        let bookmark=body.bookmark;
        // bookmark.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
        bookmark.bookmarkUser = {
            username:body.username
        };
        state.bookmarks = [bookmark].concat(state.bookmarks);
        state.bookmarkCount++;
    },
    [types.GET_BOOKMARK_COUNT](state, data) {
        state.bookmarkCount = data.count;
    },
    [types.EDIT_BOOKMARK_SUCCESS](state, body) {
        let bookmark = body.bookmark;
        state.bookmarks = _.map(state.bookmarks, item => {
            if (item.id == bookmark.id) {
                bookmark.bookmarkUser = {
                    username:body.username
                };
                item = bookmark;
            }
            return item;
        })
    },
    [types.DELETE_BOOKMARK_SUCCESS](state, id) {
        state.bookmarks = _.filter(state.bookmarks, item => {
            if (item.id != id) {
                return item;
            }
        })
        state.bookmarkCount--;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}