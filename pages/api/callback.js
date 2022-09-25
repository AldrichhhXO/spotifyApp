let querystring = require('query-string')
let request = require('request')

import axios from 'axios'


export default function handler(req, res) {
  // Use Later
  let stateKey = 'spotify_auth_state'
  
  // Retrieve the returning params of the API call
  let code = req.query.code || null
  let state = req.query.state || null
  let storedState = req.cookies ? req.cookies[stateKey] : null

  console.log("Stored State: " + storedState)
  if (state == null || state !== storedState) {
    res.redirect('/#' + querystring.stringify({error: 'state_mismatch'}));
    
  } else {
    // res.setHeader('Set-Cookie', stateKey, '');
    
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: process.env.Redirect_Uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + Buffer.from(process.env.Spotify_Client_Id + ':' + process.env.Spotify_Client_Secret).toString('base64')
      },
      json: true
    }
    return request.post(authOptions, (error, response, body) => {
      
      if (!error && response.statusCode == 200) {
        // Experimental
        let access_token = body.access_token + '-R-' + body.refresh_token
        
        res.cookie('access_token', access_token);
        res.redirect('/?')
      } else {
        console.log(error)
        res.redirect('/#' + querystring.stringify({error: 'invalid_token'}))
      }

    })
  }
  }
  
  