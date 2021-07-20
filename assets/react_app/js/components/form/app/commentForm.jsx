import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import ResourceRepository from "../../../services/ORM/repository/ResourceRepository"
import {TextareaAutosize} from "@material-ui/core"
import CommentRepository from "../../../services/ORM/repository/commentRepository"

const CommentForm = ({resourceId, commentId, onCloseModal, AuthHandler, refresh}) => {

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

    const resetComment = () => {
        setComment({
            content: {value:""},
            resource: {value: `/api/resources/${resourceId}`},
            createdAt: {value: new Date()},
            parentComment: {value:""},
            userEntity: {value:""},
        })
    }

    const handleSubmit = () => {
        let commentToSend = {
            content: comment.content.value,
            resource:comment.resource.value,
            createdAt:comment.createdAt.value,
            userEntity: `api/users/${AuthHandler.user.id}`,
            parentComment: commentId ? `api/comments/${commentId}`: null
        }

        console.log(commentToSend)
        CommentRepository.create(commentToSend).then(res => {
            if(res.status === 201) {
                refresh()
                resetComment()
            }
        })
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
                Laisser un commentaire
            </Button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(CommentForm)