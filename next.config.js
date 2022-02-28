let querystring = require('query-string')

// Testing to make sure environment variable exists

let responseType = '?response_type=code'
let queryString = querystring.parse(responseType)

queryString.client_id = process.env.Spotify_Client_Id || null
queryString.scope = "user-read-private user-follow-read user-library-read"
queryString.redirect_uri = process.env.redirect_uri || null
queryString.state = ""

const stringified = querystring.stringify(queryString)

module.exports = {
  reactStrictMode: true,
  async redirects () {
    return [
      {
        source: '/login',
        destination: `https://accounts.spotify.com/authorize?${stringified}`,
        permanent: false
      }
    ]
  }
}
