/**
 * author: ManonSeznec
 * date: 22/01/2021
 */

import React from "react";

import HttpService from "../axios/AxiosService";
import HeaderBuilder from "../HeaderBuilder";
import EndPoints from "../endpoints";

const ResourceStateRepository = {

    updateFavorite: async function(resourceID, token) {
        return await HttpService.sendGetRequest(
            EndPoints.URL_UPDATE_FAVORITE_RESOURCE(resourceID),
            HeaderBuilder.GET_HEADER_AUTHORIZATION(token),
        )
    },

    getStates: async function(token) {
        return await HttpService.sendGetRequest(
            EndPoints.URL_GET_RESOURCE_USER_STATES,
            HeaderBuilder.GET_HEADER_AUTHORIZATION(token),
        )
    },

    exploitResource: async function(resourceID, token) {
        return await HttpService.sendGetRequest(
            EndPoints.URL_EXPLOIT_RESOURCE(resourceID),
            HeaderBuilder.GET_HEADER_AUTHORIZATION(token),
        )
    },

    updateAside: async function(resourceID, token) {
        return await HttpService.sendGetRequest(
            EndPoints.URL_UPDATE_ASIDE_RESOURCE(resourceID),
            HeaderBuilder.GET_HEADER_AUTHORIZATION(token),
        )
    },
}

export default ResourceStateRepository;