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

	GET_HEADER_AUTHORIZATION: function(token) {
		return {
			"Content-type": "application/json",
			"Authorization": "Bearer " + token,
			"method": "GET"
		}	
	}
};

export default HeaderBuilder;

