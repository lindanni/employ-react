import React from 'react'
import {connect} from 'react-redux'
import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/action'
class Laoban extends React.Component {
    componentDidMount() {
        this.props.getUserList('dashen')
    }
    render() {
        return (
            <div>
                <UserList userlist={this.props.userlist}></UserList>
            </div>
        )
    }
}
export default connect(
    state => ({userlist: state.userlist}),
    {getUserList}
)(Laoban)