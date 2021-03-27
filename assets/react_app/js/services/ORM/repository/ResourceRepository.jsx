/**
 * author: ManonSeznec
 * date: 22/01/2021
 */

import React from "react";
import HttpService from "../axios/AxiosService";
import HeaderBuilder from "../HeaderBuilder";
import EndPoints from "../endpoints";

const ResourceRepository = {

    getResourceList: async function() {
        //console.log(resource)
        return await HttpService.sendGetRequest(
            EndPoints.URL_GET_RESOURCE_LIST,
            HeaderBuilder.GET_HEADER(),
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
    getResourceAuthor : async function(resourceId) {
        return await HttpService.sendGetRequest(
            EndPoints.URL_GET_AUTHOR_RESOURCE(resourceId),
            HeaderBuilder.GET_HEADER(),
        )
    },
    getResourceType: async function(resourceId) {
        return await HttpService.sendGetRequest(
            EndPoints.URL_GET_TYPE_RESOURCE(resourceId),
            HeaderBuilder.GET_HEADER(),
        )
    },
    getResourceCategory: async function(resourceId) {
        return await HttpService.sendGetRequest(
            EndPoints.URL_GET_CATEGORY_RESOURCE(resourceId),
            HeaderBuilder.GET_HEADER(),
        )
    },
    getResourceContents: async function(resourceId) {
        return await HttpService.sendGetRequest(
            EndPoints.URL_GET_CONTENTS_RESOURCE(resourceId),
            HeaderBuilder.GET_HEADER(),
        )
    },
    getResourceAttribute: async function(contentId) {
        return await HttpService.sendGetRequest(
            EndPoints.URL_GET_ATTRIBUTE_RESOURCE(contentId),
            HeaderBuilder.GET_HEADER(),
        )
    }
}

export default ResourceRepository;