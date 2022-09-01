import React, { useEffect, useState } from 'react'
import { fetchArtists } from '../../lib/Artists/Artists'
import ShowcaseGrid from '../Showcase/ShowcaseGrid'
import ArtistComponent from './ArtistComponent'

export default function ArtistsContainer({ showcaseModalHandler }) {
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
                modalHandler = {showcaseModalHandler}
                 />)
    })

    return (
      <div className='w-[90%] max-w-[1140px]  flex justify-center items-end flex-col'>
        <nav className='w-[100%] max-w-lg flex justify-center sm:block'>
          <a className='text-sm md:text-lg py-4 px-3 cursor-pointer text-white float-right' onClick = {() => setArtistTimeFrame('long_term')}>All Time</a>
          <a className='text-sm md:text-lg py-4 px-3 cursor-pointer text-white float-right' onClick = {() => setArtistTimeFrame('medium_term')}>Last 6 Months</a>
          <a className='text-sm md:text-lg py-4 px-3 cursor-pointer text-white float-right' onClick = {() => setArtistTimeFrame('short_term')}>Current</a>
        </nav> 
        <ShowcaseGrid>
          { ArtistComponents }
        </ShowcaseGrid>
      </div>
    )
    
  } else return null
  



}
/*

*/