import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import ResourceRepository from "../../../services/ORM/repository/ResourceRepository";
import CommentForm from "../../form/app/commentForm";
import CustomModal from "../../modals/Modal";
import {array} from "prop-types";
import Typography from "@material-ui/core/Typography";
import {Container, CssBaseline} from "@material-ui/core";


const ResourceDetailDisplay = ({resourceId, props}) => {


            useEffect(() => {
        const init = async () => {
            let res = await ResourceRepository.getResource(resourceId);
            setResource(res.data)
            let resAuth = await ResourceRepository.getResourceAuthor(resourceId)
            setAuthor(resAuth.data)
            let resType = await ResourceRepository.getResourceType(resourceId)
            setType(resType.data)
            let resCat = await ResourceRepository.getResourceCategory(resourceId)
            setCategory(resCat.data)
            let resCont = await ResourceRepository.getResourceContents(resourceId)
            setContents(resCont.data['hydra:member'])
            let resAttr = await ResourceRepository.getResourceAttribute(contentId)
            setAttribute(resCont.data)

        }
        init()

    }, [])
    const [ resource, setResource ] = useState([])
    const [ author, setAuthor ] = useState([])
    const [ type, setType ] = useState([])
    const [ category, setCategory ] = useState([])
    const [ contents, setContents ] = useState([])
    const [ attribute, setAttribute ] = useState([])
    console.log(resource.content)
    console.log(author)
    console.log(type)

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
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Typography component="div" style={{ backgroundColor: '#FFFAFA', height: '50vh' }}>
                    <h1>{resource.title}</h1>
                    <div>{resource.createdAt}</div>
                    <div>{author.email}</div>
                    <div>{category.label}</div>
                    <div>
                        {
                            contents.map(content=>(
                                <div key={content.id}>

                                    { content.stringValue
                                        //  <div>{checkTagModel(content.attribute.label, content)}
                                        ? <div><iframe src={content.stringValue}
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

    )
}
const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(ResourceDetailDisplay)