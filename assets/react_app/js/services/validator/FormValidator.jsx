/**
 * author: JamesStandbridge
 * date: 22/01/2021
 */

import React from "react";

const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const regexDigit = /[0-9]/
const regexSpecialChar = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
const regexFloat = /^[0-9]{1,3}(,[0-9]{3})*(([\\.,]{1}[0-9]*)|())$/

const FormValidator = {
    isValidEmail: function(email) {
        return regexEmail.test(email)
    },

    isEmpty: function(string) {
        return string.trim().length === 0
    },

    isPasswordStrong: function(password) {
        const containOneSpecialChar = password.match(regexSpecialChar)
        const containOneDigit = password.match(regexDigit)
        const containEnoughChar = password.length >= 8

        return containOneSpecialChar && containOneDigit && containEnoughChar
    }
};

export default FormValidator;