const mongoose = require('mongoose')
const connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log('Database Successfully Connected')
    })
}

module.exports = connect