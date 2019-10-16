import React, { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'

import GuestLanding from './pages/GuestLanding'
import Nav from './components/Nav/Nav'
import Side from './components/Sidebar/Side'
import Player from './components/Player/Player'

import { StateProvider } from './context'

import { Layout } from 'antd'
const { Header, Content, Sider, Footer } = Layout

const App = () => {

	const [Sidebar, setSidebar] = useState(false)
	let collaps = _ => setSidebar(e => !e)

	const [User, setUser] = useState(false);

	return (
		<StateProvider value={{ User, setUser }}>
			<Layout style={{height : '100vh'}}>
				<Header>
					<Nav hide={collaps} status={Sidebar}/>
				</Header>
				
				<Layout>
					<Sider collapsible collapsed={Sidebar} style={{overflow: 'auto', scrollbarWidth : 'none'}} trigger={null}>
						<Side />
					</Sider>

					<Content style={{backgroundColor : '#232323', paddingTop : '10px', paddingBottom : '10px'}}>

						<BrowserRouter>
							<Route path="/" exact render={() => <GuestLanding />} />
						</BrowserRouter>

					</Content>
				</Layout>
				
				<Footer>
					<Player />
				</Footer>

			</Layout>
		</StateProvider>
	)
}

export default App