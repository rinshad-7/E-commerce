import React from 'react'
import Navbar from '../components/navbar.jsx'
import Content from '../components/content.jsx'

function Home() {
  
  return (
    <div className='bg-white w-[full] h-[100vh]' >
        <Navbar/>
        <Content/> 
    </div>
  )
}

export default Home