require('dotenv').config()
const express = require('express')
const app = express()
const port = 5454
const mongoose = require('mongoose')
const router = require('./routes/router')
app.use('/api',router)
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser : true , useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => {console.info(`Connected to database.`)})
app.listen(port,(err)=>{
    if (err) return console.info(err)
    console.info(`Server running on port ${port}`)
})