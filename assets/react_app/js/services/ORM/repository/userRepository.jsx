import React from "react";
import HttpService from "../axios/AxiosService";
import HeaderBuilder from "../HeaderBuilder";
import EndPoints from "../endpoints";

const UserRepository = {

    getResources: async function(userId, token) {

        return await HttpService.sendGetRequest(
            EndPoints.URL_GET_MY_RESOURCES(userId),
            HeaderBuilder.GET_HEADER_AUTHORIZATION(token),
           userId
        )
    },
}

export default UserRepository;