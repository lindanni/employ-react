import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import DashenInfo from '../dasheninfo/dasheninfo'
import LaobanInfo from '../laobaninfo/laobaninfo'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {getRedirectTo} from "../../untils";
import {getUser} from '../../redux/action'
import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import {NavBar} from 'antd-mobile'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../../containers/chat/chat'
class Main extends Component {
  navList = [
    {
        path: '/dashen',
        component: Dashen,
        title: '老板列表',
        icon: 'dashen',
        text: '老板',
        hide: true
    },
    {
        path: '/laoban',
        component: Laoban,
        title: '大神列表',
        icon: 'laoban',
        text: '大神',
        hide: true
    },
    {
        path: '/message',
        component: Message,
        title: '消息列表',
        icon: 'message',
        text: '消息',
        hide: true
    },
    {
        path: '/personal',
        component: Personal,
        title: '用户中心',
        icon: 'personal',
        text: '个人',
        hide: true
    }
  ]
  render() {
    const userid = Cookies.get('userid')
    if (!userid) {
        return <Redirect to='/login'></Redirect>
    }
    const {user} =this.props
    if(!user._id){
       this.props.getUser()
    } else {
        let path = this.props.location.pathname
        if (path === '/') {
            path = getRedirectTo(user.type, user.header)
            return <Redirect to={path}></Redirect>
        }
    }
    const navList = this.navList
    const path = this.props.location.pathname
    const currentnav = navList.find(nav => nav.path === path)
    if (currentnav) {
        if (user.type === 'dashen') {
            navList[1].hide = false
        } else if (user.type === 'laoban') {
            navList[0].hide = false
        }
    }
    return (
      <div>
        {currentnav ? <NavBar>{currentnav.title}</NavBar> : null}
        <Switch>
          {
              navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}></Route>)
          }
          <Route path='/dasheninfo' component={DashenInfo}></Route>
          <Route path='/laobaninfo' component={LaobanInfo}></Route>
          <Route path='/chat/:userid' component={Chat}></Route>
        </Switch>
          {currentnav ? <NavFooter navList={this.navList} unReadCount={this.props.unReadCount}></NavFooter> : null}
      </div>
    )
  }
}
export default connect(
    (state) => ({
        user: state.user,
        unReadCount: state.msglist.unReadCount
    }),
    {getUser}
)(Main)