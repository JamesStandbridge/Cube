/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React from "react";
import HttpService from "../axios/AxiosService";
import HeaderBuilder from "../HeaderBuilder";
import EndPoints from "../endpoints";

const CategoryRepository = {
	create: async function(category, token) {
		const res = await HttpService.sendPostRequest(
			EndPoints.URL_POST_CATEGORY,
			HeaderBuilder.POST_HEADER_AUTHORIZATION(token),
			category
		);

		return res
	}
}

export default CategoryRepository;

