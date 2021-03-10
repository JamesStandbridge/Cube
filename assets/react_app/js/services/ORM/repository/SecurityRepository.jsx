/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React from "react";
import HttpService from "../axios/AxiosService";
import HeaderBuilder from "../HeaderBuilder";
import EndPoints from "../endpoints";

const SecurityRepository = {
	getToken: async function(userData) {
		const res = await HttpService.sendPostRequest(
			EndPoints.URL_GET_TOKEN,
			HeaderBuilder.POST_HEADER(),
			userData
		);
		
		return res.data.token
	},

	register: async function(userData) {
		const res = await HttpService.sendPostRequest(
			EndPoints.URL_REGISTER,
			HeaderBuilder.POST_HEADER(),
			userData
		)

		return res.status
	},

	getUser: async function(token) {
		console.log(token)
		const res = await HttpService.sendGetRequest(
			EndPoints.URL_GET_USER,
			HeaderBuilder.GET_HEADER_AUTHORIZATION(token)
		)
		return res.data.user
	}
}

export default SecurityRepository;

