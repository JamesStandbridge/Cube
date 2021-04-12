import React from 'react';
import { Link } from 'react-router-dom';
import MUILink from '@material-ui/core/Link';

//navbar
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

//material ui
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


//icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PowerSettingsNewIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';



const CitizenLayout = ({children, onDisconnect, isCollapsed, collapse}) => {
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
							<MenuItem icon={<DashboardIcon className="navbar-icon"/>}>Tableau de bord <Link to="/dashboard" replace/> </MenuItem>
							<SubMenu title="Ressources" icon={<MenuBookIcon className="navbar-icon"/>}>
								<MenuItem className="sub-item"> Catalogue <Link to="/catalogue" replace/></MenuItem>
								<MenuItem className="sub-item"> Mes ressources <Link to="/mesRessources" replace/></MenuItem>
								<MenuItem className="sub-item"> Nouvelle ressource <Link to="/ressources/nouveau" replace/></MenuItem>
								<MenuItem className="sub-item"> Importer un media <Link to="/media/nouveau" replace/></MenuItem>
							</SubMenu>
							<MenuItem icon={<PeopleAltIcon className="navbar-icon"/>}>Mes relations<Link to="/relations" replace/> </MenuItem>
 
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
							<Link to={`/profil`}>
								<IconButton>
									<AccountCircleIcon />
								</IconButton>
							</Link>
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

export default CitizenLayout;