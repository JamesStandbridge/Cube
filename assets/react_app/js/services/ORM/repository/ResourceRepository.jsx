/**
 * author: ManonSeznec
 * date: 22/01/2021
 */

import React from "react";
import HttpService from "../axios/AxiosService";
import HeaderBuilder from "../HeaderBuilder";
import EndPoints from "../endpoints";

const ResourceRepository = {
    create: async function(resource, token) {
        const res = await HttpService.sendPostRequest(
            EndPoints.URL_POST_RESOURCE,
            HeaderBuilder.POST_HEADER_AUTHORIZATION(token),
            resource
        );
        return res
    }
}

export default ResourceRepository;