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

	const waveStyle = {
		position: "absolute",
		zIndex: "1",
		top: "-5px"
	}

	return (
		<>
			<AppBar className="app-bar-full">
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
				
				<svg style={waveStyle} className="wave-background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path fill="#fca938" fillOpacity="1" d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,202.7C672,224,768,224,864,202.7C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
				</svg>
			
			</AppBar>
		</>
	)
}
//<Wave className="wave-background">
export default AnonymLayout;

const AppBar = styled.div`
	position: relative;	
`

const AppActions = styled.div`
    margin-top: 50px;
    margin-right: 50px;
    z-index: 1000;
`

const CubeTitle = styled.h1`
    text-align: center;
    font-size: 100px;
    margin-top: 64px;
    margin-bottom: 28px;
    margin-left: 43.7%;
    color: white;
    z-index: 1000;
`

const AppBarContent = styled.div`
	display: flex;
`

const Wave = styled.div`
	position: absolute;
`