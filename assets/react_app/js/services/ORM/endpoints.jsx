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

	//relations
	URL_SEARCH_USER: "/api/user/search",
	URL_GET_TYPE_RELATION_SHIP: "/api/type_of_relationships",
	URL_POST_RELATION: "/api/citizen-relationships",

	//resources
	URL_POST_RESOURCE: "/api/resources",
	URL_GET_RESOURCE_LIST: "/api/resources",
	URL_GET_NEW_RESOURCES: "/api/resources/new",

	URL_MODERATE_RESOURCE: "/api/resources/moderate",

	URL_GET_RESOURCE: function(resourceId) {
		return `/api/resources/${resourceId}`
	},

	URL_GET_COMMENTS_RESOURCE: function(resourceId) {
		return `/api/resources/${resourceId}/comments`
	},

	URL_UPDATE_FAVORITE_RESOURCE: function(resourceId) {
		return `/api/resource/favorite?resource_id=${resourceId}`
	},

	URL_UPDATE_ASIDE_RESOURCE: function(resourceId) {
		return `/api/resource/aside?resource_id=${resourceId}`
	},

	URL_EXPLOIT_RESOURCE: function(resourceId) {
		return `/api/resource/exploited?resource_id=${resourceId}`
	},

	URL_GET_RESOURCE_USER_STATES: "/api/resource-user-states",

	URL_POST_COMMENT:"/api/comments",

	URL_GET_RESOURCE_TYPE_LIST: "/api/resource_types",
	URL_GET_RESOURCE_ATTRIBUTES_LIST: "/api/resource_attributes",

	URL_POST_RESOURCE_TYPE_LIST: "/api/resource_types",
	URL_POST_RESOURCE_ATTRIBUTES_LIST: "/api/resource_attributes",
    URL_GET_AUTHOR_RESOURCE: function (resourceId) {
        return `/api/resources/${resourceId}/author`
    },
	URL_GET_TYPE_RESOURCE: function(resourceId) {
		return `/api/resources/${resourceId}/type`;
	},
	URL_GET_CATEGORY_RESOURCE: function (resourceId) {
		return `/api/resources/${resourceId}/category`;
	},
	URL_GET_CONTENTS_RESOURCE: function (resourceId) {
		return `/api/resources/${resourceId}/contents`;
	},
	URL_GET_ATTRIBUTE_RESOURCE: function(contentId) {
		return `/api/resource_content_values/${contentId}/attribute`;
	}
}
	export default EndPoints

