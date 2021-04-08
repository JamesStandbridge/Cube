/**
 * author: ManonSeznec
 * date: 21/02/2021
 */

import React from "react";
import HttpService from "../axios/AxiosService";
import HeaderBuilder from "../HeaderBuilder";
import EndPoints from "../endpoints";

const StatsRepository = {

	getUserResourceStats: async function(token) {
		const res = await HttpService.sendGetRequest(
			EndPoints.URL_GET_USER_RESOURCE_STATS,
			HeaderBuilder.GET_HEADER_AUTHORIZATION(token)
		);
		return res		
	},
}

export default StatsRepository;

