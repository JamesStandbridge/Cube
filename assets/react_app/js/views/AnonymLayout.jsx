import React from 'react';
import styled from 'styled-components'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
	
import WaveSVG from '../../img/background-waves.svg'

import { Link } from 'react-router-dom';

import 'react-pro-sidebar/dist/css/styles.css';

const AnonymLayout = ({children}) => {

	console.log(WaveSVG)
	return (
		<div>
			<AppBar className="app-bar full">
				<AppBarContent>
					<CubeTitle className="app-title">
						CUBE
					</CubeTitle>
					<AppActions className="app-bar-actions">
						<Link to="/login" replace>
							<Button 
								className="btn connect"
							 	variant="contained" 
							 	style={{
							 		backgroundColor: "#577590",
									color: "white"
								}}
							>
							Se connecter
							</Button>
						</Link>
						<Link to="/register" replace>
							<Button 
								className="btn register" 
								variant="contained" 
								style={{
									backgroundColor: "#FE4A49",
									marginLeft: "25px",
									color: "white"
								}}
							>
							Créer un compte
							</Button>
						</Link>
					</AppActions>

				</AppBarContent>
				<WabeBar>

				</WabeBar>
			</AppBar>
		</div>
	)
}

export default AnonymLayout;

const AppBar = styled.div`
	background-image: url(${WaveSVG});
	background-image: rebeccapurple;
    background-repeat: no-repeat;
    background-size: 100% 42.555%;
`

const AppActions = styled.div`
    margin-top: 50px;
    margin-right: 50px;
`

const CubeTitle = styled.h1`
    text-align: center;
    font-size: 100px;
    margin-top: 64px;
    margin-bottom: 28px;
    margin-left: 43.7%;
    color: white;
`

const AppBarContent = styled.div`
	display: flex;
`

const WabeBar = styled.div`
	
`