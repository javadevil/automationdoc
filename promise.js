'use strict'

const fs = require('fs')

fs.readFile('./a.js')
.then(data => console.log(data))
.catch(err => console.error(err))