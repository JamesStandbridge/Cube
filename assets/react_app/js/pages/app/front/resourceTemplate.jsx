import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Layout from '../../../views/Layout'
import ResourceRepository from "../../../services/ORM/repository/ResourceRepository";
import CommentsDisplay from "../../../components/display/front/commentsDisplay";
import CommentForm from "../../../components/form/app/commentForm";

const ResourceTemplate = ({match:{params:{id}}}) => {

    useEffect(() => {
        const init = async () => {
            let res = await ResourceRepository.getResource(id);
            const newResource = res.data;
            setResource(newResource);
        }
        init()

    }, [])
    const [ resource, setResource ] = useState([])

    return (
        <Layout>
            <div>
            <p>about {id}</p>
                <h1>{resource.title}</h1>
                <p>{resource.createdAt}</p>

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