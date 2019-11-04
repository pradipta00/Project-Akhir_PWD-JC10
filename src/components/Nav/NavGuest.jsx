import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import logo from '../../images/Soox.svg';
import { Row, Col, Button, Input, Icon } from 'antd'
import './Nav.css'

import Login from '../Login'
import Register from '../Register'

const NavGuest = (props) => {

    const [ShowLogin, setShowLogin] = useState(false)
    const [ShowRegister, setShowRegister] = useState(false)

    return (
        <div>
            <Row type='flex' justify="space-between">
                <Col span={8} className="d-flex j-cont-l ai-c ">
                    <Button type="link" onClick={props.hide}>
                        <Icon type={props.status ? 'swap' : 'menu'} className="burger" />
                    </Button>
                <img src={logo} alt="" className="Logo" onClick={_=> props.history.push('/')} width={100} />
                </Col>
                <Col span={8} >
                    <Input suffix={<Icon type="search" />}
                        type="text" placeholder="Find your music" className="input-1" />
                </Col>
                <Col span={8} className="d-flex j-cont-r ai-c">
                    <Button type="link" onClick={ _=> setShowLogin(true) } > Log in </Button>
                    <Button type="primary" onClick={_=> setShowRegister(true)} > Sign up </Button>
                </Col>
            </Row>
            
            <Login show={ShowLogin} dismiss={_=>setShowLogin(0)} />
            <Register show={ShowRegister} dismiss={_=>setShowRegister(0)} success={_=>setShowLogin(1)}/>
            
        </div>
    )
}

export default withRouter(NavGuest)