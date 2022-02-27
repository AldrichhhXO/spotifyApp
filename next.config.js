let querystring = require('query-string')

console.log('ENV Test: ', process.env.Client_Id)

let responseType = '?response_type=code'
let queryString = querystring.parse(responseType)


module.exports = {
  reactStrictMode: true,
  async redirects () {
    return [
      {
        source: '/login',
        destination: 'https://www.spotify.com/authorize?',
        permanent: true
      }
      
      
    ]
  }
}
