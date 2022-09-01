import React, { useState, useEffect } from 'react'
import TrackComponent from './TrackComponent'
import { fetchTopTracks } from '../../lib/tracks/tracks'
import ShowcaseGrid from '../Showcase/ShowcaseGrid'
 
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
                  showcaseHandler = { showcaseHandler }
                  showcaseClearHandler = {showcaseClearHandler}
          />
      })

      
  return (
    <div className='w-[90%] max-w-[1140px]  flex justify-center items-end flex-col '>
        <nav className='w-[100%] max-w-lg flex justify-center sm:block'>
          <a className='text-sm md:text-lg py-4 px-3 cursor-pointer text-white float-right' onClick = {() => setArtistTimeFrame('long_term')}>All Time</a>
          <a className='text-sm md:text-lg py-4 px-3 cursor-pointer text-white float-right' onClick = {() => setArtistTimeFrame('medium_term')}>Last 6 Months</a>
          <a className='text-sm md:text-lg py-4 px-3 cursor-pointer text-white float-right' onClick = {() => setArtistTimeFrame('short_term')}>Current</a>
        </nav> 
        <ShowcaseGrid>
          { TrackComponents }
        </ShowcaseGrid>
    </div>
  )

    } else return null


}
