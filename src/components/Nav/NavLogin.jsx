import React, { useContext } from 'react'
import { Cookies } from 'react-cookie'
import { withRouter } from 'react-router-dom'

import logo from '../../images/Soox.svg';
import { Row, Col, Button, Input, Icon } from 'antd'
import { GlobalState } from '../../Core'

import './Nav.css'

const NavLogin = (props) => {

    const { setUser } = useContext(GlobalState)
    const cookie = new Cookies();
    
    let logout = _ => {
        cookie.remove('auth')
        setUser(false)
    }

    return (
        <div>
            <Row type='flex' justify="space-between">
                <Col lg={8} sm={10} xs={12} className="d-flex j-cont-l ai-c ">
                    <Button type="link" onClick={props.hide}>
                        <Icon type={props.status ? 'swap' : 'menu'} className="burger" />
                    </Button>
                <img src={logo} alt="" className="Logo" onClick={_=> props.history.push('/')} width={100} />
                </Col>
                <Col lg={8} sm={4} xs={0} >
                    <Input suffix={<Icon type="search" />}
                        type="text" placeholder="Find your music" className="input-1" />
                </Col>
                <Col lg={8} sm={10} xs={12} className="d-flex j-cont-r ai-c">
                    <Button type="primary" onClick={logout} > Log out </Button>
                </Col>
            </Row>
        </div>
    )
}

export default withRouter(NavLogin)