/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React from "react";
import jwt_decode from "jwt-decode";

const TokenHandler = {
    decode: function(token) {
    	const decoded_token = jwt_decode(token);
    	return decoded_token;
	},

	isExpired: function(token) {
		const current_time = new Date().getTime() / 1000;
		return current_time > jwt_decode(token).exp
	},

	isSuperAdmin: function(token) {
		if(!token) {
			return false
		} else {
			const decoded_token = jwt_decode(token);
			return decoded_token.roles.includes('ROLE_SUPER_ADMIN');
		}
	},

	isAdmin: function(token) {
		if(!token) {
			return false
		} else {
			const decoded_token = jwt_decode(token);
			return decoded_token.roles.includes('ROLE_ADMIN');
		}
	},

	isModerator: function(token) {
		if(!token) {
			return false
		} else {
			const decoded_token = jwt_decode(token);
			return decoded_token.roles.includes('ROLE_MODERATOR');
		}
	},

	isCitizen: function(token) {
		if(!token) {
			return false
		} else {
			const decoded_token = jwt_decode(token);
			return decoded_token.roles.includes('ROLE_CITIZEN');
		}
	},

	getRole: function(token) {
		const decoded_token = jwt_decode(token)
		const roles = decoded_token.roles;
		if(roles.includes('ROLE_SUPER_ADMIN')) return 'ROLE_SUPER_ADMIN'
		if(roles.includes('ROLE_ADMIN')) return 'ROLE_ADMIN'
		if(roles.includes('ROLE_MODERATOR')) return 'ROLE_MODERATOR'
		if(roles.includes('ROLE_CITIZEN')) return 'ROLE_CITIZEN'
	}
};

export default TokenHandler;