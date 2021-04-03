import React, {useContext, useEffect, useState} from 'react'
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import { Redirect } from 'react-router-dom';
import {
    Checkbox,
    TextField,
    Button,
    TextareaAutosize,
    InputLabel,
    Select,
    MenuItem,
    FormControl, makeStyles, Input, Chip, Icon, Fab
} from '@material-ui/core';


import ResourceRepository from "../../../services/ORM/repository/ResourceRepository"

import { wrapComponent } from 'react-snackbar-alert';

import ResourceAttributeRepository from "../../../services/ORM/repository/ResourceAttributeRepository";
import ResourceTypeRepository from "../../../services/ORM/repository/TypeResourceRepository";
import CategoryRepository from "../../../services/ORM/repository/CategoryRepository";

require("../../../../css/resource.css");

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },

}));


const ResourceForm = wrapComponent(function({ createSnackbar, dispatch, AuthHandler}) {

    const classes = useStyles();
    const [ loading, setLoading ] = useState(true)
    const [ resourceAttributes, setResourceAttributesList ] = useState([])
    const [ resourceTypeList, setResourceTypeList ] = useState([])
    const [ resourceCategoryList, setResourceCategoryList ] = useState([]);
    const [ resourceType, setResourceType ] = useState( '')
    const [ resourceAttribute, setResourceAttribute ] = useState( '')
    const [ resourceCategory, setResourceCategory ] = useState( '')
    const [ resource, setResource ] = useState({
        title: {value: "", error: ""},
        createdAt: {value: new Date()},
        author:{value: `/api/users/${AuthHandler.user.id}`},
        type: {
            value:"",
        },
        category: { value:""},
        content: [
            {
                stringValue: {value: ""},
                textValue: {value: ""},
                attribute:{value: ""}
            }
        ]
    })

    useEffect(() => {
        const init = async () => {
            let resType = await ResourceTypeRepository.getResourceTypesList(AuthHandler.token);
            const resourceTypes = resType.data["hydra:member"];
            setResourceTypeList(resourceTypes);

            let resAttr = await ResourceAttributeRepository.getResourceAttributeList();
            const newResourceAttributes = resAttr.data["hydra:member"];
            setResourceAttributesList(newResourceAttributes);

            let resCat = await CategoryRepository.getCategoriesList();
            const resourceCategories = resCat.data["hydra:member"];
            setResourceCategoryList(resourceCategories);
            setLoading(false)

        }
        setLoading(true)
        init()
    }, [])



    function showSnackbar(theme, message) {
        createSnackbar({
            message: message,
            dismissable: true,
            pauseOnHover: true,
            theme: theme,
        });
    }

    const handleChange = (event) => {

        const value = event.currentTarget.value
        setResource(
            {
                ...resource,
                title: {...resource.title, value, error: ""},
                content: [
                    {
                        stringValue: {...resource.content.stringValue, value},
                        textValue: {...resource.content.textValue, value}
                    }
                ]
            }
        )

        console.log(resource)
    }

    const handleChangeType = (event) => {
        setResourceType(event.target.value)
    }

    const handleChangeAttribute = (event) => {
        setResourceAttribute(event.target.value)
    }

    const handleChangeCategory = (event) => {
        setResourceCategory(event.target.value)
    }

    const handleSubmit = () => {
        console.log(resource.content[0].textValue.value)
        console.log(resource.content[0].stringValue.value)
        //let contentType = resource.content.textValue !== "" ? 'textValue':'stringValue';
        //let value = resource.content.textValue !== "" ? resource.content.textValue.value : resource.content.stringValue.value


        const resourceToSend = {

            author:resource.author.value,
            title: resource.title.value,
            type: resourceType,
            createdAt: resource.createdAt.value,
            content:[
                {
                    stringValue: resource.content[0].stringValue.value,
                    textValue: resource.content[0].textValue.value,
                    attribute: resourceAttribute
                }
            ]
            ,
            category: resourceCategory
        }
        console.log(resourceToSend)

        ResourceRepository.create(resourceToSend,AuthHandler.token).then(res => {
            showSnackbar('success', "Nouvelle ressource enregistrée")
        })
    }

    const validateForm = () => {
        let bool = true

        if(resource.title.value.trim().length === 0) {
            bool = false
            setResource({...resource, title: {...resource.title, error: "Le title est requis"}})
        }

        return bool
    }

    const checkContentValue=(attributes, attributeUri)=>{

        let attribute = attributeUri.resourceAttribute.split('/')
        let attributeIdSelect = attribute[3]
        let  contentType=""

        for (let i = 0; i < attributes.resourceAttributes.length; i++) {
            let id = attributes.resourceAttributes[i].id
            //let id = attributes.resourceAttributes.id

            if (id.toString() === attributeIdSelect ) {
                contentType = attributes.resourceAttributes[i].type
                //contentType = attributes.resourceAttributes.type
                switch (contentType) {
                    case 'textArea':
                        return (
                            <div>
                                <TextareaAutosize
                                    title="ContentText"
                                    variant="outlined"
                                    onChange={handleChange}
                                    size="small"
                                />
                            </div>
                        )
                    case 'file':
                        return (
                            <TextField
                                title="ContentString"
                                type="file"
                                variant="outlined"
                                onChange={handleChange}
                                size="small"
                            />
                        )
                    default:
                        return (
                            <TextField
                                title="ContentString"
                                type="url"
                                variant="outlined"
                                onChange={handleChange}
                                size="small"
                            />)

                }
            }
       }
    }

    const addAttributeContent=(click)=> {
        console.log(click)
        return (
            <div>
                <li id={click++}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="resourceAttribute-label">resourceAttribute</InputLabel>
                        <Select
                            labelId="resourceAttribute-label"
                            id="resourceAttribute"
                            value={resourceAttribute}
                            onChange={handleChangeAttribute}
                            label="resourceAttribute"
                        >
                            {
                                resourceAttributes.map(
                                    resourceAttribute => (
                                        <MenuItem key={'/api/resource_attributes/'+ resourceAttribute.id}
                                                  value={'/api/resource_attributes/'+ resourceAttribute.id}
                                        >
                                            {resourceAttribute.label} {resourceAttribute.type}
                                        </MenuItem>
                                    )
                                )
                            }
                        </Select>
                    </FormControl>
                    {resourceAttribute !== "" ? (
                        <div>
                            {checkContentValue({resourceAttributes},{resourceAttribute})}
                        </div>
                    ):(
                        <p>Veuillez selectionner un attribut</p>
                    )
                    }
                </li>
            </div>
        )
    }

    let i;
    let click;
    return (

        <div>
            {loading ? null : (
                <div>
            {
                resource.title.error !== "" ? (
                    <TextField
                        error
                        title="Title"
                        variant="outlined"
                        onChange={handleChange}
                        helperText={resource.title.error}
                        size="small"
                    />
                ) : (
                    <TextField
                        title="Title"
                        variant="outlined"
                        onChange={handleChange}
                        size="small"
                    />
                )}
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="resourceCategory-label">resourceCategory</InputLabel>
                <Select
                    labelId="resourceCategory-label"
                    id="resourceCategory"
                    value={resourceCategory}
                    onChange={handleChangeCategory}
                    label="resourceCategory"
                >
                    {
                        resourceCategoryList.map(
                            resourceCategory => (
                                <MenuItem key={'api/categories/' + resourceCategory.id}
                                          value={'/api/categories/' + resourceCategory.id}
                                >
                                    {resourceCategory.label}
                                </MenuItem>
                            )
                        )
                    }
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="resourceType-label">Type</InputLabel>
                <Select
                    labelId="resourceType-label"
                    id="resourceType"
                    value={resourceType}
                    onChange={handleChangeType}
                    label="resourceType"
                >
                    {
                        resourceTypeList.map(
                            resourceType => (
                                <MenuItem key={'/api/resource_types/' + resourceType.id}
                                          value={'/api/resource_types/' + resourceType.id}
                                >
                                    {resourceType.label}
                                </MenuItem>
                            )
                        )
                    }
                </Select>
            </FormControl>

            {resourceType !== "" ? (
                <div>
                    <ul>
                        <li id={click=0}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="resourceAttribute-label">resourceAttribute</InputLabel>
                                <Select
                                    labelId="resourceAttribute-label"
                                    id="resourceAttribute"
                                    value={resourceAttribute}
                                    onChange={handleChangeAttribute}
                                    label="resourceAttribute"

                                >
                                    {
                                        resourceTypeList.map(
                                            resourceTypeSelect => (
                                                resourceType === '/api/resource_types/'+ resourceTypeSelect.id ? (
                                                    resourceTypeSelect.attributes.map(
                                                        resourceAttribute => (
                                                            <MenuItem
                                                                key={'/api/resource_attributes/' + resourceAttribute.id}
                                                                value={'/api/resource_attributes/' + resourceAttribute.id}
                                                            >
                                                                {resourceAttribute.label} {resourceAttribute.type}
                                                            </MenuItem>
                                                            )
                                                        )
                                                ): null
                                            )
                                        )
                                    }
                                </Select>
                            </FormControl>
                            {resourceAttribute !== "" ? (
                                <div>
                                    {checkContentValue({resourceAttributes}, {resourceAttribute})}

                                </div>
                            ) : (
                                <p>Veuillez selectionner un attribut</p>
                            )
                            }
                        </li>
                    </ul>
                </div>

            ) : (
                <p>Veuillez selectionner un type de ressource</p>
            )}


            <Button
                onClick={handleSubmit}
                color='primary'
                variant="contained"
            >
                Envoyer
            </Button>

                </div>
            )}
        </div>
    )
})

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(ResourceForm)

/*<Fab size="small"
color="secondary"
aria-label="add"
className={classes.margin}
onClick={addAttributeContent(click)}>
    <AddIcon/>
    </Fab>*/


