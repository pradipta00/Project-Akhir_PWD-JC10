import React, { useState } from 'react'
import { Icon, Menu } from 'antd'
import Music from './MusicComponent'
import Users from './UsersComponent'

const AdminDashboard = () => {

    const [Display, setDisplay] = useState('music')

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
            </Menu>
            <div>
                {
                    Display === 'music' ?
                    <Music />
                    :
                    <Users />
                }
            </div>
        </div>
    );
}

export default AdminDashboard
