import React from 'react'

import { Menu, Icon, Button } from 'antd'
import './Side.css'

const Side = () => {

	return (
		<div>
			<Menu mode="inline" theme="dark" className="Menu-main" defaultSelectedKeys={['home']}>
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
				<div className="missing">
					<Button type="link" className="link-item">FAQ</Button>
					<Button type="link" className="link-item">Hubungi Kami</Button>
					<Button type="link" className="link-item">Masukkan</Button>
				</div>
				<Menu.Divider className="missing" />
				<div className="missing wissing">
					<Button type="link" className="browse2 link-item">Kebijakan Privasi</Button>
					<Button type="link" className="browse2 link-item">Persyaratan Penggunaan</Button>
					<p className="browse2">&copy; 2019 Soox.</p>
					<p className="browse2">All Rights Reserved</p>
				</div>
				
			</Menu>
		</div>
	)
}

export default Side