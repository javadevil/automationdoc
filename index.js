'use strict'
const settings		= require('./settings')
const application 	= require('express')()
const mongoose 		= require('mongoose')
const session		= require('express-session')
const MongodbStore	= require('connect-mongodb-session')(session)

mongoose.connect(settings.mongodb.uri)
mongoose.Promise = Promise

application.use(require('compression')())

const store = new MongodbStore({
	uri 		: settings.mongodb.uri,
	collection	: 'session'
})
application.use(session({
	secret 				: settings.session.secret ,
	cookie 				: settings.session.cookie ,
	store  				: store ,
	resave 				: false ,
	saveUninitialized 	: false
}))

application.all('/',(req,res)=>res.json(req.session))

const http = require('http')
const port = 8080
http.createServer(application).listen(port,(err)=>{
	if (err) {
		console.error(err)
	}
	console.log(`HTTP Listen at ${port}`)
})