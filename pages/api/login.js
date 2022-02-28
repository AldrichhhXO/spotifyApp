import cookie from 'cookie'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let querystring = require('query-string')


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

export default function handler(req, res) {
    //res.status(200).json({ name: 'John Doe' })
    let state = generateRandomString(16)
    let stateKey = 'spotify_auth_state'
   //res.cookie(stateKey, state)
    

    let responseType = '?response_type=code'
    let queryString = querystring.parse(responseType)
    
    console.log(process.env.Spotify_Client_Id)
    queryString.client_id = process.env.Spotify_Client_Id || null
    queryString.scope = "user-read-private user-top-read"
    queryString.redirect_uri = process.env.Redirect_Uri || null
    queryString.state = state
    const stringified = querystring.stringify(queryString)
    res.setHeader('Set-Cookie', cookie.serialize(stateKey, state))
    res.redirect(`https://accounts.spotify.com/authorize?${stringified}`)
  }
  