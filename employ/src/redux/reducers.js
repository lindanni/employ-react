import {combineReducers} from 'redux'
import {getRedirectTo} from '../untils/index'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    READ_MSG
} from "./action-type";
const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTo: ''
}
const initUserlist = []
function user(state =initUser, action) {
    switch(action.type){
        case AUTH_SUCCESS:
            const {type, header} = action.data
            return {...action.data, redirectTo: getRedirectTo(type, header)}
        case ERROR_MSG:
            return {...state, msg: action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {...initUser, msg: action.data}
        default:
            return state
    }
}

function userlist (state = initUserlist, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}
const initMsgList = {
    users: {},
    chatMsgs: [],
    unReadCount: 0
}
function msglist (state = initMsgList, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const {users, chatMsgs, userid} = action.data
            return{
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((pretol, chatMsg) => {return pretol + (userid === chatMsg.to && !chatMsg.read ? 1 : 0)}, 0)
            }
        case RECEIVE_MSG:
            const {chatMsg} = action.data
            return{
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (action.data.userid === chatMsg.to && !chatMsg.read ? 1 : 0)
            }
        case READ_MSG:
            const {count, from ,to} = action.data
            console.log(count)
            return{
                users: state.users,
                chatMsgs: state.chatMsgs.map(chatMsg => {
                    if (chatMsg.from === from && chatMsg.to === to && !chatMsg.read) {
                        return {...chatMsg, read: true}
                    } else {
                        return chatMsg
                    }
                }),
                unReadCount: state.unReadCount - count
            }
        default:
            return state
    }
}
export default combineReducers({user, userlist, msglist})