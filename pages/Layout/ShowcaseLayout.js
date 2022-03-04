import React, {useState} from 'react'
import Layout from '../Components/Layout'

// 3/3: Rest Day
import TracksContainer from '../Components/TracksContainer'
import ArtistsContainer from '../Components/ArtistsContainer'


/**
 * @param {} param0 
 * @returns 
 */
export default function ShowcaseLayout({ tracksData, tracksTimeFrameHandler }) {
    // Used to determine the type of content being displayed
    const [dataDisplay, setDataDisplay] = useState('Top_Artists')


  return (
    <Layout>
        <nav className = "w-full h-12 border-2 border-black mt-12 flex justify-center">
            <a onClick = {() => setDataDisplay('Top_Artists')}>Your Top Artists</a>
            <a onClick = {() => setDataDisplay('Top_Tracks')}>Your Top Tracks</a>
        </nav>

        {dataDisplay == 'Top_Artists' && (
          <>
            <strong><h1 className='my-10'>Your Top Artists</h1></strong>
            <ArtistsContainer />
          </>
        )}

        {dataDisplay == 'Top_Tracks' && (
          <>
              <strong><h1 className='my-10'>Your Top Tracks</h1></strong>
              <TracksContainer trackData={ tracksData } />
          </>
        )}
    

    </Layout>
  )
}
