import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import './App.css'

import GuestLanding from './pages/GuestLanding'
import NavGuest from './components/Nav/NavGuest'
import NavLogin from './components/Nav/NavLogin'
import Side from './components/Sidebar/Side'
import Player from './components/Player/Footer'
import Test from './components/test/index'

import { StateProvider } from './context'
import { auth } from './services'

import { Layout } from 'antd'
const { Header, Content, Sider, Footer } = Layout

const App = () => {

	const [Sidebar, setSidebar] = useState(false)
	const [User, setUser] = useState(false);
	
	let collaps = _ => setSidebar(e => !e)
	let cookie = new Cookies();
	
	useEffect(() => {
		let existing = cookie.get('auth')
		if (existing) auth.verifyToken(existing).then( res => {
			if ( !res.error ) setUser( res.data )
			if ( res.error ) cookie.remove('auth');
		}).catch( err => console.log(err) )	
		return undefined
	})

	return (
		<StateProvider value={{ User, setUser }}>
			<Layout style={{height : '100vh'}}>
				<Header>
					{ User.logged ? <NavLogin hide={collaps} status={Sidebar}/> : <NavGuest hide={collaps} status={Sidebar}/>}
				</Header>
				
				<Layout>
					<Sider collapsible collapsed={Sidebar} style={{overflow: 'auto', scrollbarWidth : 'none'}} trigger={null}>
						<Side />
					</Sider>

					<Content style={{backgroundColor : '#777', paddingTop : '10px', paddingBottom : '10px'}}>
						<BrowserRouter>
							<Route path="/" exact render={_=> <GuestLanding />} />
							<Route path="/test" render={_=> <Test /> } />
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