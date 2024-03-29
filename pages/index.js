import Link from 'next/link'
import {useState, useEffect } from 'react'
import Layout from '../Components/Layout/Layout'
import ShowcaseLayout from '../Components/Layout/ShowcaseLayout'
import { useRouter } from 'next/router'
import { fetchProfile } from '../lib/User/User'

export default function Home() {
  let router = useRouter()
  const [spotifyProfile, setSpotifyProfile] = useState()
  const [loading, isLoading] = useState(false)

  useEffect(() => {
    let access_token = localStorage.getItem('access_token') || router.query.access_token  || null
    if (access_token) {
      if (!localStorage.getItem('access_token')) localStorage.setItem('access_token', access_token)
      isLoading(true)
      fetchProfile(access_token.split('-R-')[0], setSpotifyProfile)
      isLoading(false)
       window.history.replaceState({}, document.title, '/')
       document.title = "Discovery"
        return function cleanup() {
          localStorage.clear()
        }
      /* This will remove the access code from the url */
    }
  }, [router.query])

  if (loading) {
    return (
      <Layout>
        <h1>Loading user</h1>
      </Layout>
    )
  }
  else {
    if (spotifyProfile) {
      return (
         <ShowcaseLayout  />
      )
    } else {
      return (
        <>
          <h2 className=" text-6xl my-5 text-white">Spotify Analytics App</h2>
          <section className='flex-center'>
            <div className = "bg-gray-800  max-w-sm min-h-[300px] rounded overflow-hidden shadow-lg my-3 ">
              <div className='text-lg px-10 py-20 text-gray-100 '>Using Spotify&apos;s public API, be able to view the top tracks and artists that you&apos;ve been listening to at various time periods, while also finding new music based on your current interests.</div>
            </div>
            <div className='bg-gray-800 max-w-sm rounded overflow-hidden shadow-lg my-3  min-h-[300px]'>
              <div className='text-lg px-10 py-20 text-white'>Explore your library of music by viewing recommended artists and tracks, based on the chosen track / artist</div>
            </div>  
          </section>
          <div className='my-10'>
          <Link href = "/api/login" passHref><button className='rounded-md my-16 bg-emerald-700 px-10 py-2 text-xl mx-auto text-white hover:border-2 hover:border-emerald-700 hover:bg-black hover:text-white transition-all duration-100 mt-2'>Get Started</button></Link>
          </div>
          
      </>
      )
    }

  }
}





