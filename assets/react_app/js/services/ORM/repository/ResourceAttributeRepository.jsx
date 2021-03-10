/**
 * author: ManonSeznec
 * date: 21/02/2021
 */

import React from "react";
import HttpService from "../axios/AxiosService";
import HeaderBuilder from "../HeaderBuilder";
import EndPoints from "../endpoints";

const ResourceAttributeRepository = {
	getResourceAttributeList: async function(resourceAttribute) {
		const res = await HttpService.sendGetRequest(
			EndPoints.URL_GET_RESOURCE_ATTRIBUTES_LIST,
			HeaderBuilder.GET_HEADER(),
			resourceAttribute
		);
		return res
	},

	postResourceAttribute: async function(resourceAttribute) {
		const res = await HttpService.sendGetRequest(
			EndPoints.URL_POST_RESOURCE_ATTRIBUTES_LIST,
			HeaderBuilder.POST_HEADER(),
			resourceAttribute
		);
		return res
	}
}

export default ResourceAttributeRepository;

