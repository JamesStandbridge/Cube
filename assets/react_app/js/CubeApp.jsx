import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const CubeApp = () => {
	return (
		<p>React Cube Application</p>
	);	
}

const rootElement = document.getElementById("root");
ReactDOM.render(<CubeApp />, rootElement);