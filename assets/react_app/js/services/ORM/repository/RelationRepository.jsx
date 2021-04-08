/**
 * author: JamesStandbridge
 * date: 09/03/2021
 */

import React from "react";
import HttpService from "../axios/AxiosService";
import HeaderBuilder from "../HeaderBuilder";
import EndPoints from "../endpoints";

const RelationRepository = {
	searchUser: async function(input, token) {
		const res = await HttpService.sendGetRequest(
			EndPoints.URL_SEARCH_USER + '?q=' + input,
			HeaderBuilder.GET_HEADER_AUTHORIZATION(token)
		)

		return res
	},

	getRelations: async function(token) {
		const res = await HttpService.sendGetRequest(
			EndPoints.URL_GET_USER_RELATIONS,
			HeaderBuilder.GET_HEADER_AUTHORIZATION(token)
		)

		return res
	},

	deleteRelation: async function(relationID, token) {
		const res = await HttpService.sendGetRequest(
			EndPoints.URL_DELETE_USER_RELATION(relationID),
			HeaderBuilder.GET_HEADER_AUTHORIZATION(token)
		)

		return res
	},

	getRelationTypes: async function(token) {
		const res = await HttpService.sendGetRequest(
			EndPoints.URL_GET_TYPE_RELATION_SHIP,
			HeaderBuilder.GET_HEADER()
		)

		return res.data['hydra:member']
	},

	createRelation: async function(relation, token) {
		const res = await HttpService.sendPostRequest(
			EndPoints.URL_POST_RELATION,
			HeaderBuilder.POST_HEADER_AUTHORIZATION(token),
			relation
		)

		return res
	},
}

export default RelationRepository;

