// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let querystring = require('query-string')
export default function handler(req, res) {
    //res.status(200).json({ name: 'John Doe' })

    let responseType = '?response_type=code'
    let queryString = querystring.parse(responseType)
    
    queryString.client_id = process.env.Spotify_Client_Id || null
    queryString.scope = "user-read-private user-follow-read user-library-read"
    queryString.redirect_uri = process.env.redirect_uri || null
    queryString.state = ""
    const stringified = querystring.stringify(queryString)

    res.redirect(`https://accounts.spotify.com/authorize?${stringified}`)
  }
  