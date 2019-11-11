import React, { useState, useEffect } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import './Side.css'

const Side = props => {

	const [Selected, setSelected] = useState('')

	useEffect(() => {
		let unlisten = props.history.listen( (location, action) => {
			setSelected(location.pathname.substr(1))
		});
		return () => {
			unlisten()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			{ Selected ? <Redirect to={`/${Selected}`} /> : <></> }
			<Menu mode="inline" theme="dark" className="Menu-main" selectedKeys={[Selected]} onSelect={ n => setSelected(n.key) } >
				<Menu.Item key="home">
					<Icon type="home" />
					<span>Home</span>
				</Menu.Item>
				<Menu.Item key="trending">
					<Icon type="fire" />
					<span>Trending</span>
				</Menu.Item>

				<Menu.Divider></Menu.Divider>

				<p className="divider browse" >Browse</p>

				<Menu.Item key="genre">
					<Icon type="fork" />
					<span> Genre</span>
				</Menu.Item>
				<Menu.Item key="artist">
					<Icon type="audio" />
					<span> Artist</span>
				</Menu.Item>
				<Menu.Item key="album">
					<Icon type="folder" />
					<span> Album</span>
				</Menu.Item>

				<Menu.Divider className="missing" />

				<Menu.Item key='pricing' className='missing link-item'>Pricing</Menu.Item>
				<Menu.Item key='faq' className='missing link-item'>FAQ</Menu.Item>
				<Menu.Item key='contact' className='missing link-item'>Call us</Menu.Item>

				<Menu.Divider className="missing" />
				
				<Menu.Item key='admin' className='missing link-item'>Privacy Policy</Menu.Item>
				<Menu.Item key='terms' className='missing link-item'>Terms Of Use</Menu.Item>
				<p className='missing browse2 link-item'>&copy; 2019 Soox.</p>
				<p className='missing browse2 link-item'>All Rights Reserved</p>
				
			</Menu>
		</div>
	)
}

export default withRouter(Side)