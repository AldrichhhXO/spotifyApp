import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {GrFormClose} from 'react-icons/gr'

import { fetchArtistsTopTracks, fetchRelatedArtists } from '../lib/Artists/Artists'

// Type for the analysis container
interface SpotifyArtist {
    external_urls: string,
    followers: {
      href: null,
      total: number
    },
    genre: Array<string>,
    href: string,
    id: string,
    images: Array<SpotifyImage>,
    name: string,
    popularity: number,
    type: string
    uri: string
  }


interface SpotifyTrack {
    album: SpotifyAlbum,
    artists: Array<Object>,
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids: Object,
    external_urls: Object,
    href: string,
    id: string,
    is_local: boolean,
    is_playable: boolean,
    name: string,
    popularity: number,
    preview_url: string,
    track_number: number,
    type: string,
    uri: string
}


type SpotifyImage =  {
    height: number,
    url: string,
    width: number
}

type SpotifyAlbum = {
    album_type: string,
    id: string,
    images: SpotifyImage,
    name: string,
    release_date: string,
    release_day_precision: string,
    total_tracks: number,
    type: string,
    uri: string
}


/**
 * ArtistModal, Appears when an artist is clicked in the showcase.
 * Props:
 *      metadata: The meta data regarding the artist
 * @returns 
 */
export default function ArtistModal({ metadata, modalUpdate, clearModalHandler }) {

    const { name, genres, images, id } = metadata
    let artistImage = images[2]
    let artistGenres = genres.map((genre) => { return genre + ", " })
    
    // Modal data
    let [topTracks, setTopTracks] = useState([])
    let [relatedArtists, setRelatedArtists] = useState([])

    // Selected Artist Data
    let [selectedArtist, setSelectedArtist] = useState<SpotifyArtist>()
    let [selectedTrack, setSelectedTrack] = useState<SpotifyTrack>()
    let [selectedType, setSelectedType] = useState('')

    let modalShowcase = (spotifyData, type) =>  { 
        setSelectedType(type)
        if (type == 'artist') {
            setSelectedArtist(spotifyData)
            
        }
        else if (type == 'track') {
            setSelectedTrack(spotifyData)
            console.log('track: ', spotifyData)
        }
     } 

    // Access token variables / headers
    let access_token = localStorage.getItem('access_token')
    let headers = { 'Authorization': 'Bearer ' + access_token.split('-R-')[0]}


    useEffect(() => {
        fetchArtistsTopTracks(id, headers, setTopTracks)
        fetchRelatedArtists(id, headers, setRelatedArtists)
    }, [metadata])

    let ArtistTopTracks = topTracks.map((track, index) => {
        return <div title = {track.name} key = {index} className='inline-block mx-1 cursor-pointer rounded-full' onMouseEnter={() => modalShowcase(track, "track")} onMouseLeave = {() => modalShowcase(null, '')}><Image src = {track.album.images[2].url}  width = {65} height = {65} className='rounded-full  ' alt = {track.name}/></div>
    })

    let RelatedArtists = relatedArtists.map((artist, index) => {
        return <div title = {artist.name} key = {index} className='inline-block mx-1 cursor-pointer' onMouseEnter={() => modalShowcase(artist, "artist")} onMouseLeave = {() => modalShowcase(null, "")} onClick={() => modalUpdate(artist)}><Image src = {artist.images[2].url}  width = {60} height = {60} className='rounded-full' /></div>
    } )

    let HoveredArtist = () => {
        if (selectedArtist) {
            return <div className='px-6 flex flex-col justify-center items-center'>
                <Image src = {selectedArtist.images[1].url} width = {selectedArtist.images[1].width} height = {selectedArtist.images[1].height} alt = {selectedArtist.name} />
                <strong className='mt-3'>{selectedArtist.name}</strong>
            </div>
        }
        else return null
    }

    let HoveredTrack = () => {
        let artists = selectedTrack.artists.map((track) => {return <p>{track.name}</p> })
        return <div className='px-6 flex flex-col justify-center items-center'>
        <Image src = {selectedTrack.album.images[1].url} width = {selectedTrack.album.images[1].width} height = {selectedTrack.album.images[1].height} alt = {selectedTrack.name} />
        <strong className='mt-3'>{selectedTrack.name}</strong>
        {artists}
    </div>
    }

        return (
        <div className='absolute z-10 bg-gray-800 w-full h-full min-h-screen flex justify-center items-center'>
            <div className=' w-4/5 min-w-[300px] max-w-[90%] md:w-2/3 md:max-w-6xl mx-auto  bg-gray-200 rounded-lg relative'>
                <div className='h-8 w-full flex items-center justify-end '><GrFormClose onClick={() => clearModalHandler()} className='mr-2 mt-1 text-2xl cursor-pointer'/></div>
                <div className='flex justify-center items-center'>
                    {/* Contents for the modal */}
                    <div className='px-5 md:px-5 md:w-full py-2 flex lg:w-[60%] border  flex-col items-center sm:items-start'>
                        <div className = 'modal-header flex items-end '>
                            <Image src = {artistImage.url}  width = {60} height = {60} className='rounded-full' alt='ArtistProfile' />
                            <div className='modal-metadata mx-3 mb-1'>
                                <h3><strong>{ name } </strong></h3>
                                <p className='inline-block'>{artistGenres}</p>
                            </div>
                        </div>
                        <hr className='bg-black mt-4 h-[2px] w-full'></hr>
                        <div className='modal-body  mt-3'>
                            <div className='modal-top-tracks text-center'>
                                <h3 className='mt-5 mb-3 text-center sm:text-left'><strong>{name}'s Top Tracks</strong></h3>
                                { ArtistTopTracks }
                            </div>
                        </div>
                        <div className='modal-footer  mt-3 mb-5 text-center sm:text-left'>
                            <h3 className='mt-5 mb-3'><strong>Fans also like</strong></h3>
                            { RelatedArtists }
                        </div>
                    </div>

                    <div className='w-1/3 h-full hidden  float-right lg:flex lg:justify-center lg:items-center'>
                        { selectedType == "artist"? <HoveredArtist /> :null }
                        { selectedType == "track" ? <HoveredTrack /> : null }
                        
                    </div>
                </div>
            </div>
        </div>
        )
}
