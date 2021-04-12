import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import clsx from 'clsx'
import { format } from "date-fns"


import {
    IconButton,
    Button,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    Typography,
    GridList,
    GridListTile,
    Link,
    makeStyles,
    Checkbox,
    TextField
} from "@material-ui/core"

import { red } from "@material-ui/core/colors"

import VisibilityIcon from '@material-ui/icons/Visibility'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import FilterListIcon from '@material-ui/icons/FilterList'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import ResourceRepository from "../../../services/ORM/repository/ResourceRepository"
import ResourceStateRepository from '../../../services/ORM/repository/ResourceStateRepository'
import CategoryRepository from '../../../services/ORM/repository/CategoryRepository'
import RelationRepository from '../../../services/ORM/repository/RelationRepository'


require("../../../../css/resource.css")
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
        flex:1,
        flexWrap: 'wrap',
        justifyContent: 'space-around',

    },
    gridList: {
        width: 1500,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
}));

const CardCatalogDisplay = ({AuthHandler, dispatch, ResourceUserStateHandler}) => {
    const classes = useStyles()
    const [ resources, setResources ] = useState([])
    const [ categories, setCategories ] = useState([])
    const [ relations, setRelations ] = useState([])
    const [ filters, setFilters ] = useState({
        categories: [],
        relations: [],
        title: "",
        dateFrom: "",
        dateTo: "",
        page: 0
    })
    const [ expanded, setExpanded ] = useState(false)

    const isConnected = AuthHandler.token != null

    const fetchResources = async (customFilters = null) => {
        const filtersToUse = customFilters != null ? customFilters : filters
        console.log(filtersToUse)
        let res = await ResourceRepository.searchResources(filtersToUse)
        setResources(res.data.resources)
    }

    useEffect(() => {
        fetchResources()
    }, [])

    useEffect(() => {
        const fetchCategory = async () => {
            let res = await CategoryRepository.getCategoriesList()
            setCategories(res.data["hydra:member"])
        }
        fetchCategory()
    }, [])

    useEffect(() => {
        const fetchRelations = async () => {
            let relations = await RelationRepository.getRelationTypes()
            setRelations(relations)
        }
        fetchRelations()       
    }, [])

    const handleResetFilters = () => {
        const newFilters = {
            categories: [],
            relations: [],
            title: "",
            dateFrom: "",
            dateTo: "",
            page: 0
        }
        setFilters(newFilters)
        fetchResources(newFilters)
    }

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

    const handleChange = ({currentTarget}) => {
        setFilters({...filters, [currentTarget.name]: currentTarget.value})
    }

    const expand = () => {
        setExpanded(!expanded)
    }

    const changePage = (value) => {
        if (filters.page + value < 0) return 
        if (filters.page + value + 1 > Math.ceil(totalCount / 15)) return
        const newFilters = {...filters, page: filters.page + value}
        setFilters(newFilters)
        fetchResources(newFilters)
    }

    const totalCount = resources.length > 0 ? resources[0].count : 0

    return (
        <div>

            <FilterAccordeon onClick={expand}>
                <FilterListIcon />
               <h2 style={{marginLeft: "10px"}}>Filtres</h2>
               {expanded ? (
                    <ArrowDropDownIcon />
                ) : (
                    <ArrowRightIcon />
                )}
            </FilterAccordeon>

            <FilterBox isExpanded={expanded}>
                <FilterBoxHeader>
                    <Results>
                        <strong style={{marginRight: "5px"}}>{totalCount}</strong> résultat(s) trouvé(s) pour cette recherche
                    </Results>
                    <FilterBoxActions>
                        <Button 
                            color="primary"
                            style={{color: "#577590"}}
                            onClick={handleResetFilters}
                        >
                            Reinitialiser
                        </Button>
                        <Button 
                            variant="contained" 
                            color="secondary"
                            style={{backgroundColor: "#fe4a49"}}
                            onClick={() => fetchResources(null)}
                        >
                            Appliquer
                        </Button>
                    </FilterBoxActions>
                </FilterBoxHeader>
                <h3>Meta-données</h3>
                
                <Filter>
                    <TextField
                        label="Titre de la ressource"
                        value={filters.title}
                        onChange={handleChange}
                        name="title"
                        style={{marginRight: "70px"}}
                    />
                    <TextField
                        label="Date from"
                        type="date"
                        name="dateFrom"
                        value={filters.dateFrom}
                        onChange={handleChange}
                        style={{marginRight: "70px"}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Date to"
                        value={filters.dateTo}
                        onChange={handleChange}
                        type="date"
                        name="dateTo"
                        style={{marginRight: "70px"}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Filter>

                <h3>Relations</h3>
                <Filter>
                    {relations.map(relation => {
                        const index = filters.relations.findIndex(item => item.id === relation.id)

                        const handleCheckRelation = () => {
                            const newRelations = [...filters.relations]
                            if(index !== -1) {
                                newRelations.splice(index, 1)
                            } else {
                                newRelations.push(relation) 
                            } 
                            setFilters({...filters, relations: newRelations})
                        }

                        return (
                            <FilterLine key={relation.id}>
                                <Checkbox
                                    checked={index !== -1}
                                    onChange={handleCheckRelation}
                                />
                                <FilterTitle onClick={handleCheckRelation}>
                                    {relation.label}
                                </FilterTitle>
                            </FilterLine>
                        )
                    })}
                </Filter>
                <h3>Categories</h3>
                <Filter>
                    {categories.map(category => {
                        const index = filters.categories.findIndex(item => item.id === category.id)

                        const handleCheckCategory = () => {
                            const newCategories = [...filters.categories]
                            if(index !== -1) {
                                newCategories.splice(index, 1)
                            } else {
                                newCategories.push(category) 
                            } 
                            setFilters({...filters, categories: newCategories})
                        }          

                        return (
                            <FilterLine key={category.id}>
                                <Checkbox
                                    checked={index !== -1}
                                    onChange={handleCheckCategory}
                                />
                                <FilterTitle onClick={handleCheckCategory}>
                                    {category.label}
                                </FilterTitle>
                            </FilterLine>
                        )
                    })}
                </Filter>
            </FilterBox>

            <Pagination>
                <CurrentPage>
                    page {filters.page + 1} - {Math.ceil(totalCount / 15)}
                </CurrentPage>
                <PageBTN>
                    <IconButton  onClick={() => changePage(-1)}>
                        <ChevronLeftIcon/>
                    </IconButton>
                    <IconButton onClick={() => changePage(1)}>
                        <ChevronRightIcon />
                    </IconButton>
                </PageBTN>
            </Pagination>

            <ResourceList className={classes.root}>
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
                    
                    const categoryIndex = categories.findIndex(item => item.id === resource.category_id)
                    console.log(resource)
                    return (
                        <GridListTile key={resource.id} cols={resource.cols || 1}>
                            <Card 
                                style={{
                                    backgroundColor: isConnected && isExploited ? "#80808045" : "white"
                                }} 
                                className={classes.rootCard}
                            >
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" className={classes.avatar}>
                                            R
                                        </Avatar>
                                    }
                                    title={resource.title}
                                    subheader={format(Date.parse(resource.created_at), "d MMM yyyy")}
                                />
                                <CardMedia
                                    className={classes.media}
                                    image="https://wiki.tripwireinteractive.com/images/4/47/Placeholder.png"
                                    title="Paella dish"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {categories[categoryIndex]?.label}
                                    </Typography>
                                </CardContent>
                                    
                                        <CardActions disableSpacing>
                                            {isConnected ? (
                                                <>
                                                    <IconButton onClick={() => handleFavoriteChange(resource.id)} aria-label="add to favorites">
                                                        <FavoriteIcon style={{
                                                            color: isFavorite ? "#E71D36" : "#0000008a"
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
                                                </>
                                            ) : (null)} 
                                            {`${resource.number_views} `}<VisibilityIcon /> 
                                            <Button 
                                                className="btn" 
                                                variant="contained" 
                                                style={{
                                                    backgroundColor: "#FE4A49",
                                                    marginLeft: "auto",
                                                    color: "white"
                                                }}
                                                href={`/catalogue/${resource.id}`}
                                            >
                                                Voir
                                            </Button>

                                            

                                        </CardActions>
                                                                 
                            </Card>
                        </GridListTile>
                    )
                })
            }


                </GridList>
            </ResourceList>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(CardCatalogDisplay)

const ResourceList = styled.div`
    margin-left: 6%;
`

const FilterBox = styled.div`
    border: solid 1px gainsboro;
    padding: 20px;
    margin-bottom: 75px;
    z-index: 1000;
    -moz-transition: height .5s;
    -ms-transition: height .5s;
    -o-transition: height .5s;
    -webkit-transition: height .5s;
    transition: height .5s;
    display: ${props => props.isExpanded ? "block" : "none"};
`

const Filter = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 30px;
`

const FilterLine = styled.div`
    display: flex;
    align-items: center;
`

const FilterTitle = styled.h3`
    font-size: 14px;
    margin: 0;
    cursor: pointer;
`

const FilterBoxHeader = styled.div`
    display: flex;
`

const FilterBoxActions = styled.div`
    margin-left: auto;
`

const Results = styled.p`
    display: flex;
    font-style: italic;
`

const FilterAccordeon = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`

const Pagination = styled.div`
    display: flex;
    align-items: center;
    margin: 48px 0;
`

const CurrentPage = styled.h3`

`

const PageBTN = styled.div`
    display: flex;
`