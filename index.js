'use strict'
const http 			= require('http')
const https 		= require('https')
const fs 			= require('fs')

const express 		= require('express')
const compression 	= require('compression')
const session 		= require('express-session')

const settings 		= require('settings')

const MongoDBStore 	= require('connect-mongodb-session')(session);

class Server {
	static start() {
		const app = express()

		app.set('trust proxy', 1)

		app.use(compression())
		app.use(session({
			secret 				: settings.SESSION.SECRET,
			cookie				: {
				maxAge 			: settings.SESSION.MAXAGE,
				secure			: true
			},
			resave				: false,
			saveUninitialized	: false,
			store				: MongoDBStore({
				uri 			: settings.MONGODB.URI,
				collection 		: settings.SESSION.COLLECTION
			})
		}))

		app.all('/',(req,res) => {
			return res.json(req.session)
		})

		if (settings.HTTP) {
			const port = settings.HTTP.PORT || 3001
			
			http.createServer(app)
			.listen(port, function reportHttp(err) {
				if (err) {
					return console.error(err)
				}
				return console.log(`HTTP listen at ${port}`)
			})
		}

		if (settings.HTTPS) {
			const port 		= settings.HTTPS.PORT || 3002
			const options 	= {
				key		: fs.readFileSync(settings.HTTPS.OPTIONS.KEY),
				cert 	: fs.readFileSync(settings.HTTPS.OPTIONS.CERT)
			}

			https.createServer(options,app)
			.listen(port, function reportHttps(err) {
				if (err) {
					return console.error(err)
				}
				return console.log(`HTTPS listen at ${port}`)
			})
		}
	}
}

if (require.main === module) {
	Server.start()
}