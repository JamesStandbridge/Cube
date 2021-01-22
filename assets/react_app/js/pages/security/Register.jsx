/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React from 'react'

import RegisterForm from '../../components/form/security/RegisterForm'
import SingleLayout from '../../views/SingleLayout'

const Register = (props) => {
	return (
		<SingleLayout>
			<RegisterForm />
		</SingleLayout>
	)
}

export default Register;