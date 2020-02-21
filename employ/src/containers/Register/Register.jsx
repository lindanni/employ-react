import React, {Component} from 'react'
import {register} from '../../redux/action'
import Logo from '../../components/logo/logo.jsx'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  Radio,
  Button,
  WhiteSpace
} from 'antd-mobile'
const ListItem = List.Item
class Register extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    type: 'dashen'
  }
  register = () => {
    this.props.register(this.state)
  }
  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  render() {
    const {msg, redirectTo} = this.props.user
    if (redirectTo) {
      return (<Redirect to={redirectTo}></Redirect>)
    }
    return (
      <div>
        <NavBar>硅&nbsp;&nbsp;谷&nbsp;&nbsp;直&nbsp;&nbsp;聘</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            {msg ? <div>{msg}</div> : ''}
            <WhiteSpace/>
            <InputItem placeholder='请输入用户名' onChange={(val) => {this.handleChange('username',val)}}>用户名：</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='请输入密码' onChange={(val) => {this.handleChange('password', val)}}>密&nbsp;&nbsp;码：</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='请再次输入密码' onChange={(val) => {this.handleChange('password2', val)}}>确认密码：</InputItem>
            <WhiteSpace/>
            <ListItem>
              <span>用户类型：</span>
              <Radio checked={this.state.type==='dashen'} onChange={() =>{this.handleChange('type','dashen')}}>大神</Radio>
              <Radio checked={this.state.type==='laoban'} onChange={() => {this.handleChange('type','laoban')}}>老板</Radio>
            </ListItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;册</Button>
            <Button>已有账户</Button>
          </List>
        </WingBlank>
      </div>
  )
  }
}
export default connect(
    (state) => ({user: state.user}),
    {register}
)(Register)