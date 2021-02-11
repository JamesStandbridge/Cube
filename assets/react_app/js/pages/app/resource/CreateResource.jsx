import React from 'react';

import ResourceForm from '../../../components/form/app/ResourceForm'
import CitizenLayout from '../../../views/CitizenLayout'

const CreateResource = (props) => {
    return (

        <CitizenLayout>
            <div>
                <h1>Créer/Importer une nouvelle ressource</h1>
            </div>
            <ResourceForm />
        </CitizenLayout>
    )
}

export default CreateResource;