import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect } from 'react'

import Profile from './Components/Profile'
import Layout from './Components/Layout'
import ArtistsContainer from './Components/ArtistsContainer'

import {useRouter} from 'next/router'
import Axios from 'axios'
//let request = require('request')

export default function Home() {
  let router = useRouter()
  
  const [spotifyData, setSpotifyData] = useState('')
  const [loading, isLoading] = useState(false)

  useEffect(() => {
    if (router.query.access_token) {
      isLoading(true)

      let spotifyRequests = {
        userUrl: 'https://api.spotify.com/v1/me',
        topTracksUrl: 'https://api.spotify.com/v1/me/top/tracks',
        topArtistsUrl: 'https://api.spotify.com/v1/me/top/artists',
        headers: {'Authorization': 'Bearer ' + router.query.access_token},
        
      }
      

      /*
        let userRequest = Axios.get(spotifyRequests.userUrl, {'headers': spotifyRequests.headers})
        let topTracksRequest = Axios.get(spotifyRequests.topTracksUrl, {'headers': spotifyRequests.headers})
        let topArtistsRequest = Axios.get(spotifyRequests.topArtistsUrl, {'headers': spotifyRequests.headers})
        Axios.all([userRequest, topTracksRequest, topArtistsRequest])
          .then(Axios.spread(...responses) => {
            const userResponse = responses[0]

          })
      */

      Axios.get(options.url, {'headers': options.headers})
        .then(res => {
          setSpotifyData(res.data) 
          isLoading(false)
        })
        
      Axios.get('https://api.spotify.com/v1/me/top/artists', {'headers': options.headers})
        .then(res => console.log(res.data))
        
      /*
      request.get(options, (error, response, body) => {
        console.log(body)
        
      }) 
      */

      /* This will remove the access code from the url */
      // window.history.replaceState({}, document.title, '/')
    }
    else {
      console.log('nothing')
    }
  }, [router.query])

  if (loading) {
    return (
      <Layout>
        <h1>Loading user</h1>
      </Layout>
    )
  }
  else {
    if (spotifyData) {

      return (
        <Layout>
        <h2 className="text-red-700 text-2xl">Spotify Web Application</h2>
        <Profile displayName = {spotifyData.display_name} profileImg = {spotifyData.images[0].url} followers = {spotifyData.followers.total} />
    </Layout>
      )
    } else {
      return (
        <Layout>
          <h2 className="text-red-700 text-2xl">Spotify Web Application</h2>
    
          <Link href = "/api/login" passHref><button>Log In</button></Link>
      </Layout>
      )

    }

  }

}





