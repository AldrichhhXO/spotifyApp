import React from 'react'
import Axios from 'axios'

/**
 * 
 * 1. Need
 *  - Track / Artist image
 *  - Track / Artist Name
 *  - 
 */



export default function SpotifyShowcase(props) {
  console.log(props.showcaseId)
    /*
        Be able to determine between if it is a track or an artist
    */
  return (
    <div className='absolute top-1/2 right-[12%] border-2 border-black  max-w-lg  h-16'>

      <h1>The Weeknd</h1>
    </div>
  )
}


 export async function getStaticProps(showcaseId) {

  // This will be for the artist
  let showcaseResponse = await Axios.get(`https://api.spotify.com/v1/artists/${showcaseId}/top-tracks?market=US`)
  let showcaseData = showcaseResponse.data.tracks

  return {props: showcaseId}
 }