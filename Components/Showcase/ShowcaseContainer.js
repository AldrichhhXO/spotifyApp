import React from 'react'
import ShowcaseComponent from './ShowcaseComponent'

export default function ShowcaseContainer({ showcasedData, type }) {

  return (
    <div className='fixed top-0 right-0 w-[975px]  min-h-full border-2 border-black flex-center-col'>
        <ShowcaseComponent showcasedData = { showcasedData } type = {type}/> 
    </div>
  )
}
