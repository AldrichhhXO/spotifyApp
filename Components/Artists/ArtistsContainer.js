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
        <nav className='w-[100%] mb-5 max-w-lg flex justify-center sm:block'>
          <a className={`text-sm md:text-lg py-2 px-3 mx-2 cursor-pointer text-white border-b-2 float-right ${artistTimeFrame == 'long_term' ? 'bg-white text-gray-800 rounded-lg' : 'text-white bg-none'}`} onClick = {() => setArtistTimeFrame('long_term')}>All Time</a>
          <a className={`text-sm md:text-lg py-2 px-3 mx-2 cursor-pointer text-white hover:border-b-2 hover:border-white float-right ${artistTimeFrame == 'medium_term' ? 'bg-white text-gray-800 rounded-lg' : 'text-white bg-none'}  `} onClick = {() => setArtistTimeFrame('medium_term')}>Last 6 Months</a>
          <a className={`text-sm md:text-lg py-2 px-3 mx-2 cursor-pointer text-white hover:border-b-2 hover:border-white float-right ${artistTimeFrame == 'short_term' ? 'bg-white text-gray-800 rounded-lg' : 'text-white bg-none'} `} onClick = {() => setArtistTimeFrame('short_term')}>Current</a>
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