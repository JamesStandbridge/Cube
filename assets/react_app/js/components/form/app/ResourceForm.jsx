import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    Checkbox,
    TextField,
    Button,
    TextareaAutosize,
    InputLabel,
    Select,
    MenuItem,
    FormControl, makeStyles
} from '@material-ui/core';


import ResourceRepository from "../../../services/ORM/repository/ResourceRepository"

import { wrapComponent } from 'react-snackbar-alert';

import DisplayResourceTypeList from "../../display/Resource/DisplayResourceTypesList";
import DisplayResourceAttributeList from "../../display/Resource/DisplayResourceAttributeList";
import DisplayResourceCategoriesList from "../../display/Resource/DisplayResourceCategoriesList";
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
}));

const ResourceForm = wrapComponent(function({createSnackbar, dispatch, AuthHandler}) {
    const classes = useStyles();
    useEffect(() => {
        const init = async () => {
            let resType = await ResourceTypeRepository.getResourceTypesList(AuthHandler.token);
            const resourceTypes = resType.data["hydra:member"];
            setResourceTypeList(resourceTypes);

            let resAttr = await ResourceAttributeRepository.getResourceAttributeList();
            const newResourceAttributes = resAttr.data["hydra:member"];
            setResourceAttributesList(newResourceAttributes);

            let res = await CategoryRepository.getCategoriesList();
            const resourceCategories = res.data["hydra:member"];
            setResourceCategoryList(resourceCategories);
        }
        init()
    }, [])

    const [ resourceAttributes, setResourceAttributesList ] = useState([])
    const [resourceTypeList, setResourceTypeList] = useState([])
    const [resourceCategoryList, setResourceCategoryList] = useState([]);

    const [ resource, setResource ] = useState({
        title: {value: "", error: ""},
        createdAt: {value: new Date()},
        author:{value:`api/users/9`},
        type: {
            label: {value:""},
            attributes:{
                label: {value:""}
            }
        },
        category: {
            label: {value: ""},
        },
        content: {
            stringValue: {value: ""},
            textValue: {value: ""}
        }
    })

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
                type: {
                    label: {...resource.type.label, value},
                    attributes: {
                        label: {...resource.type.attributes.label, value}
                    }
                },
                category: {
                    label: {...resource.category.label, value},
                },
                content: {
                    stringValue: {...resource.content.stringValue, value},
                    textValue: {...resource.content.textValue, value}
                }
            }
        )

    }

    const handleSubmit = () => {

            const resourceToSend = {
                title: resource.title.value,
                createdAt: resource.createdAt.value,
                author:resource.author.value,
                type: {
                    label: resource.type.label.value,
                    attributes: {
                        label: resource.type.attributes.label
                    }
                },
                category: {
                    label: resource.category.label,
                },
                content: {
                    stringValue: resource.content.stringValue,
                    textValue: resource.content.textValue
                }
            }



           ResourceRepository.create(resourceToSend, AuthHandler.token).then(res => {
                showSnackbar('success', "Nouvelle ressource enregistrée");
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

    return (
        <form onSubmit={handleSubmit}>
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
                <InputLabel id="resourceType-label">Type</InputLabel>
                <Select
                    labelId="resourceType-label"
                    id="resourceType"
                    value={resource.type.label}
                    onChange={handleChange}
                    label="resourceType"
                >
                    {
                        resourceTypeList.map(
                            resourceType =>(
                                <option key={resourceType.id}
                                          value={resourceType.label}
                                >
                                    {resourceType.label}
                                </option>
                            )
                        )
                    }
                </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="resourceAttribute-label">resourceAttribute</InputLabel>
                <Select
                    labelId="resourceAttribute-label"
                    id="resourceAttribute"
                    value={resource.type.attributes.label}
                    onChange={handleChange}
                    label="resourceAttribute"
                >
                    {
                        resourceAttributes.map(
                            resourceAttribute => (
                                <option key={resourceAttribute.id}
                                          value={resourceAttribute.label}
                                >
                                    {resourceAttribute.label}
                                </option>
                            )
                        )
                    }
                </Select>
            </FormControl>

            <FormControl variant="outlined" >
                <InputLabel id="resourceCategory-label">resourceCategory</InputLabel>
                <Select
                    labelId="resourceCategory-label"
                    id="resourceCategory"
                    value={resource.category.label}
                    onChange={handleChange}
                    label="resourceCategory"
                >
                    {
                        resourceCategoryList.map(
                            resourceCategory =>(
                                <option key={resourceCategory.id}
                                          value={resourceCategory.label}
                                >
                                    {resourceCategory.label}
                                </option>
                            )
                        )
                    }
                </Select>
            </FormControl>

                <TextareaAutosize
                    title="ContentText"
                    variant="outlined"
                    onChange={handleChange}
                    size="small"
                />

                <TextField
                    title="ContentString"
                    type="file"
                    variant="outlined"
                    onChange={handleChange}

                    size="small"
                />

            <input type="submit" value = "Enregistrer"/>

        </form>
    )
})

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(ResourceForm)




