import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function TrackComponent({ trackData, imageSource, imageWidth, imageHeight, trackIndex, showcaseHandler, showcaseClearHandler }) {
    const [albumData, setAlbumData] = useState(trackData.album)
    const [songName, setSongName] = useState(trackData.name)
    const [previewUrl, setPreviewUrl] = useState(trackData.preview_url)
    
    const showcaseTrack = (e) => {
        // let musicPlayer = document.getElementById(`player-${trackIndex}`)
        // musicPlayer.volume = "0.2"
        // musicPlayer.load()
        // musicPlayer.play()
    }

    const stopShowcase = () => {
      //   let musicPlayer = document.getElementById(`player-${trackIndex}`)
      //  musicPlayer.pause()
    }

  return (
    <div className='my-[-3px] hover:opacity-60' onMouseEnter={() => showcaseHandler(trackData, 'Track')} onMouseLeave = {() => showcaseClearHandler()} >
        <Image src = {imageSource} width = {imageWidth} height = {imageHeight} />

    </div>
  )
}
