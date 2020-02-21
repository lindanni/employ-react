import React from 'react'
import {connect} from 'react-redux'
import '../../assets/index.less'
import {sendMsg, readmsg} from '../../redux/action'
import {
    NavBar,
    List,
    InputItem,
    Grid,
    Icon
} from 'antd-mobile'
const Item = List.Item
class Chat extends React.Component {
    state = {
        isShow: false,
        content: ''
    }
    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }
    handleSend = () => {
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        if (content) {
            this.props.sendMsg({from, to, content})
            this.setState({
                content: '',
                isShow: false
            })
        }
    }
    toggleShow = () => {
        this.setState({
            isShow: true
        })
        if(!this.state.isShow) {
            // 异步手动派发resize事件,解决表情列表显示的bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }
    componentWillMount() {
        const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
        this.emojis = emojis.map(emoji => ({text: emoji}))
    }
    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentWillUnmount() {
        const from = this.props.match.params.userid
        const to = this.props.user._id
        this.props.readmsg(from, to)
    }

    render() {
        let {users, chatMsgs} = this.props.msglist
        const targetId = this.props.match.params.userid
        const meId = this.props.user._id
        const chat_id = [meId, targetId].sort().join('_')
        chatMsgs = chatMsgs.filter(chatMsg => chatMsg.chat_id === chat_id)
        const header = users[targetId].header
        const targetIcon = require(`../../assets/images/${header}.png`)
        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type='left'></Icon>}
                    onLeftClick={() => {this.props.history.goBack()}}>
                    {users[targetId].username}
                </NavBar>
                <List style={{marginBottom: '50px'}}>
                    {
                        chatMsgs.map(chatMsg => {
                            if (targetId === chatMsg.from) {
                                return <Item thumb={targetIcon} key={chatMsg._id}>{chatMsg.content}</Item>
                            } else {
                                return <Item extra='我' key={chatMsg._id} className='chat-me'>{chatMsg.content}</Item>
                            }
                        })
                    }
                </List>
                <div className="send_wrap">
                    <InputItem
                        value={this.state.content}
                        placeholder='请输入发送的内容'
                        onChange={(val) => {this.handleChange('content', val)}}
                        extra={
                            <span>
                                <span onClick={this.toggleShow}>😀</span>
                                <span onClick={this.handleSend}>发送</span>
                            </span>
                        }
                        onFocus={() => {this.setState({isShow: false})}}>
                    </InputItem>
                    {
                        this.state.isShow ? (
                            <Grid
                                data={this.emojis}
                                columnNum={8}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(item) => {this.setState({content: this.state.content + item.text})}}>
                            </Grid>
                        ) : null
                    }
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({
        user: state.user,
        msglist: state.msglist
    }),
    {sendMsg, readmsg}
)(Chat)