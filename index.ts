import * as express from 'express'

class Server {
    public static main():number {
        let application = express()
        application.get('/',(req,res)=>{
            return res.send('Hello World')
        })
        application.listen(3000)
        return 0
    }
}

Server.main()