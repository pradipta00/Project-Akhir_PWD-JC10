import React, { useState } from 'react'

import { Modal, Input, Icon, Row, Col, Tooltip } from "antd";

const Register = props => {

    const [Email, setEmail] = useState();
    const [Username, setUsername] = useState();
    const [Password, setPassword] = useState();
    const [Firstname, setFirstname] = useState();
    const [Lastname, setLastname] = useState();

    let submid = _ => alert(`${Email} ${Username} ${Password} ${Firstname} ${Lastname}`)

    return (
		<Modal
			title="Create your Account"
			visible={props.show}
			okText="Register"
			onOk={submid}
			cancelText="Cancel"
			onCancel={props.dismiss}
		>
			<Row>
				<Col span={11}>
                    <Input type="text" placeholder="First name" value={Firstname} onChange={_ => setFirstname(_.target.value)} />
				</Col>
				<Col span={11} offset={2}>
                    <Input type="text" placeholder="Last name" value={Lastname} onChange={_ => setLastname(_.target.value)} />
				</Col>
			</Row>
            <Input type="text" placeholder="Username" value={Username} onChange={_ => setUsername(_.target.value)} prefix={ <Icon type='user' /> } suffix={ <Tooltip title="Username can only be letters, numbers, or _ ! @ #"><Icon type="info-circle"/></Tooltip> } style={{marginBottom : '1rem', marginTop : '1rem'}} />
            <Input type="email" placeholder="Email" value={Email} onChange={_=>setEmail(_.target.value)} prefix={ <Icon type='mail'/> } />
            <Input type="password" placeholder="Password" value={Password} onChange={_=>setPassword(_.target.value)}  prefix={ <Icon type='lock' /> } suffix={ <Tooltip title="Password must be at minimum 8 letters"><Icon type="info-circle"/></Tooltip> } style={{marginBottom : '1rem', marginTop : '1rem'}} />
		</Modal>
    )
}

export default Register
