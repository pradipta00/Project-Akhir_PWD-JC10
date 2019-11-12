import React, { useContext, useState, useEffect } from 'react'
import { Cookies } from 'react-cookie'
import { Redirect } from 'react-router-dom'

import { Row, Col, Button, Input, Icon, Avatar, Dropdown, Menu } from 'antd'
import logo from '../../images/Soox.svg';
import { GlobalState } from '../../Core'

import Login from '../Login'
import Register from '../Register'

import './Nav.css'

const Nav = (props) => {

    const [ShowLogin, setShowLogin] = useState(false)
    const [ShowRegister, setShowRegister] = useState(false)
    const [RedirToThis, setRedirToThis] = useState('')

    useEffect(() => {
        setTimeout(() => {
            if (RedirToThis) setRedirToThis('')
        }, 500);
    }, [RedirToThis])

    const { setUser, User } = useContext(GlobalState)
    const cookie = new Cookies();
    let logout = _ => {
        cookie.remove('auth')
        setUser(false)
        window.location = '/'
    }

    const menu = (
        <Menu>
			<Menu.Item onClick={_=> setRedirToThis('/account')} >
				<span>
				My account
				</span>
			</Menu.Item>
			{
				User.roles === 'presiden' ?
				<Menu.Item onClick={_ => setRedirToThis('/admin')}>
					<span >
					Admin
					</span>
				</Menu.Item> : ''
			}
			<Menu.Divider />
			<Menu.Item onClick={logout} >
				<span>
				Log out
				</span>
			</Menu.Item>
        </Menu>
    )
    
    const RightComponentLogin = (
        <>
        <Dropdown placement='bottomRight' overlay={menu} >
            <Button type='link' style={{ color : '#fff', fontSize : '0.9rem', position : 'absolute', top : '10px', paddingBottom : '2.5rem' }} >
            {User ? User.username : ''}
                &nbsp;&nbsp;
                <Avatar style={{ verticalAlign: 'middle' }} size="large" shape='square'>
                {User ? User.fullname.match(/(^[^ ]|(?:\b)(\w))/g).join('') : ''}
                </Avatar>
            </Button>
        </Dropdown>
        </>
    )

    return (
        <div>
            { RedirToThis ? <Redirect to={RedirToThis} /> : '' }
            <Row type='flex' justify="space-between">
                <Col lg={8} sm={10} xs={12} className="d-flex j-cont-l ai-c ">
                    <Button type="link" onClick={props.hide}>
                        <Icon type={props.status ? 'swap' : 'menu'} className="burger" />
                    </Button>
                <img src={logo} alt="" className="Logo" onClick={_=> setRedirToThis('/home')} width={100} />
                </Col>
                <Col lg={8} sm={4} xs={0} >
                    <Input 
                        suffix={<Icon type="search" />}
                        type="text" placeholder="Find your music" className="input-1" />
                </Col>
                <Col lg={8} sm={10} xs={12} className="d-flex j-cont-r ai-c">

                    { User ?
                        RightComponentLogin
                        :
                        <><Button type="link" onClick={ _=> setShowLogin(true) } > Log in </Button>
                        <Button type="primary" onClick={_=> setShowRegister(true)} > Sign up </Button></>
                    }

                </Col>
            </Row>

            <Login show={ShowLogin} dismiss={_=>setShowLogin(false)} />
            <Register show={ShowRegister} dismiss={_=>setShowRegister(false)} success={_=>setShowLogin(true)}/>
        </div>
    )
}

export default Nav