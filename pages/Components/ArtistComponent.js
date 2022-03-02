import React from 'react'

export default function ArtistComponent() {
  return (
    <div className = "">
    <Image key = {index} src = {artist.images[0].url} width = {artist.images[0].width} height = {artist.images[0].height} alt = {artist.name}/>
  </div>
  )
}
