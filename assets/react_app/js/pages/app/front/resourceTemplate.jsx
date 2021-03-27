import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Layout from '../../../views/Layout'
import ResourceRepository from "../../../services/ORM/repository/ResourceRepository";
import CommentsDisplay from "../../../components/display/front/commentsDisplay";
import CommentForm from "../../../components/form/app/commentForm";
import ResourceDetailDisplay from "../../../components/display/front/resourceDetailDisplay";

const ResourceTemplate = ({match:{params:{id}}}) => {

    return (
        <Layout>
            <div>
                <ResourceDetailDisplay resourceId = {id}/>
                <div>
                    <CommentForm resourceId = {id}/>
                    <CommentsDisplay resourceId = {id}/>
                </div>


        </div>

        </Layout>
    )
}
const mapStateToProps = (state) => {
    return state
}
export default connect(mapStateToProps)(ResourceTemplate);