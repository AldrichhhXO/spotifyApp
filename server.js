var http = require('http')

/* Initializing all of the modules needed */
let express = require('express')
let cors = require('cors')
let cookieParser = require('cookie-parser')
let dotenv = require('dotenv').config()

let AuthRouter = require('./Routes/AuthRoute')

let app = express()


// Adding all the middlewares to the 
app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser())
    .use('/', AuthRouter);


app.listen(3000, () => console.log('Listening on Port 3000'))