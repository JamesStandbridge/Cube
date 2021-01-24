import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';

//icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PowerSettingsNewIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import 'react-pro-sidebar/dist/css/styles.css';

const AdminLayout = ({children, onDisconnect, isCollapsed, collapse}) => {
	return (
		<>
			<div className="app-nav-bar">
				<ProSidebar collapsed={isCollapsed}>
					<SidebarHeader>
						<h1>Cube</h1>
					</SidebarHeader>
					<SidebarContent>
						<Menu iconShape="square" popperArrow={true}>
							<MenuItem icon={<DashboardIcon className="navbar-icon"/>}>Tableau de bord <Link to="/compte/boutiques" replace/> </MenuItem>
						</Menu>
					</SidebarContent>
					<SidebarFooter>

					</SidebarFooter>
				</ProSidebar>
			</div>

			<div className="app-bar">
				<AppBar position="static">
					<Toolbar>
						<IconButton onClick={collapse}>
						<MenuIcon />
						</IconButton>
						<Typography variant="h6">
							Accueil
						</Typography>
						<div className="app-bar-actions">
							<IconButton>
								<AccountCircleIcon />
							</IconButton>
							<IconButton onClick={onDisconnect}>
								<PowerSettingsNewIcon />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		</>
	)
}

export default AdminLayout;