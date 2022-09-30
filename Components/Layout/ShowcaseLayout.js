import React, {useState} from 'react'
import TracksContainer from '../../Components/Tracks/TracksContainer'
import ArtistsContainer from '../../Components/Artists/ArtistsContainer'
import ArtistModal from '../ArtistModal'
import TrackModal from '../Tracks/TrackModal'

export default function ShowcaseLayout() {
    // Used to determine the type of content being displayed
    const [dataDisplay, setDataDisplay] = useState('Top_Artists')

    const [modalData, setModalData] = useState({})
    const [modalType, setModalType] = useState()
    const [modalToggler, setModalToggler] = useState(false)

    // On Click function for artist / track components
    let modalHandler = (metadata) => {
      setModalToggler(!modalToggler)
      setModalType(metadata.type)
      setModalData(metadata)
    }

    let clearModal = () => {
      setModalToggler(!modalToggler)
      setModalType('')
      setModalData({})
    }

    let updateModal = (metadata) => {
      setModalType(metadata.type)
      setModalData(metadata)
    }

    

  return (
    <div className='w-full h-full'>
         { modalToggler && modalType == 'artist' ? <ArtistModal metadata={modalData} modalUpdate = {updateModal} clearModalHandler = {clearModal} /> : null}
         { modalToggler && modalType == 'track' ? <TrackModal metadata={modalData} modalUpdate = {updateModal} clearModalHandler = {clearModal} /> : null}
        <nav className='absolute  w-full'>
          <a className= 'hidden mx-1 text-xl my-3 px-5 py-3 rounded-lg cursor-pointer hover:shadow-lg md:inline-block float-right text-white' onClick = {() => setDataDisplay('Top_Artists')}>Artists</a>
          <a className= 'hidden mx-1 text-xl my-3 px-5 py-3 rounded-lg cursor-pointer hover:shadow-lg md:inline-block float-right text-white' onClick = {() => setDataDisplay('Top_Tracks')}>Tracks</a>
        </nav>
      <div className='w-full sm:block'>
        {dataDisplay == 'Top_Artists' && (
            <div className=' flex-center-col min-h-[100vh]'>
              <strong><h1 className='my-8 text-3xl text-center text-gray-100'>Your Top Artists</h1></strong>
              <ArtistsContainer showcaseModalHandler = { modalHandler } />
            </div>
          )}
          {dataDisplay == 'Top_Tracks' && (
            <div className='flex-center-col min-h-[100vh]'>
                <strong><h1 className='my-10 text-gray-100'>Your Top Tracks</h1></strong>
                <TracksContainer showcaseModalHandler = { modalHandler } />
            </div>
          )}
      </div>  
    </div>
  )
}
