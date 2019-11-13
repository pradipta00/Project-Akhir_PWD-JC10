import React, { useEffect, useState } from 'react'

import { Row, Col, Typography } from 'antd'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { auth } from '../../services'

const { Title } = Typography

const Main = () => {

    const [Transaction, setTransaction] = useState([])
    const [Users, setUsers] = useState([])
    const [dailyViews, setdailyViews] = useState([])
    const [monthlyViews, setmonthlyViews] = useState([])

    useEffect(() => {
        auth.get('transactionCount').then( res => setTransaction(res.data) )
        auth.get('usersCount').then( res => setUsers(res.data) )
        auth.get('dailyViews').then( res => setdailyViews(res.data) )
        auth.get('monthlyViews').then( res => setmonthlyViews(res.data) )
    }, [])

    const month = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const data = arr => arr.map(item => {
        let result = {};
        for (const [key, value] of Object.entries(item)) {
            if (key === 'Month')
                result[key] = month[value]
            else result[key] = value
        }
        return result
    })

    return (
        <>
            <Row style={{ padding : '3rem 0' }} >
                <Col span={10} offset={1} >
                    <Title level={3}>Transaction Chart</Title>
                    <BarChart
                        width={600}
                        height={500}
                        data={data(Transaction)}
                        margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="Month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar maxBarSize={100} dataKey="Transaction" stackId="a" fill="#81f4e1" />
                    </BarChart>
                </Col>

                <Col span={10} offset={1} >
                    <Title level={3}>User Chart</Title>
                    <BarChart
                        width={600}
                        height={500}
                        data={data(Users)}
                        margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="Roles" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar maxBarSize={100} dataKey="Total" stackId="a" fill="#56cbf9" />
                    </BarChart>
                </Col>

                <Col span={10} offset={1} >
                    <Title level={3}>Daily Views Chart</Title>
                    <BarChart
                        width={600}
                        height={500}
                        data={data(dailyViews)}
                        margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="Date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar maxBarSize={100} dataKey="Total" stackId="a" fill="#ff729f" />
                    </BarChart>
                </Col>

                <Col span={10} offset={1} >
                    <Title level={3}>Monthly Views Chart</Title>
                    <BarChart
                        width={600}
                        height={500}
                        data={data(monthlyViews)}
                        margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="Month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar maxBarSize={100} dataKey="Total" stackId="a" fill="#f17300" />
                    </BarChart>
                </Col>
            </Row>
        </>
    );
}

export default Main