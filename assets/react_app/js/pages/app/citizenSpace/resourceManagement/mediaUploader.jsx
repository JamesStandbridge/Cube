import React from 'react';
import ResourceForm from "../../../../components/form/app/ResourceForm";
import Layout from "../../../../views/Layout"
import MyResourcesDisplay from "../../../../components/display/Resource/myResourcesDisplay";
import MediaForm from "../../../../components/form/app/mediaForm";

const MediaUploader = (props) => {
    return (
        <Layout>
            <div>
                <h1>Importer un média</h1>
                <MediaForm/>
            </div>
        </Layout>
    )
}

export default MediaUploader;