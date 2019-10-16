import React, { useState } from 'react'

import { Modal, Input, Icon, Tooltip, Typography, message } from "antd";

import { Register as Submit } from '../../services'

const Register = props => {

    const [Email, setEmail] = useState();
    const [Username, setUsername] = useState();
    const [Password, setPassword] = useState();
    const [Fullname, setFullname] = useState();

	const [ErrorUser, setErrorUser] = useState();
	const [ErrorEmail, setErrorEmail] = useState();
	
	let sendRegister = _ => {
		setErrorUser(false); setErrorEmail(false);
		let data = { Email, Username, Password, Fullname }

		Submit(data).then(response => { 
			if(response.success){
				props.success()
				props.dismiss()
				message.success("Account Created!")
			} else if (response.error === 'username') { setErrorUser(true) }
			else if( response.error === 'email' ) { setErrorEmail(true) }

		})

	}
		

    return (
		<Modal
			title="Create your Account"
			visible={props.show}
			okText="Register"
			onOk={sendRegister}
			cancelText="Cancel"
			onCancel={props.dismiss}
		>
			<Input type="text" placeholder="Full name" value={ Fullname } onChange={_ => setFullname(_.target.value)} className='mb-1' />
			
			<Typography.Text strong type='danger' 
			style={{ display : [ErrorUser ? 'block' : 'none'] }} > Username already exist </Typography.Text>
			
			<Input type="text" placeholder="Username" value={Username} onChange={_ => setUsername(_.target.value)} 
			prefix={ <Icon type='user' /> } 
			suffix={ <Tooltip title="Username can only includes letters, numbers, - or _"><Icon type="info-circle"/></Tooltip> } 
			className="mb-1" />
			
			<Typography.Text strong type='danger' 
			style={{ display : [ErrorEmail ? 'block' : 'none'] }} > Email already exist </Typography.Text>
			
			<Input type="email" placeholder="Email" value={Email} onChange={_=>setEmail(_.target.value)} 
			prefix={ <Icon type='mail'/> } />
			
			<Input type="password" placeholder="Password" value={Password} onChange={_=>setPassword(_.target.value)}  
			prefix={ <Icon type='lock' /> } 
			suffix={ <Tooltip title="Password must be at minimum 8 letters"><Icon type="info-circle"/></Tooltip> } 
			className="mb-1 mt-1" />

		</Modal>
    )
}

export default Register
