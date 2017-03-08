import api from '../api'
import * as types from './mutation_types'

export const createBookmark = ({commit, state}, body) => {
    console.log(state.user.user.username);
    return new Promise((resolve, reject) => {
        return api.CreateBookmark(body).then(success => {
            commit(types.CREATE_BOOKMARK_SUCCESS, {
                bookmark: success.body,
                username: state.user.user.username
            });
            resolve(success);
        }, error => reject(error));
    })
}

export const editBookmark = ({commit, state}, body) => {
    return new Promise((resolve, reject) => {
        return api.EditBookmark(body).then(success => {
            commit(types.EDIT_BOOKMARK_SUCCESS,
                {
                    bookmark: success.body,
                    username: state.user.user.username
                });
            resolve(success);
        }, error => reject(error));
    })
}