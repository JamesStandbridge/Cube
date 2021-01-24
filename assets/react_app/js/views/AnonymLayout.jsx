import React from 'react';
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
					<Toolbar>
						<IconButton edge="start" color="inherit" aria-label="menu">
							<MenuIcon />
						</IconButton>
						<Typography variant="h6">
							Accueil
						</Typography>
						<div className="app-bar-actions">
						<Link to="/login" replace>
							<Button className="btn" variant="contained" >Se connecter</Button>
						</Link>
						<Link to="/register" replace>
							<Button className="btn" variant="contained" >Créer un compte</Button>
						</Link>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		</>
	)
}

export default AnonymLayout;