import React, { useState, useEffect} from 'react'
import Image from 'next/image'
import { GrFormClose } from 'react-icons/gr'
import { fetchRelatedArtists } from '../../lib/Artists/Artists'

export default function TrackModal({ metadata, modalUpdate, clearModalHandler}) {
  const { name, album, id, artists} = metadata
  let { images } = album
  let [relatedArtists, setRelatedArtists] = useState([])
  let access_token = localStorage.getItem('access_token')
  let headers = { 'Authorization': 'Bearer ' + access_token.split('-R-')[0]}

  let primaryArtistId = artists[0].id

  console.log(metadata)

  useEffect(() => {
     fetchRelatedArtists(primaryArtistId, headers, setRelatedArtists)
     console.log(" Related: ", relatedArtists)
  }, [])

  let SongArtists = artists.map((artist) => { return artist.name + ", " })
  console.log(SongArtists)

  let RelatedArtists = relatedArtists.map((artist, index) => {
    console.log(artist)
    return <div title = {artist.name} key = {index} className='inline-block mx-1' onClick={() => modalUpdate(artist)} ><Image src = {artist.images[2].url}  width = {60} height = {60} className='rounded-full' /></div>
} )
  
  return (
    <div className='absolute z-10 bg-gray-800 w-full h-full min-h-screen flex justify-center items-center'>
    <div className=' w-4/5 min-w-[300px] max-w-[90%] md:w-2/3 md:max-w-3xl mx-auto  bg-gray-200 rounded-lg relative'>
        <div className='h-8 w-full flex items-center justify-end '><GrFormClose onClick={() => clearModalHandler()} className='mr-2 mt-1 text-2xl cursor-pointer'/></div>
         <div className='px-5 md:px-10 py-2  flex flex-col items-center sm:items-start'>
            <div className = 'modal-header flex  items-end'>
                <Image src = {images[2].url}  width = {60} height = {60} className='rounded-full' alt='ArtistProfile' />
                <div className='modal-metadata mx-3 mb-1'>
                    <h3><strong>{ name } </strong></h3>
                    <p className='inline-block'>{SongArtists}</p>
                </div>
            </div> 
             <hr className='bg-black mt-4'></hr>
            <div className='modal-body  mt-3'>
                <div className='modal-top-tracks text-center'>
                    <h3 className='mt-5 mb-3 text-center sm:text-left'><strong>Tracks Similar to {name}</strong></h3>
                    {/* { ArtistTopTracks } */}
                </div>
            </div>
            
            <div className='modal-footer  mt-3 mb-5 text-center sm:text-left'>
                <h3 className='mt-5 mb-3'><strong>Fans also like</strong></h3>
                { RelatedArtists }
            </div>
        </div> 
    </div>
</div>
  )
}
