import React from 'react';
import styled from 'styled-components'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';

import 'react-pro-sidebar/dist/css/styles.css';

const AnonymLayout = ({children}) => {


	return (
		<>
			<div className="app-bar full">
				<AppBar position="static">
					<AppBarContent>
					<CubeTitle className="app-title">
						CUBE
					</CubeTitle>
					<Toolbar style={{marginLeft: "auto"}}>
						<div className="app-bar-actions">
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
						</div>
					</Toolbar>
					</AppBarContent>
				</AppBar>
			</div>
		</>
	)
}

export default AnonymLayout;

const CubeTitle = styled.h1`
	text-align: center;
    font-size: 60px;
    margin-top: 28px;
    margin-bottom: 28px;
    margin-left: 46.7%;
`

const AppBarContent = styled.div`
	display: flex;
`