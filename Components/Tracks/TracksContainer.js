import React, { useState, useEffect } from 'react'
import TrackComponent from './TrackComponent'
import { fetchTopTracks } from '../../lib/tracks/tracks'

 
export default function TracksContainer({ trackData, showcaseHandler, showcaseClearHandler }) {
  const [tracks, setTracks ] = useState()
  const [trackTimeFrame, setTrackTimeFrame] = useState('medium_term')
  let token = localStorage.getItem('access_token')
  let header = { 'Authorization': 'Bearer ' + token.split('-R-')[0] }

  
    useEffect(() => {
      fetchTopTracks( trackTimeFrame, header, setTracks)
      console.log(tracks)
    }, [trackTimeFrame])

    if (tracks) {
      let TrackComponents = tracks.map((track, index) => {
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
    <div className='w-[80%] flex justify-center items-center flex-col '>
        <nav className='w-4/5 max-w-lg  mb-8 flex justify-around  border-2 border-black '>
          <a className='text-sm md:text-xl py-4 cursor-pointer' onClick = {() => setTrackTimeFrame('short_term')}>Current</a>
          <a className='text-sm md:text-xl py-4 cursor-pointer' onClick = {() => setTrackTimeFrame('medium_term')}>Last 6 Months</a>
          <a className='text-sm md:text-xl py-4 cursor-pointer' onClick = {() => setTrackTimeFrame('long_term')}>All Time</a>
        </nav>
        <div className=' max-w-fit  grid lg:w-[100%] xl:w-[80%] xl:max-w-6xl grid-cols-5 lg:grid-cols-5'>
          { TrackComponents }
        </div>
 
    </div>
  )

    } else return null


}
