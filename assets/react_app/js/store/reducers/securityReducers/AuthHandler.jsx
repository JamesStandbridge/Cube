/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

const initialState = {
	token: null, user: null
}

function AuthHandler(state = initialState, action) {
	let nextState
	let newStateData
	switch(action.type) {
		case 'RESET_AUTH':
			return initialState;

		case 'RESET_TOKEN':
			nextState = {...state, token: null}
			return nextState;

		case 'RESET_USER':
			nextState = {...state, user: null}
			return nextState;
		
		case 'SET_AUTH':
			nextState = {...state, token: action.auth.token, user: action.auth.user}
			return nextState;

		case 'SET_TOKEN':
			nextState = {...state, token: action.token}
			return nextState;

		case 'SET_USER':
			nextState = {...state, user: action.user}
			return nextState;
			
		default:
			return state;
	}
}

export default AuthHandler;

