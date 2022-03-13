let request = require('request')

export default function handler(req, res) {
    let token = req.query.access_token
    let refresh_token = token.split('-R-')[1]


    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {'Authorixation': 'Basic ' + Buffer.from(process.env.Spotify_Client_Id + ':' + process.env.Spotify_Client_Secret).toString('base64')},
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    }

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            let access_token = body.access_token
            
        }
    })
}