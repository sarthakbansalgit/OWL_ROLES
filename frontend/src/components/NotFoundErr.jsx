import React from 'react'
import Navbar from './shared/Navbar'

const NotFoundErr = () => {
  return (
    <div className=''>
      <Navbar/>
      <div className='text-center text-8xl mt-48'>
      404 Not Found (Required Route not available) :(
      </div>
    </div>
  )
}
  
export default NotFoundErr
