import React from 'react'


export default function ShowcaseGrid({ children }) {
  return (
    <div className=' max-w-fit grid lg:w-[100%] xl:w-[100%] xl:max-w-6xl grid-cols-4  lg:grid-cols-7 xl:grid-cols-10'>
        {children}
    </div>
  )
}
