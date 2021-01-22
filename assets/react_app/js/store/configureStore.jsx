/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import { createStore } from 'redux';
import combineReducers from './reducers/reducerIndex';

import TokenManager from '../services/security/TokenManager'

// export default createStore(
// 	combineReducers,
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );


function saveToLocalStore(state) {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('cube-app-state', serializedState);
	} catch(e) {
		console.log(e);
	}
}

function loadFromLocalStorage() {
	try {
		const serializedState = localStorage.getItem('cube-app-state');
		if (serializedState === null) {
			return undefined
		} else {
			let state = JSON.parse(serializedState);
			if(TokenManager.isExpired(state.AuthHandler.token)) {
				const nextAuthHandler = {
					token: null,
					user: null
				}
				state = {...state, AuthHandler: nextAuthHandler}
			}
			return state
		}
	} catch(e) {
		console.log(e);
		return undefined;
	}
}

const persistedState = loadFromLocalStorage();

const store = createStore(
	combineReducers,
	persistedState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveToLocalStore(store.getState()));

export default store
