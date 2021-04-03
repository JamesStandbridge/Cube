/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

const initialState = {
	list: [],
	isUpdated: false
}

function UserListHandler(state = initialState, action) {

	switch(action.type) {
		case 'REPLACE_USER_LIST': 
			return {...state, list: action.list, isUpdated: true}

		case 'RESET_UPDATE_USER_LIST':
			return {...state, isUpdated: false}

		default:
			return state;
	}
}

export default UserListHandler;

