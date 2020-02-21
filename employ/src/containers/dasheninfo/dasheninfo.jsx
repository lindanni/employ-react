import React from 'react'
import {connect} from 'react-redux'
import HeaderSelector from '../../components/headerselector/headerselector'
import {updateUser} from '../../redux/action'
import {Redirect} from 'react-router-dom'
import {
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from 'antd-mobile'
class Dasheninfo extends React.Component {
    state = {
        header: '',
        post: '',
        info: ''
    }
    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }
    saveUser = () => {
        this.props.updateUser(this.state)
    }
    setHeader = (header) => {
        this.setState({
            header
        })
    }
    render() {
        const {header, type} =this.props.user
        if (header) {
            const path = type === 'dashen' ? '/dashen' : '/laoban'
            return <Redirect to={path}></Redirect>
        }
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}></HeaderSelector>
                <InputItem onChange={(val) => {this.handleChange('post', val)}}>求职岗位:</InputItem>
                <TextareaItem title='个人介绍' rows='3' onChange={(val) => {this.handleChange('info', val)}}></TextareaItem>
                <Button type='primary' onClick={this.saveUser}>保存</Button>
            </div>
        )
    }
}
export default connect(
    (state) => ({user: state.user}),
    {updateUser}
)(Dasheninfo)