/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React from "react";

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
	URL_POST_RESOURCE: "/profil/ressources"
};

export default EndPoints;

