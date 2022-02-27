import React from 'react'

export default function Layout({ children }) {
  return (
    <div className = "flex-center-col items-center w-full h-[100vh]">
        { children }
    </div>
  )
}
