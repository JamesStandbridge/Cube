/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React from "react";

const HeaderBuilder = {

	POST_HEADER: function() {
		return {
			"Content-type": "application/json",
			"method": "POST"
		}
	},

	GET_HEADER: function() {
		return {
			"Content-type": "application/json",
			"method": "GET",
		}
	},

	POST_HEADER_AUTHORIZATION: function(token) {
		return {
			"Content-type": "application/json",
			"Authorization": "Bearer " + token,
			"method": "POST"
		}
	},

	PUT_HEADER_AUTHORIZATION: function(token) {
		return {
			"Content-type": "application/json",
			"Authorization": "Bearer " + token,
			"method": "PUT"
		}
	},

	GET_HEADER_AUTHORIZATION: function(token) {
		return {
			"Content-type": "application/json",
			"Authorization": "Bearer " + token,
			"method": "GET"
		}	
	},
    DELETE_HEADER_AUTHORIZATION: function(token) {
		return {
			'Content-Type' : 'application / json',
			"Authorization": "Bearer " + token,
			"method": "DELETE"
		}
    },

	UPLOAD_MEDIA_HEADER_AUTHORIZATION: function(token) {
		return {
			"Content-Type": "multipart/form-data",
			"Authorization": "Bearer " + token,
			"method": "POST"
		}
	}
};

export default HeaderBuilder;

