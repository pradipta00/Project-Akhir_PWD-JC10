import React, { useState } from 'react'

import logo from '../../images/Soox.svg';
import { Row, Col, Button, Input, Icon } from 'antd'
import './Nav.css'

import Login from '../Login'
import Register from '../Register'

const Nav = (props) => {

    const [ShowLogin, setShowLogin] = useState(false)
    const [ShowRegister, setShowRegister] = useState(false)

    return (
        <div>
            <Row type='flex' justify="space-between">
                <Col span={3} className="d-flex j-cont-sa ai-c ">
                    <Button type="link" onClick={props.koleps}>
                        <Icon type={props.koleps2 ? 'swap' : 'menu'} className="burger" />
                    </Button>
                    <img src={logo} alt="" className="Logo" />
                </Col>
                <Col span={6} >
                    <Input suffix={<Icon type="search" />}
                        type="text" placeholder="Cari seleramu" className="input-1" />
                </Col>
                <Col span={4} className="d-flex j-cont-r ai-c">
                    <Button type="link" onClick={ _=> setShowLogin(true) } > Log in </Button>
                    <Button type="primary" onClick={_=> setShowRegister(true)} > Sign up </Button>
                </Col>
            </Row>
            <Login show={ShowLogin} dismiss={_=>setShowLogin(0)} />
            <Register show={ShowRegister} dismiss={_=>setShowRegister(0)} />
        </div>
    )
}

export default Nav
