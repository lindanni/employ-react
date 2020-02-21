import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import './nav-footer.less'
import {
    TabBar
} from 'antd-mobile'
const Item = TabBar.Item
class NavFooter extends React.Component {
    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    }
    render() {
        let navList = this.props.navList
        navList = navList.filter(nav => nav.hide)
        const path =this.props.location.pathname
        return (
            <div className='nav-footer'>
                <TabBar>
                    {
                        navList.map(nav => (
                            <Item key={nav.path}
                                  title={nav.text}
                                  icon={{uri: require(`./images/${nav.icon}.png`)}}
                                  selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                                  selected={path === nav.path}
                                  onPress={() => this.props.history.replace(nav.path)}
                                  badge={nav.path === '/message' ? this.props.unReadCount : 0}
                            ></Item>)
                        )
                    }
                </TabBar>
            </div>
        )
    }
}
export default withRouter(NavFooter)
