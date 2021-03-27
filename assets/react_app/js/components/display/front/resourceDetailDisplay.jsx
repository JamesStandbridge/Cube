import React, { useState, useEffect } from 'react'


import { connect } from 'react-redux';
import ResourceRepository from "../../../services/ORM/repository/ResourceRepository";
import CommentForm from "../../form/app/commentForm";
import CustomModal from "../../modals/Modal";
import {Container, CssBaseline} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import ResourceStateRepository from "../../../services/ORM/repository/ResourceStateRepository"



const ResourceDetailDisplay = ({AuthHandler, resourceId, props, ResourceUserStateHandler, dispatch}) => {
    const [ resource, setResource ] = useState(null)
    const [ loading, setLoading ] = useState(true)


    useEffect(() => {
        const init = async () => {
            let res = await ResourceRepository.getResource(resourceId);
            const newResource = res.data;
            setResource(newResource);
        }

        setLoading(true)
        init()

        const stateIndex = ResourceUserStateHandler.resourceStates.findIndex(item => item.resource.id === resourceId)
        if(stateIndex === -1 || ResourceUserStateHandler.resourceStates[stateIndex].isExploited === false) {
          ResourceStateRepository.exploitResource(resourceId, AuthHandler.token).then(res => {
            dispatch({type: "RESET_UPDATE_RESOURCE_STATES"})
          })
        }
    }, [])


    //const [ author, setAuthor ] = useState([])
    //const [ type, setType ] = useState([])
    //const [ category, setCategory ] = useState([])
    //const [ contents, setContents ] = useState([])
    const [ attribute, setAttribute ] = useState([])

    const checkTagModel=(label, content) => {
        console.log(label)
       switch (label) {
           case 'image':
               return(
                   <img src={content.stringValue} alt={content.stringValue}/>
               )
           case 'video':
               return(
                   <iframe src={content.stringValue}
                           frameBorder="0"
                           allow="autoplay; encrypted-media"
                           allowFullScreen={true}
                   />
               )
           case 'jeu':
               return (
                   <iframe src={content.stringValue}
                           width="80vh"
                           height="50vh"
                   />
               )
           case 'file':
               return (
                   <iframe src={content.stringValue}
                           width="80vh"
                           height="50vh"
                   />
                  )
           default:
               return(<a href={content.stringValue}/>)
            break
       }
    }



    return (
        <div>
            {loading ? (
                null
            ) : (
                <div>
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Typography component="div" style={{ backgroundColor: '#FFFAFA', height: '50vh' }}>
                    <h1>{resource.title}</h1>
                    <div>{resource.createdAt}</div>
                    <div>{resource.author.email}</div>
                    <div>{resource.category.label}</div>
                    <div>
                        {
                            resource.contents.map(content=>(
                                <div key={content.id}>
                                            {checkTagModel(content.attribute.label, content)}
                                        ? <div>
                                                <iframe src={content.stringValue}
                                                    frameBorder="0"
                                                    allow="autoplay; encrypted-media"
                                                    allowFullScreen={true}
                                            />
                                            </div>
                                         :<div>{content.textValue}</div>
                                    }

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


