import React, { useState, useContext } from 'react'
import { Icon, Menu } from 'antd'
import { GlobalState } from '../Core'
import { Redirect } from 'react-router-dom'
import Music from '../components/Admin/MusicComponent'
import Users from '../components/Admin/UsersComponent'
import Statistics from '../components/Admin/Statistics'

const AdminDashboard = () => {

    const [Display, setDisplay] = useState('music')
    const {User} = useContext(GlobalState)

    if (User.roles !== 'presiden') return <Redirect to='/home' />

    return (
        <div style={{ backgroundColor : 'aliceblue' }} >
            <Menu selectedKeys={[Display]} mode="horizontal" onClick={e => setDisplay(e.key)} id='bar' >
                <Menu.Item key="music">
                    <Icon type="customer-service" />
                    Music
                </Menu.Item>
                <Menu.Item key="user">
                    <Icon type="user" />
                    User Account
                </Menu.Item>
                <Menu.Item key="stat">
                    <Icon type="bar-chart" />
                    Statistics
                </Menu.Item>
            </Menu>
            <div>
                {
                    Display === 'music' ?
                    <Music />
                    :
                    Display === 'user' ?
                    <Users />
                    :
                    <Statistics />
                }
            </div>
        </div>
    );
}

export default AdminDashboard
