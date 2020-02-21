import React from 'react'
import {connect} from 'react-redux'
import HeaderSelector from '../../components/headerselector/headerselector'
import {updateUser} from "../../redux/action";
import {Redirect} from 'react-router-dom'
import {
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from 'antd-mobile'
class Laobaninfo extends React.Component {
    state = {
        post: '',
        company: '',
        salary: '',
        header: '',
        info: ''
    }
    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }
    setHeader = (header) => {
        this.setState({
            header
        })
    }
    saveUser = () => {
        this.props.updateUser(this.state)
    }
    render() {
        const {header, type} =this.props.user
        if (header) {
            const path = type === 'dashen' ? '/dashen' : '/laoban'
            return <Redirect to={path}></Redirect>
        }
        return (
            <div>
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}></HeaderSelector>
                <InputItem onChange={(val) => {this.handleChange('post', val)}}>招聘职位:</InputItem>
                <InputItem onChange={(val) => {this.handleChange('company', val)}}>公司名称:</InputItem>
                <InputItem onChange={(val) => {this.handleChange('salary', val)}}>职位薪资:</InputItem>
                <TextareaItem title='职位要求' rows='3' onChange={(val) => {this.handleChange('info', val)}}></TextareaItem>
                <Button type='primary' onClick={this.saveUser}>保存</Button>
            </div>
        )
    }
}
export default connect(
    (state) => ({user: state.user}),
    {updateUser}
)(Laobaninfo)