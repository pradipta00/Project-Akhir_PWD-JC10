import React, { useState, useReducer } from 'react'

import { Modal, Input, Icon, Tooltip, Typography, message } from "antd";

import { auth } from '../../services'

const initialState = {
	Email : null,
	Username : null,
	Password : null,
	Fullname : null
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'Email':
			return {...state, Email : action.payload}
		case 'Password':
			return {...state, Password : action.payload}
		case 'Username':
			return {...state, Username : action.payload}
		case 'Fullname':
			return {...state, Fullname : action.payload}
		default:
			return state
	}
}

const Register = props => {

	const [Data, dispatch] = useReducer(reducer, initialState)
	
	const [ErrorUser, setErrorUser] = useState();
	const [ErrorEmail, setErrorEmail] = useState();
	
	
	let sendRegister = _ => {
		setErrorUser(false); setErrorEmail(false);

		auth.Register(Data).then(response => { 
			if( response.success ){
				props.success(); props.dismiss();
				message.success("Account Created!");
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
			<Input type="text" placeholder="Full name" value={Data.Fullname} onChange={e => dispatch({type : 'Fullname', payload : e.target.value})} className='mb-1' />
			
			<Typography.Text strong type='danger' style={{ display : [ErrorUser ? 'block' : 'none'] }} > Username already exist </Typography.Text>
			<Input type="text" placeholder="Username" value={Data.Username} onChange={e => dispatch({type : 'Username', payload : e.target.value})} prefix={ <Icon type='user' /> } suffix={ <Tooltip title="Username can only includes letters, numbers, - or _"><Icon type="info-circle"/></Tooltip> } className="mb-1" />
			
			<Typography.Text strong type='danger' style={{ display : [ErrorEmail ? 'block' : 'none'] }} > Email already exist </Typography.Text>
			<Input type="email" placeholder="Email" value={Data.Email} onChange={e => dispatch({type : 'Email', payload : e.target.value})} prefix={ <Icon type='mail'/> } />
			<Input type="password" placeholder="Password" value={Data.Password} onChange={e => dispatch({type : 'Password', payload : e.target.value})} prefix={ <Icon type='lock' /> } suffix={ <Tooltip title="Password must be at minimum 8 letters"><Icon type="info-circle"/></Tooltip> } className="mb-1 mt-1" />
		</Modal>
    )
}

export default Register
