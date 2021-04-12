import React from "react";
import HttpService from "../axios/AxiosService";
import HeaderBuilder from "../HeaderBuilder";
import EndPoints from "../endpoints";

const MediaObjectRepository = {

    upload: async function (mediaObject, token) {
        return await HttpService.sendPostRequest(
            EndPoints.URL_POST_MEDIA,
            HeaderBuilder.UPLOAD_MEDIA_HEADER_AUTHORIZATION(token),
            mediaObject
        );
    },

    getMediaObjects: async function (token) {
        return await HttpService.sendGetRequest(
            EndPoints.URL_GET_MEDIAS,
            HeaderBuilder.GET_HEADER_AUTHORIZATION(token),
        )
    }
}

export default MediaObjectRepository;