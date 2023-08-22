import React from 'react'
import Navbar from '../Nav/Navbar'

export default function MainLayout({children}) {
  return (
    <>
      <Navbar/>
      {children}
    </>
  )
}
