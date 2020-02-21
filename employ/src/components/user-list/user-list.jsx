import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {
    WingBlank,
    WhiteSpace,
    Card
} from 'antd-mobile'
const Header = Card.Header
const Body = Card.Body
class UserList extends React.Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }
    render() {
        const userlist = this.props.userlist
        return (
            <WingBlank style={{marginTop: '50px', marginBottom: '50px'}}>
                {
                    userlist.map(user => (
                        <div key={user._id}>
                            <WhiteSpace></WhiteSpace>
                            <Card onClick={()=> {this.props.history.push(`/chat/${user._id}`)}}>
                                <Header
                                    thumb={require(`../../assets/images/${user.header}.png`)}
                                    extra={user.username}>
                                </Header>
                                <Body>
                                    <div>职位: {user.post}</div>
                                    {user.company ? <div>公司: {user.company}</div> : null}
                                    {user.salary ? <div>薪资: {user.salary}</div> : null}
                                    <div>描述: {user.info}</div>
                                </Body>
                            </Card>
                        </div>
                    ))
                }
            </WingBlank>
        )
    }
}
export default withRouter(UserList)