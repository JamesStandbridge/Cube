import React from 'react';

import ResourceForm from '../../../../components/form/app/ResourceForm'
import Layout from "../../../../views/Layout"
import DisplayResourceCategoriesList from "../../../../components/display/Resource/DisplayResourceCategoriesList";

const CreateResource = (props) => {
    return (
        <Layout>
            <div>
                <h1>Créer/Importer une nouvelle ressource</h1>
            </div>
            <div>
                <ResourceForm/>
            </div>
        </Layout>
    )
}

export default CreateResource;