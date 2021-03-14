import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import ResourceRepository from "../../../services/ORM/repository/ResourceRepository";
import CommentForm from "../../form/app/commentForm";
import CustomModal from "../../modals/Modal";


const ResourceDetailDisplay = ({resourceId, props}) => {
    useEffect(() => {
        const init = async () => {
            let res = await ResourceRepository.getResource(resourceId);
            console.log(res);
            const newResource = res.data;
            setResource(newResource);

        }
        init()

    }, [])
    const [ resource, setResource ] = useState([])

    return (
        <div>
            {
                console.log(resource)
            }


                    <p>about {resourceId}</p>
                    <h1>{resource.title}</h1>
                    <p>{resource.createdAt}</p>
                    <p>{resource.author.firstname}</p>

        </div>

    )
}
const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(ResourceDetailDisplay)