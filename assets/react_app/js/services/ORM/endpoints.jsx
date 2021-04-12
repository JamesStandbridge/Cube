/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React from "react";
import resources from "@api-platform/admin/lib/__fixtures__/resources";

const EndPoints = {
	//stats
	URL_GET_USER_RESOURCE_STATS: "/api/resources/stats",

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
	URL_GET_USER_RELATIONS: "/api/citizen-relationships",
	URL_DELETE_USER_RELATION: function(relationID) {
		return `/api/citizen-relationships/${relationID}/delete`
	},

	//admin
	URL_GET_UTILISATEUR_LIST: "/api/users",

	URL_UPDATE_ENABLED_USER: function(userID) {
		return `/api/resource/enabled?user_id=${userID}`
	},
	URL_GET_UTILISATEUR:function(userID) {
		return `/api/users/${userID}`
	},

	//resources
	URL_POST_RESOURCE: "/api/resources",
	URL_GET_RESOURCE_LIST: "/api/resources",
	URL_GET_NEW_RESOURCES: "/api/resources/new",
	URL_SEARCH_RESOURCES: "/xhr/search-resources",

	URL_MODERATE_RESOURCE: "/api/resources/moderate",

	URL_GET_RESOURCE: function(resourceId) {
		console.log(resourceId)
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

	URL_GET_MY_RESOURCES: function(currentUserId) {
		return `/api/users/${currentUserId}/resources`;
	},
    URL_DELETE_RESOURCE: function(resourceId) {
		return `/api/resources/${resourceId}`
    },
	URL_PUT_RESOURCE: function (resourceId) {
		return `/api/resources/${resourceId}`;
	},
    URL_POST_MEDIA: "/api/media_objects",
    URL_GET_MEDIAS:"/api/media_objects",


}
	export default EndPoints

