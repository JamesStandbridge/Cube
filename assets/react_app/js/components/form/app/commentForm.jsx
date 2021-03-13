import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ResourceRepository from "../../../services/ORM/repository/ResourceRepository";
import {TextareaAutosize} from "@material-ui/core";
import CommentRepository from "../../../services/ORM/repository/commentRepository";

const CommentForm = ({ dispatch, resourceId, commentId, AuthHandler}) => {

    const [ comment, setComment ] = useState({
        content: {value:""},
        resource: {value: `/api/resources/${resourceId}`},
        createdAt: {value: new Date()},
        parentComment: {value:""},
        userEntity: {value:""},
    })


    const handleChange = (event) => {
        const value = event.currentTarget.value
        setComment({...comment, content: {...comment.content, value}})
    }
    const handleSubmit = () => {
        let parentComment = ""
        if (commentId !== "") {
            parentComment =`api/comments/${commentId}`
        }
        const commentToSend = {
            content: comment.content.value,
            resource:comment.resource.value ,
            createdAt:comment.createdAt.value,
            parentComment:parentComment,
            userEntity: `api/users/${AuthHandler.user.id}`
        }
        console.log(commentToSend)
        CommentRepository.create(commentToSend).then(res => {})
    }

    return (
        <div>

                <TextareaAutosize
                    label="content"
                    variant="outlined"
                    onChange={handleChange}
                    size="small"
                />

                <Button
                onClick={handleSubmit}
                color='primary'
                variant="contained"
                >
                Envoyer
            </Button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(CommentForm)