import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import ResourceRepository from "../../../services/ORM/repository/ResourceRepository";
import CommentForm from "../../form/app/commentForm";
import CustomModal from "../../modals/Modal";


const ResourceDetailDisplay = ({resourceId}) => {
    useEffect(() => {
        const init = async () => {
            let res = await ResourceRepository.getResource(resourceId);
            const newResource = res.data;
            setResource(newResource);
        }
        init()

    }, [])
    const [ resource, setResource ] = useState([])


    return (
        <div>
            <p>about {resourceId}</p>
            <h1>{resource.title}</h1>
            <p>{resource.createdAt}</p>

            {/*{*/}

            {/*    resource.content.map(content => (*/}
            {/*        <div>*/}

            {/*            <p key={content.id}>{content.textValue}</p>*/}
            {/*            <p key={content.id}>{content.stringValue}</p>*/}
            {/*        </div>*/}
            {/*    ))*/}

            {/*}*/}
        </div>

    )
}
const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(ResourceDetailDisplay)