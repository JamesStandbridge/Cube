/**
 * author: ManonSeznec
 * date: 22/01/2021
 */

 import React from "react";
 import HttpService from "../axios/AxiosService";
 import HeaderBuilder from "../HeaderBuilder";
 import EndPoints from "../endpoints";
 
 const UtilisateursRepository = {
 
     getUtilisateurList: async function(token) {
         //console.log(resource)
         return await HttpService.sendGetRequest(
             EndPoints.URL_GET_UTILISATEUR_LIST,
             HeaderBuilder.GET_HEADER_AUTHORIZATION(token),
         )
     },

     updateUserEnabled: async function(userID, token) {
        return await HttpService.sendGetRequest(
            EndPoints.URL_UPDATE_ENABLED_USER(userID),
            HeaderBuilder.GET_HEADER_AUTHORIZATION(token),
        )
    },

    getUtilisateur : async function(userID) {
        return await HttpService.sendGetRequest(
            EndPoints.URL_GET_UTILISATEUR(userID),
            HeaderBuilder.GET_HEADER(),
        )
    },

    
 /*
     moderateResource: async function(body, token) {
         //console.log(resource)
         return await HttpService.sendPostRequest(
             EndPoints.URL_MODERATE_RESOURCE,
             HeaderBuilder.POST_HEADER_AUTHORIZATION(token),
             body
         )
     },
 */
 }
 
 export default UtilisateursRepository;