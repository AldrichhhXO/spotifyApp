import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect } from 'react'

import Profile from './Components/Profile'
import Layout from './Components/Layout'
import ArtistsContainer from './Components/ArtistsContainer'
import TracksContainer from './Components/TracksContainer'
import Showcase from './Components/Showcase'
import ShowcaseLayout from './Layout/ShowcaseLayout'

import {useRouter} from 'next/router'
import Axios from 'axios'
//let request = require('request')

export default function Home() {
  let router = useRouter()
  const [spotifyProfile, setSpotifyProfile] = useState('')
  const [spotifyTopTracks, setSpotifyTopTracks] = useState('')
  const [spotifyTopArtists, setSpotifyTopArtists] = useState('')


  cosnt [timeFrame, setTimeFrame] = useState('medium_term')
  const [loading, isLoading] = useState(false)

  useEffect(() => {
    if (router.query.access_token) {
      isLoading(true)
      let spotifyRequests = {
        userUrl: 'https://api.spotify.com/v1/me',
        topTracksUrl: 'https://api.spotify.com/v1/me/top/tracks?limit=50',
        topArtistsUrl: 'https://api.spotify.com/v1/me/top/artists?limit=20',
        headers: {'Authorization': 'Bearer ' + router.query.access_token},
        
      }
        let userRequest = Axios.get(spotifyRequests.userUrl, {'headers': spotifyRequests.headers})
        let topTracksRequest = Axios.get(spotifyRequests.topTracksUrl, {'headers': spotifyRequests.headers})
        let topArtistsRequest = Axios.get(spotifyRequests.topArtistsUrl, {'headers': spotifyRequests.headers})
        Axios.all([userRequest, topTracksRequest, topArtistsRequest])
          .then(Axios.spread((...responses) => {
            // user profile data 
            const userResponse = responses[0].data
            setSpotifyProfile(userResponse)
    

            // Top Tracks
            const topTracksResponse = responses[1].data.items
            setSpotifyTopTracks(topTracksResponse)
            console.log(topTracksResponse)

            const topArtistsResponse = responses[2].data.items
            setSpotifyTopArtists(topArtistsResponse)
            console.log(topArtistsResponse)
            isLoading(false)
          }))
          

      /* This will remove the access code from the url */
      // window.history.replaceState({}, document.title, '/')
    }
    else {
    
    }
  }, [router.query, timeFrame])

  if (loading) {
    return (
      <Layout>
        <h1>Loading user</h1>
      </Layout>
    )
  }
  else {
    if (spotifyProfile) {


      return (<ShowcaseLayout tracksData = {spotifyTopTracks} artistsData = {spotifyTopArtists} />)
      /*
      return (
        <Layout>
        <h2 className="text-red-700 text-2xl">Spotify Web Application</h2>
        <Profile displayName = {spotifyProfile.display_name} profileImg = {spotifyProfile.images[0].url} followers = {spotifyProfile.followers.total} />
        <strong><h1 className='my-10'>Your Top Artists</h1></strong>
        <ArtistsContainer artistData={spotifyTopArtists} />
        <strong><h1 className='my-10'>Your Top Tracks</h1></strong>
        <div>

        </div>
        <TracksContainer trackData={spotifyTopTracks} />
        <Showcase />
    </Layout>
   
    
      ) */
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





