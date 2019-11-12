import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Typography, Button, Popconfirm, message } from 'antd'
import { auth, files } from '../../services'

const { Title } = Typography
const Main = () => {

    useEffect(() => {
        refresh()
    }, [])

    const [Users, setUsers] = useState([])
    const [Transaction, setTransaction] = useState([])

    let refresh = _ => {
        auth.get('users').then(res => setUsers(res.data)).catch(err => console.trace(err))
        auth.get('transaction').then(res => setTransaction(res.data)).catch(err => console.trace(err))
    }

    let confirmTransaction = (id, userId, type) => {
        auth.update({table : 'transaction', id, userId, type})
        .then( res => {
            if (res.error) message.error('Failed to update. ' + res.message)
            else message.success('User is now a premium')
        }).catch( err => console.trace(err) ).then(_=>refresh())
    }

    return (
        <>
            <Row style={{ padding : '3rem 0' }} >
                <Col span={16} offset={4} >
                    <Title level={3}>Users Table</Title>
                    <Table rowKey='id' columns={users} dataSource={Users} 
                    style={{ backgroundColor : '#fff' }} />
                </Col>
                <Col span={16} offset={4} >
                    <Title level={3}>Transaction Table</Title>
                    <Table rowKey='id' columns={transaction} dataSource={Transaction} 
                    style={{ backgroundColor : '#fff', maxWidth : '100%' }} />
                </Col>
            </Row>
        </>
    );
}

export default Main