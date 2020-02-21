import{
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqGetUser,
    reqGetUserList,
    reqGetMsgList,
    reqReadMsg
} from '../api/index'
import io from 'socket.io-client'
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
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
const receiveUserlist = (userlist) => ({type: RECEIVE_USER_LIST, data: userlist})
const receiveMsglist = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs, userid}})
const receiveMsg = ({chatMsg, userid}) => ({type: RECEIVE_MSG, data: {chatMsg, userid}})
const msgread = ({count, from , to}) => ({type: READ_MSG, data: {count, from ,to}})
function initIO (dispatch, userid) {
    if (!io.socket) {
        io.socket = io('ws://localhost:4000')
        io.socket.on('receiveMsg', function(chatMsg){
            console.log('客户端接收服务器发送的消息', chatMsg)
            if (userid === chatMsg.from || userid === chatMsg.to) {
                dispatch(receiveMsg({chatMsg, userid}))
            }
        })
    }
}
async function getMsgList (dispatch, userid) {
    initIO(dispatch, userid)
    const response = await reqGetMsgList()
    const result = response.data
    if (result.code === 0) {
        const {users, chatMsgs} = result.data
        dispatch(receiveMsglist({users, chatMsgs, userid}))
    }
}
export const register = (user) => {
    const {username, password, password2, type} = user
    if(!username){
        return errorMsg('用户名必须指定！')
    } else if(!password) {
        return errorMsg('密码必须指定！')
    } else if(password !== password2){
        return errorMsg('两次密码不一致！')
    }
    return async (dispatch) => {
        const response = await reqRegister({username, password, type})
        const result = response.data
        if(result.code === 0){
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}

export const login = (user) => {
    const {username, password} = user
    if (!username) {
        return errorMsg('用户名不能为空！')
    } else if (!password) {
        return errorMsg('密码不能为空！')
    }
    return async dispatch => {
        const response = await reqLogin(user)
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}

export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

export const getUser = () => {
    return async dispatch => {
        const response = await reqGetUser()
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqGetUserList(type)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUserlist(result.data))
        }
    }
}
export const sendMsg = ({from, to, content}) => {
    return async dispatch => {
        console.log('客户端向服务器发送消息: ',{from, to, content})
        io.socket.emit('sendMsg', {from, to, content})
    }
}
export const readmsg = (from, to) => {
    return async dispatch => {
        const response = await reqReadMsg(from)
        const result = response.data
        if (result.code === 0) {
            const count = result.data
            dispatch(msgread({count, from, to}))
        }
    }
}