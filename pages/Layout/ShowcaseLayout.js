import React, {useState} from 'react'
import Layout from '../Components/Layout'

// 
import TracksContainer from '../Components/TracksContainer'
import ArtistsContainer from '../Components/ArtistsContainer'

export default function ShowcaseLayout({ tracksData, artistsData }) {

    // Used to determine the type of content being displayed
    const [dataDisplay, setDataDisplay] = useState('Top_Artists')

    const setShowcase = () => {

    }


  return (
    <Layout>
        <nav className = "w-full h-12 border-2 border-black mt-12 flex justify-center">
            <a onClick={setShowcase} >Your Top Artists</a>
            <a onClick={setShowcase}>Your Top Tracks</a>
        </nav>
    <strong><h1 className='my-10'>Your Top Artists</h1></strong>
    { dataDisplay == 'Top_Artists' && <ArtistsContainer artistData={ artistsData }/> }
    <strong><h1 className='my-10'>Your Top Tracks</h1></strong>
    <TracksContainer trackData={ tracksData } />
    </Layout>
  )
}
