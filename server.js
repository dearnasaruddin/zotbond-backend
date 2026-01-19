const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/routes')
const connect = require('./database/dbConfig')

connect()

const app = express()
app.use(express.json())
app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true,
}))
app.use(router)

// ============ Global error handler ============
// app.use((err, req, res, next)=>{
//     console.log(err)
//     res.status(500).json({message: 'Server Error Occurred'})
// })

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})