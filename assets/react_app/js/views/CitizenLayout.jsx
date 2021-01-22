import React from 'react';

const CitizenLayout = ({children}) => {
	return (
		<div>
			<div className="app-body">
				{children}
			</div>
		</div>
	)
}

export default CitizenLayout;