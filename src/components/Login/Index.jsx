import React, { useState, useContext } from "react";
import { Modal, Input, Icon, Row, Col, message } from "antd";
import { Login as Masuk } from '../../services'
import GlobalState from '../../context'

const Login = (props) => {

	const [username, setUsername] = useState(null)
	const [password, setPassword] = useState(null)

	const newUser = useContext(GlobalState);
	const User = useContext(GlobalState);

	let LogIn = _ => {
		console.log(User)
		Masuk({username, password})
		.then( res => {
			if(res.logged){
				newUser(res)
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
					<Input type="text" placeholder="Username / Email" value={username} onChange={_=>setUsername(_.target.value)}  prefix={ <Icon type='user' /> } style={{marginBottom : '1rem'}} />
					<Input type="password" placeholder="Password" value={password} onChange={_=>setPassword(_.target.value)}  prefix={ <Icon type='lock' /> } />
				</Col>
			</Row>
		</Modal>
	);
};

export default Login;
