import React from 'react'
import ShowcaseComponent from './ShowcaseComponent'

export default function ShowcaseContainer({ showcasedData, type }) {

  return (
    <div className='fixed top-0 overflow-x-hidden right-0 w-[975px]  min-h-full  flex-center-col'>
        <ShowcaseComponent showcasedData = { showcasedData } type = {type}/> 
    </div>
  )
}
