import React from 'react'
import Image from 'next/image'

/**
 * Showcase component for the track / ID.
 * @returns 
 */
export default function ShowcaseComponent({ showcasedData, type }) {
  console.log(showcasedData)
  let showcaseImageObject
  let showcaseArtists
  let showcaseAlbum = ''
  if (type == 'Artist') showcaseImageObject = showcasedData.images[1]
  else if (type == 'Track') { 
    showcaseImageObject = showcasedData.album.images[1]
    showcaseAlbum = showcasedData.album
    showcaseArtists = showcasedData.artists
  }
  let {url , width, height} = showcaseImageObject

  return (
    <div className='w-[80%] h-[40%] sm:h-[90%] max-w-[500px] max-h-[600px] bg-lime-800 shadow-xl rounded-md flex flex-row lg:flex-col justify-center items-center z-10 '>
      <div className='px-5'>
        <Image  src = {url} width = {width} height = {height} alt = {showcasedData.name}/>
      </div>
      <div className=' w-full text-white'> 
        <strong><h1 className='w-[90%] mx-auto text-center my-6 text-md  sm:text-lg lg:text-2xl'>{showcasedData.name}</h1></strong>
        <div className='flex justify-center flex-col items-center'>
          {showcaseArtists && showcaseArtists.map((artist) => <p className='text-xl'>{artist.name}</p>)}
        </div>
        <div className='w-[80%] m-auto text-center my-3'>
          {showcaseAlbum && <strong className=' w-full text-lg'>{showcaseAlbum.name}</strong>}
        </div>
        
      </div>

    </div>
  )

}
