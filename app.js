'use strict';
const express   = require('express');
const app       = express()

const settings  = require('./settings')

app.get('/',(req,res) => {
    return res.send(settings)
})
app.listen(3000)
console.log('ok')
