import React from 'react'
import Image from 'next/image'

/**
 * Showcase component for the track / ID.
 * @returns 
 */
export default function ShowcaseComponent({ showcasedData }) {
  // if (showcasedData) console.log("ye: " + JSON.stringify(showcasedData))
  // This will be the return if it is an Artist
  return (
    <div className=' w-[600px] h-[700px] border-2 border-black bg-white shadow-xl flex flex-col justify-center items-center'>
      <div>
        {/* Artist Image goes here */}
        <h1 className='w-[100%]'>{showcasedData.name}</h1>
      </div>

{/*       
     <div className='w-4/5 my-3 border-red-800 border-2 '>
        <h5 className='border- border-2 '>Top Songs</h5>
        <div className='  h-fit border-2 border-black flex mx-2 '>
          <div className='border-2 border-black w-[40px] h-[40px] rounded-full mx-1 shadow-xl'></div>
          <div className='border-2 border-black w-[40px] h-[40px] rounded-full mx-1 shadow-xl'></div>
          <div className='border-2 border-black w-[40px] h-[40px] rounded-full mx-1 shadow-xl'></div>
          <div className='border-2 border-black w-[40px] h-[40px] rounded-full mx-1 shadow-xl'></div>
        </div>
     </div> */}
      

    </div>
  )
}
