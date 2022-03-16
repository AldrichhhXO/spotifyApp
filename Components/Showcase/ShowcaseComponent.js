import React from 'react'
import Image from 'next/image'

/**
 * Showcase component for the track / ID.
 * @returns 
 */
export default function ShowcaseComponent({ showcasedData, type }) {
  console.log(showcasedData)
  let showcaseImageObject
  let showcaseAlbum
  if (type == 'Artist') showcaseImageObject = showcasedData.images[1]
  else if (type == 'Track') { 
    showcaseImageObject = showcasedData.album.images[1]
    showcaseAlbum = showcasedData.data
  }

  let {url , width, height} = showcaseImageObject
  
  return (
    <div className=' w-[600px] h-[700px] border-2 border-black bg-white shadow-xl flex flex-col justify-center items-center'>
      <div>
        {/* Artist Image goes here */}
        <Image  src = {url} width = {width} height = {height} alt = {showcasedData.name}/>
        <strong><h1 className='w-[100%] text-center my-6 text-xl'>{showcasedData.name}</h1></strong>
        
      </div>
    </div>
  )

}
