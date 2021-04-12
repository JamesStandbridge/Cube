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
    FormControl, makeStyles, Input, Chip, Icon, Fab, CardActions, CardContent, Card, OutlinedInput, ButtonGroup
} from '@material-ui/core';


import ResourceRepository from "../../../services/ORM/repository/ResourceRepository"

import { wrapComponent } from 'react-snackbar-alert';

import ResourceAttributeRepository from "../../../services/ORM/repository/ResourceAttributeRepository";
import ResourceTypeRepository from "../../../services/ORM/repository/TypeResourceRepository";
import CategoryRepository from "../../../services/ORM/repository/CategoryRepository";
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/table';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/content/default/content.min.css';
import { Editor } from '@tinymce/tinymce-react';
import clsx from "clsx";

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

    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },

    fieldroot: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    fieldmargin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

const ResourceForm = wrapComponent(function({ createSnackbar, dispatch, AuthHandler}) {

    const classes = useStyles();
    const [ loading, setLoading ] = useState(true)
    const [ resourceAttributes, setResourceAttributesList ] = useState([])
    const [ resourceTypeList, setResourceTypeList ] = useState([])
    const [ resourceCategoryList, setResourceCategoryList ] = useState([]);
    const [contentEditor, setContentEditor] = useState();
    const [ resourceType, setResourceType ] = useState( '')
    const [ attribute, setAttribute ] = useState( '')
    const [ resourceCategory, setResourceCategory ] = useState( '')
    const [ resource, setResource ] = useState({
        title: {value: "", error: ""},
        createdAt: {value: new Date()},
        author:{value: `/api/users/${AuthHandler.user.id}`},
        type: {
            value:"",
        },
        category: { value:""},

    })
    const [contents, setContents] = useState([{
        stringValue:"",
        textValue: "",
        attribute:""
    }]);

    const [ redirection, setRedirection ] = useState(false)



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

    const upload=()=> {
        let currentFile = this.state.selectedFiles[0];

        this.setState({
            progress: 0,
            currentFile: currentFile,
        });

        ResourceRepository.upload(currentFile, (event) => {
            this.setState({
                progress: Math.round((100 * event.loaded) / event.total),
            });
        })
            .then((response) => {
                this.setState({
                    message: response.data.message,
                });
                return ResourceRepository.getFiles();
            })
            .then((files) => {
                this.setState({
                    fileInfos: files.data,
                });
            })
            .catch(() => {
                this.setState({
                    progress: 0,
                    message: "Could not upload the file!",
                    currentFile: undefined,
                });
            });

        this.setState({
            selectedFiles: undefined,
        });
    }

    function showSnackbar(theme, message) {
        createSnackbar({
            message: message,
            dismissable: true,
            pauseOnHover: true,
            theme: theme,
        });
    }

    const handleChange = ({currentTarget}) => {
        const nextValue = {value: currentTarget.value, error: ""}
        setResource({...resource, [currentTarget.name]: nextValue})
        console.log(resource)
    }

    const handleEditorChange = (content) => {
            console.log('Content was updated:', content)
            const list = [...contents];
            list[0]['textValue'] = content
            setContents(list)
    }

    const handleContentsChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...contents];
        list[index][name] = value;
        setContents(list)
        console.log(contents)
    };

    const handleChangeType = (event) => {
        setResourceType(event.target.value)
    }

    const handleChangeCategory = (event) => {
        setResourceCategory(event.target.value)
    }

    const handleSubmit = () => {
        const resourceToSend = {

            author:resource.author.value,
            title: resource.title.value,
            type: resourceType,
            createdAt: resource.createdAt.value,
            content: contents,
            category: resourceCategory
        }
        console.log(resourceToSend)

        ResourceRepository.create(resourceToSend,AuthHandler.token).then(res => {
            setRedirection(true)
            showSnackbar('success', "Nouvelle ressource enregistrée")
        })
    }

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...contents];
        list.splice(index, 1);
        setContents(list);
    };

// handle click event of the Add button
    const handleAddClick = () => {
        setContents([
            ...contents, {
                stringValue: "",
                textValue: "",
                attribute:""
            }]);
    };

    const validateForm = () => {
        let bool = true

        if(resource.title.value.trim().length === 0) {
            bool = false
            setResource({...resource, title: {...resource.title, error: "Le title est requis"}})
        }

        return bool
    }



    const checkContentValue=(attributes, attributeUri,content,index)=>{

        let attributeUrl = content.attribute.toString()
        let attribute = attributeUrl.split('/')

        let attributeIdSelect = attribute[3]
        let  contentType=""

       for (let j = 0; j < attributes.resourceAttributes.length; j++) {
             let id = attributes.resourceAttributes[j].id
             //let id = attributes.resourceAttributes.id

             if (id.toString() === attributeIdSelect ) {
                 contentType = attributes.resourceAttributes[j].type
                 //contentType = attributes.resourceAttributes.type
                 switch (contentType) {
                     case 'textArea':
                         return (
                             <div>
                                 <Editor
                                     apiKey="u1m0g61gdjvpw3ex51qs92r7vvb56m4ufocph64n35yzhhtv"
                                     initialValue="<p>This is the initial content of the editor</p>"
                                     init={{
                                         skin: true,
                                         content_css: true,
                                         height: 500,
                                         menubar: false,
                                         plugins: [
                                             'link image',
                                             'table paste'
                                         ],
                                         toolbar:
                                             'undo redo | formatselect | bold italic backcolor | \
                                             alignleft aligncenter alignright alignjustify | \
                                             bullist numlist outdent indent | removeformat | help'
                                     }}
                                     name="textValue"
                                     value={contentEditor}
                                     onEditorChange={handleEditorChange}
                                 />
                             </div>
                     )
              /*       case 'file':
                         return (
                             <div>
                                 {currentFile && (
                                     <div className="progress">
                                         <div
                                             className="progress-bar progress-bar-info progress-bar-striped"
                                             role="progressbar"
                                             aria-valuenow={progress}
                                             aria-valuemin="0"
                                             aria-valuemax="100"
                                             style={{ width: progress + "%" }}
                                         >
                                             {progress}%
                                         </div>
                                     </div>
                                 )}

                                 <label className="btn btn-default">
                                     <TextField
                                         title="ContentString"
                                         name="stringValue"
                                         type="file"
                                         variant="outlined"
                                         onChange={this.selectFiles/*e=>handleChange(e,index)}
                                         size="small"
                                         value={content.stringValue}
                                     />
                                    <input type="file" onChange={this.selectFile} />}
                                </label>

                                 <button className="btn btn-success"
                                         disabled={!selectedFiles}
                                         onClick={upload}
                                 >
                                     Upload
                                 </button>
                                 <div className="alert alert-light" role="alert">
                                     {message}
                                 </div>
                             </div>
                         )*/
                     default:
                         return (
                             <TextField
                                 title="ContentString"
                                 name="stringValue"
                                 type="url"
                                 variant="outlined"
                                 onChange={e=>handleContentsChange(e,index)}
                                 size="small"
                             />)

                 }
             }
         }
    }

    if(redirection) return (<Redirect to="/mesRessources" />)

      return (

        <div>
            {loading ? null : (
                <div>
                    <Card className={classes.root}>
                        <CardContent>
                            {
                                resource.title.error !== "" ? (
                                        <FormControl fullWidth className={clsx(classes.fieldmargin)} variant="outlined">
                                            <InputLabel htmlFor="title">Titre</InputLabel>
                                            <OutlinedInput
                                                error
                                                title="Title"
                                                name="title"
                                                variant="outlined"
                                                onChange={handleChange}
                                                helperText={resource.title.error}
                                                labelWidth={70}
                                            />
                                        </FormControl>
                                ) : (
                                    <FormControl fullWidth className={clsx(classes.fieldmargin)} variant="outlined">
                                        <InputLabel htmlFor="title">Titre</InputLabel>
                                        <OutlinedInput
                                            id="title"
                                            name="title"
                                            type="text"
                                            onChange={handleChange}
                                            labelWidth={70}
                                        />
                                    </FormControl>
                                )}
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="resourceCategory-label">Catégorie</InputLabel>
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
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
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
                                                <MenuItem key={resourceType.id}
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
                                        {contents.map((content, index) => {
                                            //let attribute = ;
                                            return (
                                                <li>
                                                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                                        <InputLabel id="attribute-label">Attribut</InputLabel>
                                                        <Select
                                                            labelId="attribute-label"
                                                            id="attribute"
                                                            name="attribute"
                                                            value={content.attribute}
                                                            onChange={e=>handleContentsChange(e,index)}
                                                            label="attribute"

                                                        >
                                                            {
                                                                resourceTypeList.map(
                                                                    resourceTypeSelect => (
                                                                        resourceType === '/api/resource_types/'+ resourceTypeSelect.id ? (
                                                                            resourceTypeSelect.attributes.map(
                                                                                attribute => (
                                                                                    <MenuItem
                                                                                        key={attribute.id}
                                                                                        value={'/api/resource_attributes/' + attribute.id}
                                                                                    >
                                                                                        {attribute.label} {attribute.type}
                                                                                    </MenuItem>
                                                                                )
                                                                            )
                                                                        ): null
                                                                    )
                                                                )
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                    {content.attribute !== "" ? (
                                                        <div>
                                                            {checkContentValue({resourceAttributes}, content.attribute, content,index)}
                                                        </div>
                                                    ) : (
                                                        <p>Veuillez selectionner un attribut</p>
                                                    )
                                                    }

                                                    <ButtonGroup size="small" aria-label="small button group">
                                                        {contents.length !== 1 && <Button size="small" variant="contained" color="secondary"
                                                            className="mr10"
                                                            onClick={() => handleRemoveClick(index)}>Effacer</Button>}
                                                        {contents.length - 1 === index && <Button  size="small" variant="contained" color="primary" onClick={handleAddClick}>Ajouter</Button>}
                                                    </ButtonGroup>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                            ) : (
                                <p>Veuillez selectionner un type de ressource</p>
                            )}

                        </CardContent>
                        <CardActions>
                            <Button
                                onClick={handleSubmit}
                                color='info'
                                variant="contained"
                            >
                                Enregistrer
                            </Button>
                        </CardActions>
                    </Card>
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


