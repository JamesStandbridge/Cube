/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import { combineReducers } from 'redux'
import AuthHandler from './securityReducers/AuthHandler'
import ResourceUserStateHandler from './resources/ResourceUserStateHandler'

export default combineReducers({
	AuthHandler,
	ResourceUserStateHandler
})