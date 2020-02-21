import React from 'react'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/action'
import {
    Result,
    List,
    WhiteSpace,
    Button,
    Modal
} from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief
class Personal extends React.Component {
    logout = () => {
        Modal.alert('退出','确定退出登录吗?',[
            {text: '取消'},
            {
                text: '确定',
                onPress: () => {
                    Cookies.remove('userid')
                    this.props.resetUser()
                }
            }
        ])
    }
    render() {
        const {username, info, header, company, post, salary} = this.props.user
        return (
            <div style={{marginTop: '50px', marginBottom: '50px'}}>
                <Result
                    img={<img src={require(`../../assets/images/${header}.png`)} alt={header} style={{width: 50}}/>}
                    title={username}
                    message={company}>
                </Result>
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位: {post}</Brief>
                        <Brief>简介: {info}</Brief>
                        {salary ? <Brief>薪资: {salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Button type='warning' onClick={this.logout}>退出登录</Button>
                </List>
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user}),
    {resetUser}
)(Personal)