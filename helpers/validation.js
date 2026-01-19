const User = require('../models/userModel')

const emailValidate = (email) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

const lengthValidate = (text, min, max) => {
    if (text.length < min || text.length > max) return false
    return true
}


const usernameValidate = async (username) => {
    let isTrue = false
    do {
        const userExist = await User.findOne({ username })

        if (userExist) {
            username += (new Date().getTime() * Math.random()).toString().substring(0, 1)
            isTrue = true
        } else {
            isTrue = false
        }

    } while (isTrue);

    return username

}

module.exports = { emailValidate, lengthValidate, usernameValidate }