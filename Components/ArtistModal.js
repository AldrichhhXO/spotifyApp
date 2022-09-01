import React, {useState} from 'react'
import Image from 'next/image'

import jai from '../images/jw.jpg'
import {GrFormClose} from 'react-icons/gr'

/**
 * ArtistModal, Appears when an artist is clicked in the showcase.
 * Props:
 *      1. ArtistImage: The image of the artist
 *      2. Artist 
 * @returns 
 */
export default function ArtistModal({modalHandler}) {
    let [toggleModal, setToggleModal ] = useState(true)
    let [accessToken, setAccessToken ] = useState()

    if (toggleModal)  {
        return (
        <div className='bg-gray-800 w-full h-full min-h-screen flex justify-center items-center'>
            
            <div className=' w-4/5 min-w-[300px] max-w-[90%] md:w-2/3 md:max-w-3xl mx-auto  bg-gray-200 rounded-lg relative'>
                <div className='h-8 w-full flex items-center justify-end '><GrFormClose onClick={() => setToggleModal(false)} className='mr-2 mt-1 text-2xl cursor-pointer'/></div>
                <div className='px-5 md:px-10 py-2  flex flex-col items-center sm:items-start'>
                    <div className = 'modal-header flex  items-end'>
                        <Image src = {jai}  width = {60} height = {60} className='rounded-full' />
                        <div className='modal-metadata mx-3 mb-1'>
                            <h3><strong>Jai Wolf</strong></h3>
                            <p>Electronic, Indie</p>
                        </div>
                    </div>
                    <hr className='bg-black mt-4'></hr>
                    <div className='modal-body  mt-3'>
                        <div className='modal-top-tracks text-center'>
                            <h3 className='mt-5 mb-3 text-center sm:text-left'><strong>Jai Wolf's Top Tracks</strong></h3>
                            <div className='inline-block mx-1'><Image src = {jai}  width = {60} height = {60} className='rounded-full' /></div>
                            <div className='inline-block mx-1'><Image src = {jai}  width = {60} height = {60} className='rounded-full' /></div>
                            <div className='inline-block mx-1'><Image src = {jai}  width = {60} height = {60} className='rounded-full' /></div>
                            <div className='inline-block mx-1'><Image src = {jai}  width = {60} height = {60} className='rounded-full' /></div>
                        </div>
                    </div>
                    <div className='modal-footer  mt-3 mb-5 text-center sm:text-left'>
                        <h3 className='mt-5 mb-3'><strong>Fans also like</strong></h3>
                        <div className='inline-block mx-1'><Image src = {jai}  width = {60} height = {60} className='rounded-full' /></div>
                        <div className='inline-block mx-1'><Image src = {jai}  width = {60} height = {60} className='rounded-full' /></div>
                        <div className='inline-block mx-1'><Image src = {jai}  width = {60} height = {60} className='rounded-full' /></div>
                    </div>
                </div>
            </div>
        </div>
      ) }
      else return null
}
