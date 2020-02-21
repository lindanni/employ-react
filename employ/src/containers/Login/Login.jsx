import React, {Component} from 'react'
import {connect} from 'react-redux'
import {login} from '../../redux/action'
import {Redirect} from 'react-router-dom'
import {
  WingBlank,
  WhiteSpace,
  List,
  InputItem,
  NavBar,
  Button
} from 'antd-mobile'
import Logo from '../../components/logo/logo.jsx'
class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  Login = () => {
    this.props.login(this.state)
  }
  handleChange = (name,val) => {
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
        <Logo></Logo>
        <WingBlank>
          <List>
            {msg ? <div>{msg}</div> : ''}
            <WhiteSpace/>
            <InputItem placeholder='请输入用户名' onChange={(val) => {this.handleChange('username',val)}}>用户名：</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='请输入密码' onChange={(val) => {this.handleChange('password',val)}}>密&nbsp;&nbsp;码：</InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.Login}>登录</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
export default connect(
    (state) => ({user: state.user}),
    {login}
)(Login)