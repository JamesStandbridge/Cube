import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import ResourceRepository from "../../../services/ORM/repository/ResourceRepository";
import {Link} from "@material-ui/core";

require("../../../../css/resource.css");

const CardCatalogDisplay = ({}) => {


    useEffect(() => {
        const init = async () => {
            let res = await ResourceRepository.getResourceList();
            console.log(res);
            const newResource = res.data["hydra:member"];
            setResources(newResource);
        }
        init()

    }, [])
    const [ resources, setResources ] = useState([])

    return (
        <div>
            {console.log('RENDER', resources )}
            <p>Card Ressource</p>
            {
                resources.map(resource => (
                    <div key={resource.id}>

                            <h5><a href={`/catalogue/${resource.id}`}>{resource.title}</a></h5>
                        <p>{resource.createdAt}</p>
                        <p>{resource.category.label}</p>
                    </div>

                ))
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(CardCatalogDisplay)