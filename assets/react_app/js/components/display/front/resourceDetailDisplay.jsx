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
            const newResource = res.data;
            setResource(newResource);
            setLoading(false)

        }

        setLoading(true)
        init()
    }, [])
    

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
        </div>

    )
}
const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(ResourceDetailDisplay)

                    // 
                    // 
                    // 
                    // 