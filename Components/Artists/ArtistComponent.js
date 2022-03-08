import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import Axios from 'axios'

export default function ArtistComponent({ index,  artistImageSrc, width, height, artistName, artistId, showcaseHandler, showcaseClearHandler }) {

  const [ previewUrl, setPreviewUrl] = useState()

  let token = localStorage.getItem('access_token')
  let header = { 'Authorization': 'Bearer ' + token }
  useEffect(() => {
    const fetchSongPreview = async () => {
      let response = await Axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {'headers': header} )
      let sound = await response.data.tracks[0].preview_url
      console.log(sound)
      setPreviewUrl(sound)
    }
    try {
      fetchSongPreview()
    }
    catch (e) {
      console.log(e.message)
    }
   
  }, [artistId])


  
  // const showcaseTrack = (e) => {
  //   let musicPlayer = document.getElementById(`player-${artistId}`)
  //   musicPlayer.volume = "0.2"
  //   musicPlayer.load()
    
  //   musicPlayer.play()
  // }

  // const stopShowcase = () => {
  //     let musicPlayer = document.getElementById(`player-${artistId}`)
  //   musicPlayer.pause()
  // }


  return (
    <div className = "my-[-3px] hover:opacity-60" onMouseEnter={() => showcaseHandler(artistId, 'Artist')} onMouseLeave = {() => showcaseClearHandler()}>
      <Image key = {index} src = {artistImageSrc} width = {width} height = {height} alt = {artistName}/>
      
      {/* <audio preload id = {`player-${artistId}`}>
        <source src = { previewUrl } type = "audio/mpeg"/>
      </audio> */}
  </div>
  )
}
