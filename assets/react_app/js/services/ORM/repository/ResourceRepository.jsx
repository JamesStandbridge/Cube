/**
 * author: ManonSeznec
 * date: 22/01/2021
 */

import React from "react";
import HttpService from "../axios/AxiosService";
import HeaderBuilder from "../HeaderBuilder";
import EndPoints from "../endpoints";

const ResourceRepository = {

    searchResources: async function (filters) {
        return await HttpService.sendPostRequest(
            EndPoints.URL_SEARCH_RESOURCES,
            HeaderBuilder.POST_HEADER(),
            filters
        )
    },

    getResourceList: async function() {
        return await HttpService.sendGetRequest(
            EndPoints.URL_GET_RESOURCE_LIST,
            HeaderBuilder.GET_HEADER(),
        )
    },

    getNewResources: async function(token) {
        //console.log(resource)
        return await HttpService.sendGetRequest(
            EndPoints.URL_GET_NEW_RESOURCES,
            HeaderBuilder.GET_HEADER_AUTHORIZATION(token),
        )
    },

    moderateResource: async function(body, token) {
        //console.log(resource)
        return await HttpService.sendPostRequest(
            EndPoints.URL_MODERATE_RESOURCE,
            HeaderBuilder.POST_HEADER_AUTHORIZATION(token),
            body
        )
    },

    create: async function(resource, token) {
        console.log(resource)
        return await HttpService.sendPostRequest(
            EndPoints.URL_POST_RESOURCE,
            HeaderBuilder.POST_HEADER_AUTHORIZATION(token),
            resource
        );
    },

    getResource : async function(resource) {
        return await HttpService.sendGetRequest(
            EndPoints.URL_GET_RESOURCE(resource),
            HeaderBuilder.GET_HEADER(),
            resource.id
        )
    },

    getCommmentsResource : async function(resource) {
        console.log(resource)
        return await HttpService.sendGetRequest(
            EndPoints.URL_GET_COMMENTS_RESOURCE(resource),
            HeaderBuilder.GET_HEADER(),
            resource.id
        )
    },
    deleteResource : async function(resourceId, token) {
        console.log(resourceId)
        return await HttpService.sendDeleteRequest(
            EndPoints.URL_DELETE_RESOURCE(resourceId),
            HeaderBuilder.DELETE_HEADER_AUTHORIZATION(token),
            resourceId
        );
    }
}

export default ResourceRepository;