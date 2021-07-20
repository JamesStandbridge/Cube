/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React from "react"
import axios from "axios"

const AxiosService = {
    sendPostRequest: async function(url, headers, body) {
		const res = await axios.post(url, body, {
			headers: headers
		})
		return res
	},

	sendGetRequest: async function(url, headers) {
		const res = await axios.get(url, {
			headers: headers
		})
		return res
	},

	sendDeleteRequest: async function(url, headers){
		return await axios.get(url, {
			headers: headers
		})

	},

	sendPutRequest: async function(url, headers, body) {
    	return await axios.put(url,body,{
    		headers:headers
		})
	}
}

export default AxiosService

