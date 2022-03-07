import Link from 'next/link'
import {useState, useEffect } from 'react'
import Layout from '../Components/Layout/Layout'
import ShowcaseLayout from '../Components/Layout/ShowcaseLayout'
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
        <ShowcaseLayout 
        tracksData = {spotifyTopTracks} 
        tracksTimeFrameHandler = {updateTracksTimeFrame}  
        artistsData = { spotifyTopArtists } />
      )
    } else {
      return (
        <>
          <h2 className=" text-6xl my-5">Spotify Web App</h2>
          <section className='flex-center-row'>
            <div className = "max-w-sm min-h-[300px] rounded overflow-hidden shadow-lg mx-3">
              <div className='text-lg px-10 py-20 '>Using Spotify's public API, be able to view the top tracks and artists that you've been listening to at various time periods, while also finding new music based on your current interests.</div>
            </div>
            <div className='max-w-sm rounded overflow-hidden shadow-lg mx-3 min-h-[300px]'>
              <div className='text-lg px-10 py-20'>Explore your library of music by viewing recommended artists and tracks, based on the chosen track / artist</div>
            </div>
            <div className='max-w-sm rounded overflow-hidden shadow-lg mx-3 min-h-[300px]'>
              <div className='text-lg px-10 py-20'>
                Using Spotify's public API, be able to view the top tracks and artists that you've been listening to at various time periods, while also finding new music based on your current interests.
              </div>
            </div>
          </section>
          <div className='my-10'>
          <Link href = "/api/login" passHref><button className='rounded-md my-16 bg-emerald-700 px-10 py-2 text-xl mx-auto text-white hover:border-2 hover:border-emerald-700 hover:bg-white hover:text-black transition-all duration-100 mt-2'>Log In</button></Link>
          </div>
          
      </>
      )
    }

  }
}





