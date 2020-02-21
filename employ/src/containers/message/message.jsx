import React from 'react'
import {connect} from 'react-redux'
import {
    List,
    Badge
} from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief
function getLastMsgList(chatMsgs, userid) {
    let lastMsgObj= {}
    chatMsgs.forEach(chatMsg => {
        if (userid === chatMsg.to && !chatMsg.read){
            chatMsg.unReadCount = 1
        } else {
            chatMsg.unReadCount = 0
        }
        const lastMsg = lastMsgObj[chatMsg.chat_id]
        if (!lastMsg) {
            lastMsgObj[chatMsg.chat_id] = chatMsg
        } else {
            const unReadCount = lastMsg.unReadCount + chatMsg.unReadCount
            if (chatMsg.create_time > lastMsg.create_time) {
                lastMsgObj[chatMsg.chat_id] = chatMsg
            }
            lastMsgObj[chatMsg.chat_id].unReadCount = unReadCount
        }
    })
    const lastMsgList = Object.values(lastMsgObj)
    lastMsgList.sort(function (e1, e2) {
        return e2.create_time - e1.create_time
    })
    return lastMsgList
}
class Message extends React.Component {
    render() {
        const userid = this.props.user._id
        const {chatMsgs, users} = this.props.msglist
        const lastMsgList = getLastMsgList(chatMsgs, userid)
        return (
            <div>
                <List style={{marginTop: '50px', marginBottom: '50px'}}>
                    {
                        lastMsgList.map(lastMsg => {
                            const targetId = userid === lastMsg.to ? lastMsg.from : lastMsg.to
                            const targetUser = users[targetId]
                            return (
                                <Item
                                    thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
                                    key={lastMsg._id}
                                    extra={<Badge text={lastMsg.unReadCount}></Badge>}
                                    onClick={() => {this.props.history.push(`/chat/${targetId}`)}}
                                    arrow='horizontal'>
                                        {lastMsg.content}
                                        <Brief>{targetUser.username}</Brief>
                                </Item>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}
export default connect(
    state => ({
        user: state.user,
        msglist: state.msglist
    }),
    {}
)(Message)