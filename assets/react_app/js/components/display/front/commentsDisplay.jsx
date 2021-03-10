import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import CommentRepository from "../../../services/ORM/repository/ResourceRepository";
import {Link} from "@material-ui/core";
import ResourceRepository from "../../../services/ORM/repository/ResourceRepository";

require("../../../../css/resource.css");

const CommentsDisplay = ({resourceId}) => {

    useEffect(() => {
        const init = async () => {
            let res = await ResourceRepository.getCommmentsResource(resourceId);
            console.log(res);
            const newComment = res.data["hydra:member"];
            setComments(newComment);
        }
        init()

    }, [])

    const [ comments, setComments ] = useState([])

    return (
        <div>
            {console.log('RENDER', comments )}
            <p>Card Comment</p>
            {
                comments.map(comment => (
                    <div key={comment.id}>
                        <p><a href={`/catalogue/${comment.id}`}>{comment.content}</a></p>
                        <p>{comment.createdAt}</p>
                        <p>{comment.userEntity.firstname}</p>
                    </div>
                ))
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(CommentsDisplay)