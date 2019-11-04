import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Cookies } from 'react-cookie'

import { GlobalState } from './Core'
import './App.css'
import NavGuest from './components/Nav/NavGuest'
import NavLogin from './components/Nav/NavLogin'
import Side from './components/Sidebar/Side'
import Player from './components/Player'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import Album from './pages/Album'

import { auth } from './services'
import { Layout } from 'antd'

const { Header, Content, Sider, Footer } = Layout

const App = () => {

	const [Sidebar, setSidebar] = useState(false)
	const { setUser, User } = useContext(GlobalState)
	
	let collaps = _ => setSidebar(e => !e)
	
	useEffect(() => {
		let cookie = new Cookies();
		let existing = cookie.get('auth')

		if (existing) auth.verifyToken(existing).then( res => {
			if ( !res.error ) setUser( res.data )
			if ( res.error ) cookie.remove('auth');
		}).catch( err => console.log(err) )	

		return undefined
	}, [setUser])


	return (
		<BrowserRouter>
			<Layout style={{height : '100vh'}}>
				<Header>
					{ User.logged ? <NavLogin hide={collaps} status={Sidebar} /> : <NavGuest hide={collaps} status={Sidebar} />}
				</Header>
				
				<Layout>
					<Sider collapsible collapsed={Sidebar} style={{overflow: 'auto', scrollbarWidth : 'none'}} trigger={null}>
						<Side />
					</Sider>

					<Content style={{backgroundColor : '#777', paddingTop : '10px', paddingBottom : '10px'}}>
							<Route path="/" exact render={_=> <Home />} />
							<Route path="/home" render={_=> <Home />} />
							<Route path="/admin" render={_=> <AdminDashboard /> } />
							<Route path="/album" render={_=> <Album /> } />
					</Content>
				</Layout>
				
				<Footer>
					<Player />
				</Footer>

			</Layout>
		</BrowserRouter>
	)
}

export default App