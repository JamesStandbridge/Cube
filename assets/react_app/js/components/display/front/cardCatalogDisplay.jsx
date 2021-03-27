import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import ResourceRepository from "../../../services/ORM/repository/ResourceRepository";
import {GridList, GridListTile, Link, makeStyles} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import * as tileData from "core-js";


import ResourceStateRepository from '../../../services/ORM/repository/ResourceStateRepository'

require("../../../../css/resource.css");
const useStyles = makeStyles((theme) => ({
    rootCard: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    root: {
        display: 'flex',
        flex:1,
        flexWrap: 'wrap',
        justifyContent: 'space-around',

    },
    gridList: {
        width: 1500,
        height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
}));
const CardCatalogDisplay = ({AuthHandler, dispatch, ResourceUserStateHandler}) => {
    const classes = useStyles();

    useEffect(() => {
        const init = async () => {
            let res = await ResourceRepository.getResourceList();
            console.log(res);
            const newResource = res.data["hydra:member"];
            setResources(newResource);
        }
        init()

    }, [])
    const [ resources, setResources ] = useState([])

    const handleFavoriteChange = (resourceID) => {
        ResourceStateRepository.updateFavorite(resourceID, AuthHandler.token).then(res => {
            dispatch({type: "RESET_UPDATE_RESOURCE_STATES"})
        })
    }

    const handleAsideChange = (resourceID) => {
        ResourceStateRepository.updateAside(resourceID, AuthHandler.token).then(res => {
            dispatch({type: "RESET_UPDATE_RESOURCE_STATES"})
        })
    }

    return (
        <div>
            {console.log('RENDER', resources )}
            <p>Card Ressource</p>
            <div className={classes.root}>
                <GridList cellHeight={400} className={classes.gridList} cols={3}>

            {
                resources.map(resource => {

                    const stateIndex = ResourceUserStateHandler.resourceStates.findIndex(item => item.resource.id === resource.id)
                    let isFavorite = false
                    let isExploited = false
                    let isAside = false
                    if(stateIndex !== -1) {
                        isFavorite = ResourceUserStateHandler.resourceStates[stateIndex].isFavorite
                        isExploited = ResourceUserStateHandler.resourceStates[stateIndex].isExploited
                        isAside = ResourceUserStateHandler.resourceStates[stateIndex].isAside
                    }
                    console.log(isExploited)
                    return (
                        <GridListTile key={resource.id} cols={resource.cols || 1}>
                            <Card 
                                style={{
                                    backgroundColor: isExploited ? "#80808045" : "white"
                                }} 
                                className={classes.rootCard}
                            >
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" className={classes.avatar}>
                                            R
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={resource.title}
                                    subheader={resource.createdAt}
                                />
                                <CardMedia
                                    className={classes.media}
                                    image="https://wiki.tripwireinteractive.com/images/4/47/Placeholder.png"
                                    title="Paella dish"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {resource.category.label}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton onClick={() => handleFavoriteChange(resource.id)} aria-label="add to favorites">
                                        <FavoriteIcon style={{
                                            color: isFavorite ? "#f34f6b" : "#0000008a"
                                        }}/>
                                    </IconButton>
                                    <IconButton onClick={() => handleAsideChange(resource.id)} aria-label="add to aside resources">
                                        {isAside ? (
                                            <BookmarkIcon />
                                        ) : (
                                            <BookmarkBorderIcon />
                                        )}

                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>
                                    <IconButton
                                        href={`/catalogue/${resource.id}`}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                            {/*    <h5><a href={`/catalogue/${resource.id}`}>{resource.title}</a></h5>*/}
                            {/*<p>{resource.createdAt}</p>*/}
                            {/*<p>{resource.category.label}</p>*/}

                        </GridListTile>
                    )
                })
            }


                </GridList>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(CardCatalogDisplay)