import React from 'react'
import Image from 'next/image'

interface TrackProps {
  trackIndex: number,
  trackData: TrackMetaData,
  modalHandler: React.Dispatch<React.SetStateAction<Object>>
}

type TrackMetaData =  {
  album: AlbumData,
  artists: Object[],
  name: string,
  preview_url: string
}

type AlbumData = {
  images: ImageData[],
  album_id: number
}

type ImageData = {
  width: number,
  height: number,
  url: string
}

export default function TrackComponent({ trackData,  trackIndex,  modalHandler }: TrackProps) {
  let {album, name} = trackData
  let { images } = album
  let {width, height, url} = images[0]
  
  return (
    <div className='my-[-3px] cursor-pointer hover:opacity-60' title = {name} onClick = {() => modalHandler(trackData)} >
        <Image key = {trackIndex} src = {url} width = {width} height = {height}  alt = { name }/>
    </div>
  )
}
