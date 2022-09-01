import React, {useState} from 'react'
import TracksContainer from '../../Components/Tracks/TracksContainer'
import ArtistsContainer from '../../Components/Artists/ArtistsContainer'
import ShowcaseContainer from '../Showcase/ShowcaseContainer'
import { GiHamburgerMenu } from 'react-icons/gi' 
import { AiOutlineSetting } from 'react-icons/ai'
import { useSelector } from 'react-redux'

import ArtistModal from '../ArtistModal'

export default function ShowcaseLayout() {
    // Used to determine the type of content being displayed
    const [dataDisplay, setDataDisplay] = useState('Top_Artists')
    const [showcaseId, setShowcaseId] = useState('')

  return (
    <div className='w-full h-full'>

         { showcaseId ? <ArtistModal /> : null}

        <nav className='absolute  w-full'>
          <a className= 'hidden mx-1 text-xl my-3 px-5 py-3 rounded-lg cursor-pointer hover:shadow-lg md:inline-block float-right text-white' onClick = {() => setDataDisplay('Top_Artists')}>Artists</a>
            <a className= 'hidden mx-1 text-xl my-3 px-5 py-3 rounded-lg cursor-pointer hover:shadow-lg md:inline-block float-right text-white' onClick = {() => setDataDisplay('Top_Tracks')}>Tracks</a>
        </nav>
      <div className='w-full sm:block'>
        {dataDisplay == 'Top_Artists' && (
            <div className=' flex-center-col min-h-[100vh]'>
              <strong><h1 className='my-8 text-3xl text-center text-gray-100'>Your Top Artists</h1></strong>
              <ArtistsContainer showcaseModalHandler = { setShowcaseId }/>
            </div>
          )}
          {dataDisplay == 'Top_Tracks' && (
            <div className='flex-center-col min-h-[100vh]'>
                <strong><h1 className='my-10 text-gray-100'>Your Top Tracks</h1></strong>
                <TracksContainer />
            </div>
          )}
      </div>  
    </div>
  )
}
