import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import ResourceAttributeRepository from "../../../services/ORM/repository/ResourceAttributeRepository";
import { MenuItem } from "@material-ui/core";


const DisplayResourceAttributeList = ({}) => {
    useEffect(() => {
        const init = async () => {
            let res = await ResourceAttributeRepository.getResourceAttributeList();
            const newResourceAttributes = res.data["hydra:member"];
            setResourceAttributesList(newResourceAttributes);
        }
        init();
    }, [])

    const [ resourceAttributes, setResourceAttributesList ] = useState([])

    return (
        <div>
            {
                resourceAttributes.map(
                    resourceAttribute => (
                        <MenuItem key={resourceAttribute.id}
                                  value={resourceAttribute.label}
                        >
                            {resourceAttribute.label}
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

    export default connect(mapStateToProps)(DisplayResourceAttributeList)
