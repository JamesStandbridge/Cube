import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components'
import TokenManager from "../../../services/security/TokenManager"
import Button from '@material-ui/core/Button';



import Layout from '../../../views/Layout'
import ResourceRepository from "../../../services/ORM/repository/ResourceRepository";
import CommentsDisplay from "../../../components/display/front/commentsDisplay";
import CommentForm from "../../../components/form/app/commentForm";
import ResourceDetailDisplay from "../../../components/display/front/resourceDetailDisplay";

const ResourceTemplate = ({AuthHandler, match:{params:{id}}}) => {

    const handleModerate = (bool) => {
        ResourceRepository.moderateResource({resource_id: id, bool}, AuthHandler.token).then(res => {
            console.log(res)
        }) 
    }

    return (
        <Layout>
            <div>
              {TokenManager.isModerator(AuthHandler.token) ? (
                <BTNModerate>
                  <Button color="secondary" onClick={() => handleModerate(false)} variant="contained">Refuser</Button>
                  <Button color="primary" onClick={() => handleModerate(true)} variant="contained">Valider</Button>
                </BTNModerate>
              ) : (
                <h1>dd</h1>
              )}

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

const BTNModerate = styled.div`
  float: right;
`