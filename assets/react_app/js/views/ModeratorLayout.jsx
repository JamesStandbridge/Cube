import React from 'react';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

//icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PowerSettingsNewIcon from '@material-ui/icons/ExitToApp';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


import 'react-pro-sidebar/dist/css/styles.css';

const ModeratorLayout = ({children, onDisconnect, isCollapsed, collapse}) => {
	const appBarClassName = () => {
		if(isCollapsed) return "app-bar-collapse"
		return "app-bar"
	}
	
	return (
		<>
			<div className="app-nav-bar">
				<ProSidebar collapsed={isCollapsed}>
					<SidebarHeader>
						<h1 className={isCollapsed ? "collapse" : null}>Cube</h1>
					</SidebarHeader>
					<SidebarContent>
						<Menu iconShape="square" popperArrow={true}>
							<MenuItem icon={<DashboardIcon className="navbar-icon"/>}>Tableau de bord <Link to="/" replace/> </MenuItem>
							<MenuItem icon={<MenuBookIcon className="navbar-icon"/>}>Catalogue<Link to="/catalogue" replace/> </MenuItem>
							<SubMenu title="Modération" icon={<VisibilityIcon className="navbar-icon"/>}>
								<MenuItem className="sub-item"> Ressources <Link to="/moderation/resources" replace/></MenuItem>
								<MenuItem className="sub-item"> Commentaires <Link to="/moderation/commentaires" replace/></MenuItem>
							</SubMenu>   
 						</Menu>
					</SidebarContent>
					<SidebarFooter>

					</SidebarFooter>
				</ProSidebar>
			</div>

			<div className={appBarClassName()}>
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

export default ModeratorLayout;