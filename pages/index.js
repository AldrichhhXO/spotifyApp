import Link from 'next/link'
import {useState, useEffect } from 'react'
import Layout from './Components/Layout'
import ShowcaseLayout from './Layout/ShowcaseLayout'
import {useRouter} from 'next/router'
import Axios from 'axios'

export default function Home() {
  let router = useRouter()

  const [spotifyProfile, setSpotifyProfile] = useState('')
  const [spotifyTopTracks, setSpotifyTopTracks] = useState('')
  const [spotifyTopArtists, setSpotifyTopArtists] = useState('')

  const [tracksTimeFrame, setTracksTimeFrame] = useState('medium_term')
  const [artistsTimeFrame, setArtistsTimeFrame] = useState('medium_term')
  const [loading, isLoading] = useState(false)


  const updateTracksTimeFrame = (time_frame) => {
    setTracksTimeFrame(time_frame)
    console.log(time_frame)
  }

  const updateArtistsTimeFrame = (time_frame) => {
    setArtistsTimeFrame(time_frame)
    console.log(time_frame)
  }



  useEffect(() => {
    if (router.query.access_token ) {
       localStorage.setItem('access_token', router.query.access_token)
      isLoading(true)
      let spotifyRequests = {
        userUrl: 'https://api.spotify.com/v1/me',
        topTracksUrl: `https://api.spotify.com/v1/me/top/tracks?limit=50`,
        topArtistsUrl: `https://api.spotify.com/v1/me/top/artists?limit=20&time_range=${artistsTimeFrame}`,
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
          
            const topArtistsResponse = responses[2].data.items
            setSpotifyTopArtists(topArtistsResponse)
            isLoading(false)
          }))
          
          return function cleanup() {
            localStorage.clear()
          }
      /* This will remove the access code from the url */
      // window.history.replaceState({}, document.title, '/')
    }
  }, [router.query, artistsTimeFrame, tracksTimeFrame])

  if (loading) {
    return (
      <Layout>
        <h1>Loading user</h1>
      </Layout>
    )
  }
  else {
    if (spotifyProfile) {
      return (
        <ShowcaseLayout tracksData = {spotifyTopTracks} tracksTimeFrameHandler = {updateTracksTimeFrame}  />
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





