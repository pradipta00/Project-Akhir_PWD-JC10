import React, { useState, useContext } from "react";
import { Cookies } from 'react-cookie'

import { GlobalState } from '../../Core'
import { auth } from '../../services'
import { Modal, Input, Icon, Row, Col, message } from "antd";

const Login = (props) => {

	const [Username, setUsername] = useState(null)
	const [Password, setPassword] = useState(null)

	const { setUser } = useContext(GlobalState);

	let LogIn = _ => {
		auth.Login({Username, Password})
		.then( res => {
			if(res.logged){

				delete res['password']
				delete res['logged']
			
				auth.getToken(res).then( res => {
					let cookie = new Cookies();
					cookie.set('auth', res.data , { path : '/' })
				}).catch( err => console.log('Error get token => ' + err) )
				
				setUser(res)
				message.success('Hi, ' + res.fullname)
				props.dismiss()
			}else{
				message.error('Username/Password invalid')
			}
		})
		.catch( err => console.log(err))
	}

	return (
		<Modal
			title="Login"
			visible={props.show}
			okText="Login"
			onOk={LogIn}
			cancelText="Cancel"
			onCancel={props.dismiss}
		>
			<Row>
				<Col span={16} offset={4}>
					<Input type="text" placeholder="Username / Email" autoFocus value={Username} onChange={_=>setUsername(_.target.value)}  prefix={ <Icon type='user' /> } style={{marginBottom : '1rem'}} />
					<Input type="password" placeholder="Password" value={Password} onChange={_=>setPassword(_.target.value)}  prefix={ <Icon type='lock' /> } />
				</Col>
			</Row>
		</Modal>
	);
};

export default Login;
