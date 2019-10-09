import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import GuestLanding from './pages/GuestLanding'
import './App.css'

const App = () => {

	return (
		<BrowserRouter>
			<Route path="/" exact render={() => <GuestLanding />} />
		</BrowserRouter>
	)
}

export default App