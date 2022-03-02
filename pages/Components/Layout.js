import React from 'react'

export default function Layout({ children }) {
  return (
    <div className = " relative flex-center-col items-center w-full h-fit">
        { children }
    </div>
  )
}
