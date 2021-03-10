/**
 * author: ManonSeznec
 * date: 21/02/2021
 */

import React from "react";
import HttpService from "../axios/AxiosService";
import HeaderBuilder from "../HeaderBuilder";
import EndPoints from "../endpoints";

const ResourceTypeRepository = {
	getResourceTypesList: async function(resourceType) {
		const res = await HttpService.sendGetRequest(
			EndPoints.URL_GET_RESOURCE_TYPE_LIST,
			HeaderBuilder.GET_HEADER(),
			resourceType
		);
		return res
	},
	postResourceTypesList: async function(resourceType) {
		const res = await HttpService.sendGetRequest(
			EndPoints.URL_POST_RESOURCE_TYPE_LIST,
			HeaderBuilder.POST_HEADER(),
			resourceType
		);
		return res
	}
}

export default ResourceTypeRepository;

