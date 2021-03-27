import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import ResourceRepository from "../../../services/ORM/repository/ResourceRepository";
import CommentForm from "../../form/app/commentForm";
import CustomModal from "../../modals/Modal";


const ResourceDetailDisplay = ({resourceId, props}) => {
    const [ resource, setResource ] = useState(null)
    const [ loading, setLoading ] = useState(true)


    useEffect(() => {
        const init = async () => {
            let res = await ResourceRepository.getResource(resourceId);
            console.log(res);
            const newResource = res.data;
            setResource(newResource);

        }

        setLoading(true)
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

            {loading ? (
                null
            ) : (
                <div>
                    <h1>{resource.title}</h1>
                    <p>about {resourceId}</p>
                    <p>{resource.createdAt}</p>
                    <p>{resource.author.firstname}</p>
                </div>
            )}
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