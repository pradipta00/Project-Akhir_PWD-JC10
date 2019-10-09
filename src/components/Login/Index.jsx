import React, { useState } from "react";

import { Modal, Input, Icon, Row, Col } from "antd";

const Login = (props) => {

	const [Uname, setUname] = useState(null)
	const [Pass, setPass] = useState(null)

	let submid = _ => alert(Uname + " " + Pass )

	return (
		<Modal
			title="Login"
			visible={props.show}
			okText="Login"
			onOk={submid}
			cancelText="Cancel"
			onCancel={props.dismiss}
		>
			<Row>
				<Col span={16} offset={4}>
					<Input type="text" placeholder="Username / Email" value={Uname} onChange={_=>setUname(_.target.value)}  prefix={ <Icon type='user' /> } style={{marginBottom : '1rem'}} />
					<Input type="password" placeholder="Password" value={Pass} onChange={_=>setPass(_.target.value)}  prefix={ <Icon type='lock' /> } />
				</Col>
			</Row>
		</Modal>
	);
};

export default Login;
