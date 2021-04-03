import React from 'react';
import Layout from "../../../../views/Layout"
import ResourceUpdateForm from "../../../../components/form/app/ResourceUpdateForm";


const UpdateResource = (resource) => {
    return (
        <Layout>
            <div>
                <h1>Modifier une ressource</h1>
            </div>
            <div>
                <ResourceUpdateForm currentResource = {resource}/>
            </div>
        </Layout>
    )
}

export default UpdateResource;