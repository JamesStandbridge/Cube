import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {Container, CssBaseline} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import parse from 'html-react-parser';
import ResourceStateRepository from "../../../services/ORM/repository/ResourceStateRepository"
import ResourceRepository from "../../../services/ORM/repository/ResourceRepository";
import { format } from "date-fns";
import Chip from "@material-ui/core/Chip";

const ResourceDetailDisplay = ({AuthHandler, resourceId, props, ResourceUserStateHandler, dispatch, refresh}) => {
    const [ resource, setResource ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    console.log(resource)

    useEffect(() => {
        const init = async () => {
            let res = await ResourceRepository.getResource(resourceId);
            console.log(res.data);
            //const newResource = res.data;
            setResource(res.data);
            setLoading(false)
        }
        setLoading(true)
        init()

        const stateIndex = ResourceUserStateHandler.resourceStates.findIndex(item => item.resource.id === resourceId)
        if(stateIndex === -1 || ResourceUserStateHandler.resourceStates[stateIndex].isExploited === false) {
          ResourceStateRepository.exploitResource(resourceId, AuthHandler.token).then(res => {
            dispatch({type: "RESET_UPDATE_RESOURCE_STATES"})
          })
        }
    }, [refresh])

    const checkTagModel=(label, content) => {
        console.log(label)
        if (content.textValue) {
            return (
                <div>{parse(content.textValue)}</div>
            )
        }

        switch (label) {
           case 'Image':
               return(
                   <img src={content.mediaObject.contentUrl} alt/>
               )
           case 'Video':
               console.log(content.stringValue)
               return(
                   <iframe src={content.stringValue}
                           frameBorder="0"
                           allow="autoplay; encrypted-media"
                           allowFullScreen={true}
                   />
               )
            break
           case 'jeu':
               return (
                   <iframe src={content.stringValue}
                           width="80vh"
                           height="50vh"
                   />
               )
           case 'file':
               return (
                   <iframe src={content.mediaObject.contentUrl}
                           width="80vh"
                           height="50vh"
                   />
                  )
           default:
               return(<a href={content.stringValue}>{content.stringValue}</a>)
            break
       }
    }

    return (
        <div>
            {loading ? null : (
                <div>
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg" style={{
                    marginTop:'15%',
                    marginLeft:'5O%',

                }}>
                    <Typography component="div" style={{ backgroundColor: '#FFFAFA', height: '50vh' }}>
                    <h1>{resource.title}</h1>
                    <div>{format(Date.parse(resource.createdAt), "d MMM yyyy")}</div>

                    <div>{resource.author.email}</div>

                        <div>
                            {
                                resource.content.map(content=>(
                                    <div key={content.id}>
                                        <Chip label={resource.category.label} variant="outlined" />
                                        <Chip label={resource.type.label} variant="outlined" />
                                        <Chip label={content.attribute.label} variant="outlined" />
                                        {checkTagModel(content.attribute.label, content)}
                                    </div>
                                ))
                            }
                        </div>
                    </Typography>
                </Container>
            </React.Fragment>
                </div>
                )}
        </div>

    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(ResourceDetailDisplay)