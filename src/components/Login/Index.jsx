import React, { useState } from "react";

import { Modal } from "antd";

const Login = (props) => {

	const [Visible, setVisible] = useState(false)

	if(props.show) {
		setVisible(true)
	}

	return (
		<div>
			<Modal
			title="Login"
			visible={Visible}
			onOk={_ => setVisible(false)}
			onCancel={_ => setVisible(false)}
			>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Modal>
		</div>
	);
};

export default Login;
