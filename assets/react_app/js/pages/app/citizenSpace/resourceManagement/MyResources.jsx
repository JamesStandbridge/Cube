import React from 'react';
import ResourceForm from "../../../../components/form/app/ResourceForm";
import Layout from "../../../../views/Layout"
import MyResourcesDisplay from "../../../../components/display/Resource/myResourcesDisplay";

const MyResources = (props) => {
    return (
        <Layout>
            <div>
                <h1>Mes ressources</h1>
                <MyResourcesDisplay/>
            </div>
        </Layout>
    )
}

export default MyResources;