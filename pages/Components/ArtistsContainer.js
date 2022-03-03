import React, { useEffect, useState } from 'react'

import Axios from 'axios'
import ArtistComponent from './ArtistComponent'

export default function ArtistsContainer() {
  const [artists, setArtists] = useState()
  const [artistTimeFrame, setArtistTimeFrame] = useState('medium_term')
  let token = localStorage.getItem('access_token')
  let header = { 'Authorization': 'Bearer ' + token }

  useEffect(() => {
    const fetchArtists = async () => {
      let response = await Axios.get(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${artistTimeFrame}`, {'headers': header})
      let artistArray = response.data.items
      setArtists(artistArray)
    }
    fetchArtists()
  }, [artistTimeFrame])


  if (artists) {
    let ArtistComponents = artists.map((artist, index) => {
      console.log(artist)
      return (<ArtistComponent index = {index} artistImageSrc={artist.images[1].url} width = {artist.images[1].width} height = {artist.images[1].height} artistName = {artist.name} artistId = {artist.id} />)
    })


    return (
      <div className='w-[80%] border-2 border-black flex justify-center items-center flex-col'>
        <nav className='w-[40%] flex justify-around m-auto border-2 border-black'>
          <a className='text-xl py-4 cursor-pointer' onClick = {() => setArtistTimeFrame('short_term')}>Current</a>
          <a className='text-xl py-4 cursor-pointer' onClick = {() => setArtistTimeFrame('medium_term')}>Last 6 Months</a>
          <a className='text-xl py-4 cursor-pointer' onClick = {() => setArtistTimeFrame('long_term')}>All Time</a>
        </nav>
        <div className='w-[80%] max-w-fit grid lg:w-[70%] xl:w-[50%] xl:max-w-6xl grid-cols-5  sm:grid-cols-5'>
          { ArtistComponents }
        </div>
      </div>
    )
    
  } else return null
  



}
/*

*/