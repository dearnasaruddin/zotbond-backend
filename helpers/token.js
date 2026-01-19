const jwt = require('jsonwebtoken')

const jwToken = (user, expiredIn)=>{
    return jwt.sign(user, process.env.SECRET_TOKEN,{expiresIn: expiredIn})
}

module.exports = jwToken