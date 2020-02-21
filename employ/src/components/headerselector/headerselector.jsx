import React from 'react'
import PropTypes from 'prop-types'
import {
    List,
    Grid
} from 'antd-mobile'
export default class HeaderSelector extends React.Component {
    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }
    state = {
        icon: null
    }
    handleClick = ({text, icon}) => {
        this.setState({
            icon
        })
        this.props.setHeader(text)
    }
    constructor(props) {
        super(props)
        this.headerlist = []
        for(var i=0; i<20; i++){
            this.headerlist.push({
                icon: require(`../../assets/images/头像${i+1}.png`),
                text: `头像${i+1}`
            })
        }
    }
    render() {
        const {icon} = this.state
        const headertitle = icon ? <div>已选择的头像是: <img src={icon} alt="icon"/></div> : '请选择头像'
        return (
            <div>
                <List renderHeader={() => headertitle}>
                    <Grid data={this.headerlist} columnNum={5} onClick={this.handleClick}></Grid>
                </List>
            </div>
        )
    }
}