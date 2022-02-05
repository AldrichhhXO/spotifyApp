const express = require('express');
const Router = express.Router()
const request = require('request')


// Spotify Credentials 
let client_id = process.env.Client_Id;
let client_secret = process.env.Client_Secret;
let redirect_uri = process.env.Redirect_Uri ;

let stateKey = 'spotify_auth_state'


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


Router.get('/test', (req, res) => {
    res.send('Yeet')
})

// Login route for spotify
Router.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state)

    const scope = 'user-read-private user-read-email'

    // Set up the redirect url, need to use URLSearchParams instead of querystring since it is legacy
    const params = new URLSearchParams();

    params.append('response_type', 'code')
    params.append('client_id', client_id)
    params.append('scope', scope)
    params.append('redirect_uri', redirect_uri)
    params.append('state', state)
    /* 
      Redirect the request to the Spotify Auth Service
      After the login is complete, it will redirect to the 'redirect-uri', which is
      localhost:3000/callback 
\
    */
    console.log('https://accounts.spotify.com/authorize?' + params)
    res.send('https://accounts.spotify.com/authorize?' + params)    
})






Router.get('/callback', (req, res) => {
    /*
      This is the function that is called once the Spotify service has been accepted / rejected
      if Successful, the query will contain two params:
  
        1. Code: Authorization code that can be exchanged for a refresh token
        2. State: Value of the state parameter supplied in the request
  
      If error, the link will return the query
  
        1. error: The reason why authorization failed
        2. 
    */
        // Query params if successful
        let state = req.query.state || null
        let code = req.query.code || null
        let storedState = req.cookies ? req.cookies[stateKey] : null
  
        if (state === null || state !== storedState) {
          let params = new URLSearchParams()
          params.append('error', 'state_mismatch')
          res.redirect('/#' + params)
        } else {
          res.clearCookie(stateKey)
  
          let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
              code: code,
              redirect_uri: redirect_uri,
              grant_type: 'authorization_code'
            },
            headers: {
              'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
          }
         
          request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
              let access_token = body.access_token
              let refresh_token = body.refresh_token
  
              let options = {
                url: 'https://api.spotify.com/v1/me',
                headers: {'Authorization': 'Bearer ' + access_token},
                json: true
              }
  
  
              request.get(options, (error, response, body) => {
                console.log(body);
              });
  
              let params = new URLSearchParams()
              params.append('access_token', access_token)
              params.append('refresh_token', refresh_token)
              res.redirect('/#' + params)
            } else {
              let params = new URLSearchParams()
              res.redirect('/#' + params.append('error', 'invalid_token'))
            }
          })
        };
  })


  Router.get('/refresh_token', (req, res) => {
    let refresh_token = req.query.refresh_token;
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')},
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token;
        res.send({
          'access_token': access_token
        })
      }
    })
  })
  



module.exports = Router;