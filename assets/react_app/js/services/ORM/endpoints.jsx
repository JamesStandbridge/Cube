/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React from "react";
import resources from "@api-platform/admin/lib/__fixtures__/resources";

const EndPoints = {
	//security
	URL_GET_TOKEN: "/api/login_check",
	URL_REGISTER: "/app/security/register",
	URL_GET_USER: "/api/user",

	//categories
	URL_POST_CATEGORY: "/api/categories",
	URL_GET_CATEGORY: "/api/categories",

	//resources
	URL_POST_RESOURCE: "/api/resources",
	URL_GET_RESOURCE_LIST: "/api/resources",

	URL_GET_RESOURCE: function(resourceId) {
		return `/api/resources/${resourceId}`
	},
	URL_GET_COMMENTS_RESOURCE: function(resourceId) {
		return `/api/resources/${resourceId}/comments`
	},

	URL_GET_RESOURCE_TYPE_LIST: "/api/resource_types",
	URL_GET_RESOURCE_ATTRIBUTES_LIST: "/api/resource_attributes",

	URL_POST_COMMENT:"/api/comments",
	URL_POST_RESOURCE_TYPE_LIST: "/api/resource_types",
	URL_POST_RESOURCE_ATTRIBUTES_LIST: "/api/resource_attributes",


}
	export default EndPoints

