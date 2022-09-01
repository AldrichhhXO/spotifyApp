import React from 'react'

export default function Layout({children}) {
  return (
        <main className=' bg-gray-900 w-[100%] min-w-full min-h-screen relative flex-center-col'>
          {children}
        </main>  
  )
}
