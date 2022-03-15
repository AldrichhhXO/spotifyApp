import React, { useEffect, useState } from 'react'
import { fetchArtists } from '../../lib/Artists/Artists'

import Axios from 'axios'
import ArtistComponent from './ArtistComponent'

export default function ArtistsContainer({ showcaseHandler, showcaseClearHandler }) {
  const [artists, setArtists] = useState()
  const [artistTimeFrame, setArtistTimeFrame] = useState('medium_term')

  // Change this to React.Context
  let token = localStorage.getItem('access_token')
  let header = { 'Authorization': 'Bearer ' + token.split('-R-')[0] }

  useEffect(() => {
    fetchArtists(artistTimeFrame, header, setArtists)
  }, [artistTimeFrame])


  if (artists) {
    let ArtistComponents = artists.map((artist, index) => { 

      return (<ArtistComponent 
                index = {index} 
                metadata = {artist}
                artistImageSrc= { artist.images[1].url }
                width = {artist.images[1].width} 
                height = {artist.images[1].height} 
                artistName = {artist.name} 
                artistId = {artist.id} 
                showcaseHandler = { showcaseHandler } 
                showcaseClearHandler = {showcaseClearHandler}/>)
    })


    return (
      <div className='w-[80%]  flex justify-center items-center flex-col'>
        <nav className='w-[100%] max-w-lg  mb-8 flex justify-around  border-2 border-black '>
          <a className='text-sm md:text-xl py-4 cursor-pointer bg-white px-10' onClick = {() => setArtistTimeFrame('short_term')}>Current</a>
          <a className='text-sm md:text-xl py-4 cursor-pointer bg-white px-10' onClick = {() => setArtistTimeFrame('medium_term')}>Last 6 Months</a>
          <a className='text-sm md:text-xl py-4 cursor-pointer bg-white px-10' onClick = {() => setArtistTimeFrame('long_term')}>All Time</a>
        </nav> 
        <div className=' max-w-fit  grid lg:w-[100%] xl:w-[80%] xl:max-w-6xl grid-cols-5 lg:grid-cols-10'>
          { ArtistComponents }
        </div>
      </div>
    )
    
  } else return null
  



}
/*

*/