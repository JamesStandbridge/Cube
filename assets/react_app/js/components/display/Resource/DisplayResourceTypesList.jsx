import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import ResourceTypeRepository from "../../../services/ORM/repository/TypeResourceRepository";
import {MenuItem} from "@material-ui/core";


const DisplayResourceTypeList = ({AuthHandler}) => {

    useEffect(() => {
        const init = async () => {
            let res = await ResourceTypeRepository.getResourceTypesList(AuthHandler.token);
            console.log(res)
            const resourceTypes = res.data["hydra:member"];
            setResourceTypeList(resourceTypes);
        }
        init();
    }, [])

    const [resourceTypeList, setResourceTypeList] = useState([]);

    return (
        <div>
            {
                resourceTypeList.map(
                    resourceType =>(
                        <MenuItem key={resourceType.id}
                                  value={resourceType.label}
                        >
                            {resourceType.label}
                        </MenuItem>
                    )
                )
            }
        </div>
    )
}
    const mapStateToProps = (state) => {
        return state
    }

    export default connect(mapStateToProps)(DisplayResourceTypeList)