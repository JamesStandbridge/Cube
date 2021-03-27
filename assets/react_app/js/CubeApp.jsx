/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import Store from './store/configureStore';

import 'fontsource-roboto';

import { SnackbarProvider } from 'react-snackbar-alert';



import Router from './Router'

require("../css/main.css");
require("../css/cubeApp.scss");

const CubeApp = () => {


	return (
		
		<Provider store={ Store }>	
			<SnackbarProvider position="top-right">
				<Router />
			</SnackbarProvider>
		</Provider>

	);	
}

const rootElement = document.getElementById("root");
ReactDOM.render(<CubeApp />, rootElement);