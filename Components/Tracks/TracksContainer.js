import React, { useState, useEffect } from 'react'
import TrackComponent from './TrackComponent'
import { fetchTopTracks } from '../../lib/tracks/tracks'
import ShowcaseGrid from '../Showcase/ShowcaseGrid'
 
export default function TracksContainer({ showcaseModalHandler }) {
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
        return <TrackComponent key = { index } trackData = { track } trackIndex = { index } modalHandler = {showcaseModalHandler} />
      })

      
  return (
    <div className='w-[90%] max-w-[1140px]  flex justify-center items-end flex-col '>
        <nav className='w-[100%] mb-5 max-w-lg flex justify-center sm:block'>
          <a className={`text-sm md:text-lg py-2 px-3 mx-2 cursor-pointer text-white border-b-2 float-right ${trackTimeFrame == 'long_term' ? 'bg-white text-gray-800 rounded-lg' : 'text-white bg-none'}`} onClick = {() => setTrackTimeFrame('long_term')}>All Time</a>
          <a className={`text-sm md:text-lg py-2 px-3 mx-2 cursor-pointer text-white hover:border-b-2 hover:border-white float-right ${trackTimeFrame == 'medium_term' ? 'bg-white text-gray-800 rounded-lg' : 'text-white bg-none'}  `} onClick = {() => setTrackTimeFrame('medium_term')}>Last 6 Months</a>
          <a className={`text-sm md:text-lg py-2 px-3 mx-2 cursor-pointer text-white hover:border-b-2 hover:border-white float-right ${trackTimeFrame == 'short_term' ? 'bg-white text-gray-800 rounded-lg' : 'text-white bg-none'} `} onClick = {() => setTrackTimeFrame('short_term')}>Current</a>
        </nav> 
        <ShowcaseGrid>
          { TrackComponents }
        </ShowcaseGrid>
    </div>
  )

    } else return null


}
