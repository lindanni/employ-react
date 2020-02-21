import React from 'react'
import {connect} from 'react-redux'
import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/action'
class Dashen extends React.Component {
    componentDidMount() {
        this.props.getUserList('laoban')
    }
    render() {
        return (
            <div className='dashen-wrap'>
                <UserList userlist={this.props.userlist}></UserList>
            </div>
        )
    }
}
export default connect(
    state => ({userlist: state.userlist}),
    {getUserList}
)(Dashen)