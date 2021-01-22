/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import Store from './store/configureStore';

import Router from './Router';

require("../css/main.css");

const CubeApp = () => {
	return (
		<Provider store={ Store }>
			<Router />
		</Provider>
	);	
}

const rootElement = document.getElementById("root");
ReactDOM.render(<CubeApp />, rootElement);