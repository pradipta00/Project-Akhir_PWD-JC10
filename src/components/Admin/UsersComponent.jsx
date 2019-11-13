import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Typography, Button, Popconfirm, message } from 'antd'
import { auth, files } from '../../services'
import moment from 'moment'

const { Title } = Typography
const Main = () => {

    useEffect(() => {
        refresh()
    }, [])

    const [Users, setUsers] = useState([])
    const [Transaction, setTransaction] = useState([])

    let users = [
        {
            title : 'Username',
            dataIndex : 'username',
        },
        {
            title : 'Email',
            dataIndex : 'email',
        },
        {
            title : 'Email verify',
            dataIndex : 'approved',
            render : data => data ? 'Approved' : 'Not Yet'
        },
        {
            title : 'Fullname',
            dataIndex : 'fullname',
        },
        {
            title : 'Roles',
            dataIndex : 'roles',
        },
        {
            title : 'Premium End',
            dataIndex : 'premiumend',
            render : data => moment(new Date(data)).format('DD-MM-YYYY HH:mm')
        },
        {
            title : 'Action',
            dataIndex : 'id',
            render : data => <Button type='danger' onClick={ _ => alert(data) } >Delete</Button>
        }
    ]

    let transaction = [
        {
            title : 'Username',
            dataIndex : 'userId',
            render : id => {
                if (Users.length) 
                    var user = Users.find(item => item.id === id);
                return user ? user['username'] : 'User not found / Deleted'
            }
        },
        {
            title : 'Files',
            dataIndex : 'files',
            width : 250,
            render : data => <img src={files.payment(data)} alt='' width='20%' onClick={_=> window.open(files.payment(data), '_blank')} style={{cursor:'pointer'}} />
        },
        {
            title : 'Type',
            dataIndex : 'type',
        },
        {
            title : 'Date',
            dataIndex : 'date',
            render : data => moment(new Date(data)).format('DD-MM-YYYY HH:mm')
        },
        {
            title : 'Approve',
            dataIndex : 'approved',
            render : (approve , list) => approve ? <Button disabled>Approve</Button> : <Popconfirm title='Are you sure?' onConfirm={_=>confirmTransaction(list.id, list.userId, list.type)} ><Button>Approve</Button></Popconfirm>
        },
    ]

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