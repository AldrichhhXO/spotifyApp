import React, { useEffect, useState } from 'react'
import Axios from 'axios'

/**
 * 
s * 1. Need
 *  - Track / Artist image
 *  - Track / Artist Name
 *  - 
 */

interface ShowcaseType {
  showcaseId: string,
  type: string,
  artist: Object | null
}


export default function SpotifyShowcase({ showcaseId, type, artist } : ShowcaseType) {
    const [showcaseData, setShowcaseData] = useState()
    


    const fetchTrackData = async () : Promise<void> => {

    }

    useEffect(() => {
      const fetchShowcaseData  = async () : Promise<void> => {
        let access_token = localStorage.getItem('access_token')
        let header = { 'Authorization': 'Bearer ' + access_token }
        
        
        try {
          let showcaseResponse = await Axios(`https://api.spotify.com/v1/tracks/${showcaseId}?market=US`, { 'headers' : header})
          setShowcaseData(showcaseResponse.data)
        }
        catch (error) {
          if (Axios.isAxiosError(error))
            console.log( error.response)
        }
      }
      if (type == 'Artist') fetchShowcaseData()
      else if (type == 'Track') fetchTrackData()
      else throw new Error ("Showcase component needs to have a Type!")

    }, [showcaseData])

    
    /*
        Be able to determine between if it is a track or an artist
    */
  return (
    <div className='absolute top-1/2 right-[12%] border-2 border-black  max-w-lg  h-16'>

      <h1>The Weeknd</h1>
    </div>
  )
}

