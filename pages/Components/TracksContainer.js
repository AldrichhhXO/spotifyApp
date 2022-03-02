import React from 'react'
import Image from 'next/image'
import TrackComponent from './TrackComponent'

export default function TracksContainer({ trackData }) {
    let TrackComponents = trackData.map((track, index) => {
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
    <div className='w-[80%] max-w-fit grid lg:w-[70%] xl:w-[50%] xl:max-w-6xl grid-cols-5  sm:grid-cols-5'>
        { TrackComponents }
    </div>
  )
}
