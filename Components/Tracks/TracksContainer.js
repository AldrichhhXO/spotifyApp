import React, { useState, useEffect } from 'react'
import TrackComponent from './TrackComponent'
import fetchTracks from '../../lib/tracks/tracks'

 
export default function TracksContainer({ trackData, showcaseHandler, showcaseClearHandler }) {
  const [tracks, setTracks ] = useState()
  const [artistTimeFrame, setArtistTimeFrame] = useState('medium_term')
  let token = localStorage.getItem('access_token')
  let header = { 'Authorization': 'Bearer ' + token }


  
    useEffect(() => {
      fetchTracks()
    }, [])

    let TrackComponents = trackData.map((track, index) => {
      return <TrackComponent 
                key = { index } 
                trackData = { track }
                imageSource={ track.album.images[1].url } 
                imageWidth = { track.album.images[1].width } 
                imageHeight = { track.album.images[1].height } 
                trackIndex = { index }

        />
    })

  return (
    <div className='w-[80%] max-w-fit grid lg:w-[70%] xl:w-[50%] xl:max-w-6xl grid-cols-5  sm:grid-cols-5'>
        { TrackComponents }
    </div>
  )
}
