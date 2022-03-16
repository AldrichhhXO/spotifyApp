import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Axios from 'axios'

interface SpotifyImage {
  height: number,
  url: string,
  width: number
}

type SpotifyArtist  = {
  external_urls: string,
  followers: {
    href: string, 
    total: number
  },
  id: string,
  href: string, 
  images: SpotifyImage[]
}

interface ArtistProps {
  index: number,
  metadata: Object,
  artistImageSrc: string,
  width: number,
  height: number,
  artistName: string,
  artistId : string,
  showcaseHandler: any,
  showcaseClearHandler: any
}

export default function ArtistComponent({ index, metadata, artistImageSrc, width, height, artistName, artistId, showcaseHandler, showcaseClearHandler } : ArtistProps) {
  const [ previewUrl, setPreviewUrl] = useState()
  const [ artistData, setArtistData ] = useState()
  

  let token = localStorage.getItem('access_token')
  let header = { 'Authorization': 'Bearer ' + token.split('-R-')[0] }
  useEffect(() => {
    
    const fetchSongPreview = async () => {
      let response = await Axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {'headers': header} )
      let sound = await response.data.tracks[0].preview_url
      console.log(sound)
      setPreviewUrl(sound)
    }
    try {
      // fetchSongPreview()
    }
    catch (e) {
      console.log(e.message)
    }
   
  }, [artistId])

  return (
    <div className = "my-[-3px] hover:opacity-60" onMouseEnter={() => showcaseHandler(metadata, 'Artist')} onMouseLeave = {() => showcaseClearHandler()}>
      <Image key = {index} src = {artistImageSrc} width = {width} height = {height} alt = {artistName}/>

  </div>
  )
}
