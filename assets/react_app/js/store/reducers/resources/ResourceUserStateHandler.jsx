/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

const initialState = {
	resourceStates: [],
	isUpdated: false
}

function ResourceUserStateHandler(state = initialState, action) {

	switch(action.type) {
		case 'REPLACE_STATES': 
			return {...state, resourceStates: action.resourceStates, isUpdated: true}

		case 'RESET_UPDATE_RESOURCE_STATES':
			return {...state, isUpdated: false}

		case 'RESET_STATES':
			return initialState

		default:
			return state;
	}
}

export default ResourceUserStateHandler;

