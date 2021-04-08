import React from "react";
import HttpService from "../axios/AxiosService";
import HeaderBuilder from "../HeaderBuilder";
import EndPoints from "../endpoints";

const CommentRepository = {

    create: async function (comment) {
        console.log(comment)
        const res = await HttpService.sendPostRequest(
            EndPoints.URL_POST_COMMENT,
            HeaderBuilder.POST_HEADER(),
            comment
        );
        return res
    },
}

export default CommentRepository;