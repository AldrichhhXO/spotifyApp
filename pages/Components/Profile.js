import React from 'react'
import Image from 'next/image'


/**
 * Will Return:
 *  1. Profile Image
 *  2. Profile name
 *  3. Amount of Followers
 * @param {*} props 
 * @returns 
 */
export default function Profile({displayName, profileImg, followers }) {
  return (
    <div className='w-[20%] h-[400px] flex justify-center items-center flex-col shadow-lg'>
      <div className='mb-10 relative'><Image className='rounded-sm' src = {profileImg} width = {200} height = {200} alt = "Profile Picture"/></div>
      <h1>Welcome, { displayName }</h1>
      <p>{followers} Followers</p>
    </div>
  )
}
