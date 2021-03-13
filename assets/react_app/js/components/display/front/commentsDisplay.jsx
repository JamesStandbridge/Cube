import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import ResourceRepository from "../../../services/ORM/repository/ResourceRepository";
import CommentForm from "../../form/app/commentForm";
import CustomModal from "../../modals/Modal";


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
                        <p>{comment.content}</p>
                        <p>{comment.createdAt}</p>
                        <p>{comment.userEntity.firstname}</p>
                        <CustomModal
                            btnTitle={"Répondre"}
                        >
                            <div style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}>
                                <CommentForm resourceId = {resourceId} commentId = {comment.id}/>
                            </div>
                        </CustomModal>
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