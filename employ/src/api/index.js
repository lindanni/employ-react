import ajax from './ajax'
export const reqRegister = (user) => ajax('/register', user, 'POST')
export const reqLogin = ({username, password}) =>ajax('/login', {username,password}, 'POST')
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')
export const reqGetUser = () => ajax('/user')
export const reqGetUserList = (type) => ajax('/userlist', {type},'GET')
export const reqGetMsgList = () => ajax('/msglist')
export const reqReadMsg = (from) => ajax('/readmsg',{from},'POST')