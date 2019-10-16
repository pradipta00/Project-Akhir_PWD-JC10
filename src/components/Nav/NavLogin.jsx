import React, { useState } from 'react'

import logo from '../../images/Soox.svg';
import { Row, Col, Button, Input, Icon } from 'antd'
import './Nav.css'

const Nav = (props) => {

    let logout = _ => (null);

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
                    <Button type="primary" onClick={logout} > Log out </Button>
                </Col>
            </Row>
        </div>
    )
}

export default Nav
