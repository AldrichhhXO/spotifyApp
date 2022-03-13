import React from 'react'

export default function Layout({children}) {
  return (
        <main className='border-2 border-black min-h-screen relative flex-center-col'>
          {children}
        </main>  
  )
}
