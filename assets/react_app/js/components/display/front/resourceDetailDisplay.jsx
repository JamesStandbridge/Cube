import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import ResourceRepository from "../../../services/ORM/repository/ResourceRepository";
import {Container, CssBaseline} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";


const ResourceDetailDisplay = ({resourceId}) => {
    const [ resource, setResource ] = useState(null)
    const [ loading, setLoading ] = useState(true)

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
    }, [])


    //const [ author, setAuthor ] = useState([])
    //const [ type, setType ] = useState([])
    //const [ category, setCategory ] = useState([])
    //const [ contents, setContents ] = useState([])

    const checkTagModel=(label, content) => {
        console.log(label)
        if (content.textValue) {
            return (
                <div>{content.textValue}</div>
            )
        }

        switch (label) {
           case 'image':
               return(
                   <img src={content.stringValue} alt={content.stringValue}/>
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
                   <iframe src={content.stringValue}
                           width="80vh"
                           height="50vh"
                   />
                  )
           
           default:
               return(<a href={content.stringValue}>{content.stringValue}</a>)
            break
       }
    }
    console.log(resource)
    return (
        <div>
            {loading ? null : (
                <div>
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg">

                    <Typography component="div" style={{ backgroundColor: '#FFFAFA', height: '50vh' }}>
                    <h1>{resource.title}</h1>
                    <div>{resource.createdAt}</div>
                    <div>{resource.author.email}</div>
                    <div>{resource.category.label}</div>
                        <div>{resource.type.label}</div>

                        <div>
                            {
                                resource.content.map(content=>(
                                    <div key={content.id}>
                                        <div>{content.attribute.label}</div>
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