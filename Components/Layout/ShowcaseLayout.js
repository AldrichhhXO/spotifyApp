import React, {useState} from 'react'
import TracksContainer from '../../Components/Tracks/TracksContainer'
import ArtistsContainer from '../../Components/Artists/ArtistsContainer'
import ShowcaseContainer from '../Showcase/ShowcaseContainer'

import { useSelector } from 'react-redux'

export default function ShowcaseLayout() {
    // Used to determine the type of content being displayed
    const [dataDisplay, setDataDisplay] = useState('Top_Artists')

    // Will display the highlighted element on a modal element
    const [ showcasedItem, setShowcasedItem ] = useState()
    const [ showcaseType, setShowcaseType ] = useState()

    const displayType = useSelector(state => state.dataFilter.type)
    console.log("Type: ", displayType)

    const showcaseItem = (item, type) => {
      setShowcasedItem(item)
      setShowcaseType(type)
    }

    const clearShowCase = (val) => {
      setShowcasedItem(val)
    }

  return (
    <>
        <nav className = "w-fit h-fit  flex justify-center">
            <a className= 'mx-4 text-xl my-3 bg-white px-5 py-3 rounded-lg cursor-pointer hover:shadow-lg' onClick = {() => setDataDisplay('Top_Artists')}>Your Top Artists</a>
            <a className= 'mx-4 text-xl my-3 bg-white px-5 py-3 rounded-lg cursor-pointer hover:shadow-lg' onClick = {() => setDataDisplay('Top_Tracks')}>Your Top Tracks</a>
        </nav>

        {dataDisplay == 'Top_Artists' && (
          <>
            <strong><h1 className='my-10 text-3xl'>Your Top Artists</h1></strong>
            <ArtistsContainer showcaseHandler = { showcaseItem } showcaseClearHandler = {clearShowCase} />
          </>
        )}

        {dataDisplay == 'Top_Tracks' && (
          <>
              <strong><h1 className='my-10'>Your Top Tracks</h1></strong>
              <TracksContainer showcaseHandler = { showcaseItem } showcaseClearHandler = {clearShowCase}/>
          </>
        )}
        {(showcasedItem  && showcaseType) &&  <ShowcaseContainer showcasedData = {showcasedItem} type = { showcaseType } />}
        
    </>
  )
}
