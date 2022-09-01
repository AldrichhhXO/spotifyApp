import React from 'react'
import ShowcaseComponent from './ShowcaseComponent'

export default function ShowcaseContainer({ showcasedData, type }) {

  return (
    <div className='w-full min-h-full flex-center-col '>
        <ShowcaseComponent showcasedData = { showcasedData } type = {type}/> 
    </div>
  )
}
