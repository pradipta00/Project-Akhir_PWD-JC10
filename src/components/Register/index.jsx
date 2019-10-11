import React, { useState } from 'react'

import { Modal, Input, Icon, Row, Col, Tooltip, Typography, message } from "antd";

import { Register as Submit } from '../../services'

const Register = props => {

    const [Email, setEmail] = useState();
    const [Username, setUsername] = useState();
    const [Password, setPassword] = useState();
    const [Firstname, setFirstname] = useState();
	const [Lastname, setLastname] = useState();

	const [ErrorUser, setErrorUser] = useState();
	const [ErrorUser2, setErrorUser2] = useState();
	const [ErrorEmail, setErrorEmail] = useState();
	
	
	let submid = _ => {
		setErrorUser(false); setErrorEmail(false);
		let data = { Email, Username, Password, Fullname : `${Firstname} ${Lastname}` }

		Submit(data).then(response => { 
		
			if(response.success){
				props.success()
				props.dismiss()
				message.success("Account Created!")
			} else {
				switch(response.error){
					case "username" :
						setErrorUser(true); break;
					case "email" :
						setErrorEmail(true); break;
					default : break;
				}
			}

		})

	}
		

    return (
		<Modal
			title="Create your Account"
			visible={props.show}
			okText="Register"
			onOk={submid}
			cancelText="Cancel"
			onCancel={props.dismiss}
		>
			<Row style={{marginBottom : '1rem'}}>
				<Col span={11}>
                    <Input type="text" placeholder="First name" value={Firstname} onChange={_ => setFirstname(_.target.value)} />
				</Col>
				<Col span={11} offset={2}>
                    <Input type="text" placeholder="Last name" value={Lastname} onChange={_ => setLastname(_.target.value)} />
				</Col>
			</Row>
			<Typography.Text strong type='danger' style={{ display : [ErrorUser ? 'block' : 'none'] }} > Username already exist </Typography.Text>
			<Typography.Text strong type='danger' style={{ display : [ErrorUser2 ? 'block' : 'none'] }} > Your username includes forbidden character </Typography.Text>
            <Input type="text" placeholder="Username" value={Username} onChange={_ => setUsername(_.target.value)} prefix={ <Icon type='user' /> } suffix={ <Tooltip title="Username can only includes letters, numbers, - or _"><Icon type="info-circle"/></Tooltip> } style={{marginBottom : '1rem'}} />
			<Typography.Text strong type='danger' style={{ display : [ErrorEmail ? 'block' : 'none'] }} > Email already exist </Typography.Text>
            <Input type="email" placeholder="Email" value={Email} onChange={_=>setEmail(_.target.value)} prefix={ <Icon type='mail'/> } />
            <Input type="password" placeholder="Password" value={Password} onChange={_=>setPassword(_.target.value)}  prefix={ <Icon type='lock' /> } suffix={ <Tooltip title="Password must be at minimum 8 letters"><Icon type="info-circle"/></Tooltip> } style={{marginBottom : '1rem', marginTop : '1rem'}} />
		</Modal>
    )
}

export default Register
