import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import CategoryRepository from "../../../services/ORM/repository/CategoryRepository";
import {FormControl, InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";

require("../../../../css/resource.css");

const DisplayResourceCategoryList = ({}) => {

    useEffect(() => {
        const init = async () => {
            let res = await CategoryRepository.getCategoriesList();
            console.log(res)
            const resourceCategories = res.data["hydra:member"];
            setResourceCategoryList(resourceCategories);
        }
        init();
    }, [])

    const [resourceCategoryList, setResourceCategoryList] = useState([]);

    return (
        <div>
                {
                    resourceCategoryList.map(
                        resourceCategory =>(
                            <MenuItem key={resourceCategory.id}
                                      value={resourceCategory.label}
                            >
                                {resourceCategory.label}
                            </MenuItem>
                        )
                    )
                }
        </div>
    );
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(DisplayResourceCategoryList)