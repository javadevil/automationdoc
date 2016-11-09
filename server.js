'use strict';
const express   = require('express')
const http      = require('http')
const app       = express()

app.get('/',(req,res) => {
    res.send(`Hello World`)
})

http.createServer(app).listen(3000)
