import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Cookies } from 'react-cookie'

import { GlobalState } from './Core'
import './App.css'

import Nav from './components/Nav'
import Side from './components/Sidebar/Side'
import Player from './components/Player'

import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import Account from './pages/Account'
import Pricing from './pages/Pricing'
import Album from './pages/Album'
import Genre from './pages/Genre'
import Trending from './pages/Trending'

import { auth } from './services'
import { Layout } from 'antd'

const { Header, Content, Sider, Footer } = Layout

const App = () => {

	const [Sidebar, setSidebar] = useState(false)
	const { setUser } = useContext(GlobalState)
	
	let collaps = _ => setSidebar(e => !e)
	
	useEffect(() => {
		let cookie = new Cookies();
		let existing = cookie.get('auth')
		
		if (existing) auth.verifyToken(existing).then( res => {
			if ( !res.data.error ) setUser( res.data )
			else cookie.remove('auth');
		}).catch( err => console.log(err) )	

		return undefined
	}, [setUser])


	return (
		<BrowserRouter>
			<Layout style={{height : '100vh'}}>
				<Header>
					<Nav hide={collaps} status={Sidebar} />
				</Header>
				
				<Layout>
					<Sider collapsible collapsed={Sidebar} style={{overflow: 'auto', scrollbarWidth : 'none'}} trigger={null}>
						<Side />
					</Sider>

					<Content style={{backgroundColor : '#222'}}>
						<Switch>
							<Route path="/home" component={Home} />
							<Route path="/admin" component={AdminDashboard} />
							<Route path="/account" component={Account} />
							<Route path="/pricing" component={Pricing} />
							<Route path="/album" component={Album} />
							<Route path="/genre" component={Genre} />
							<Route path="/trending" component={Trending} />
							
							<Route path="/faq" render={_=> ('ini faq') } />
							<Redirect to='/home' />
						</Switch>
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