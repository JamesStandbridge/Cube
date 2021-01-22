/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React from 'react'

import LoginForm from '../../components/form/security/LoginForm'
import SingleLayout from '../../views/SingleLayout'

const Login = (props) => {
	return (
		<SingleLayout>
			<LoginForm />
		</SingleLayout>
	)
}

export default Login;