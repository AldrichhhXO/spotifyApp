var http = require('http')

/* Initializing all of the modules needed */
let express = require('express')
let cors = require('cors')
let querystring = require('querystring')
let cookieParser = require('cookie-parser')

let dotenv = require('dotenv').config()


// Spotify Credentials 
let client_id = process.env.Client_Id;
let client_secrent = process.env.Client_Secret;
let redirect_uri = process.env.Redirect_Uri;

let stateKey = 'spotify_auth_state'


let app = express()

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };


// Adding all the middlewares to the 
app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());


// Login route for spotify
app.get('/login', (req, res) => {
    let state = generateRandomString(16);
    res.cookie(stateKey, state)

    const scope = 'user-read-private user-read-email'

    // Set up the redirect url, need to use URLSearchParams instead of querystring since it is legacy
    const params = new URLSearchParams();
    params.append('response_type', 'code')
    params.append('client_id', process.env.Client_Id)
    params.append('scope', scope)
    params.append('redirect_uri', process.env.Redirect_Uri)
    params.append('state', state)




    res.redirect('https://accounts.spotify.com/authorize?' + params)
    


})


/*
http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}).listen(3000)
*/