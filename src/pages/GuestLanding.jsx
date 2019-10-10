import React, { useState } from 'react'

import Nav from '../components/Nav/Nav'
import Side from '../components/Sidebar/Side'
import Footer from '../components/Player/Footer'
import Banner from '../components/Banner'

import { Layout } from 'antd'
const { Header, Sider, Content } = Layout


const GuestLanding = () => {

    const [sideCol, setSideCol] = useState(0);

	let koleps = () => {
		setSideCol(!sideCol)
	}

    return (
        <Layout style={{height : '100vh'}}>
            <Header>
                <Nav koleps={koleps} koleps2={sideCol}/>
            </Header>
            <Layout>
                <Sider collapsible collapsed={sideCol} style={{overflow: 'auto', scrollbarWidth : 'none'}} trigger={null}>
                    <Side />
                </Sider>
                <Content style={{backgroundColor : '#232323', paddingTop : '10px', paddingBottom : '10px'}}>
                    <Banner />
                </Content>
            </Layout>
            <Layout.Footer>
                <Footer />
            </Layout.Footer>
        </Layout>
    )
}

export default GuestLanding
