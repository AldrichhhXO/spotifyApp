import React from 'react'
import Image from 'next/image'
import ArtistComponent from './ArtistComponent'

export default function ArtistsContainer({ artistData }) {

  let ArtistsComponents = artistData.map((artist, index) => {
    return (
      <div className = "">
        <Image key = {index} src = {artist.images[0].url} width = {artist.images[0].width} height = {artist.images[0].height} alt = {artist.name}/>
      </div>
    )
  })


  return (
    <div className='w-[80%] max-w-fit grid lg:w-[70%] xl:w-[50%] xl:max-w-6xl grid-cols-5  sm:grid-cols-5'>
       { ArtistsComponents }
    </div>
  )
}
/*

*/