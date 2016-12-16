'use strict'
const express   = require('express')
const app       = express()

const settings  = require('automationdoc-settings')

app.get('/',(req,res) => {
    return res.send(settings.APPS[0].PATH)
})
settings.APPS.forEach(function(element) {
    if (element.hasOwnProperty('PATH') && element.hasOwnProperty('MODULE')) {
        app.use(element.PATH,require(element.MODULE).application)
        console.log(element.MODULE,'started')
    }
}, this);
app.listen(3000)
console.log('ok')
