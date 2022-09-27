import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface ArtistProps {
  index: number,
  metadata: Object,
  artistImageSrc: string,
  width: number,
  height: number,
  artistName: string,
  modalHandler: React.Dispatch<React.SetStateAction<Object>>
 
}

export default function ArtistComponent({ index, metadata, artistImageSrc, width, height, artistName, modalHandler } : ArtistProps) {
  return (
    <div className = "my-[-3px] cursor-pointer hover:opacity-60"  title = {artistName} onClick = {() => modalHandler(metadata)}>
      <Image key = {index} src = {artistImageSrc} width = {width} height = {height} alt = {artistName}/>
  </div>
  )
}
