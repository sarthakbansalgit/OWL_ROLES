import React from 'react'
import Navbar from '../shared/Navbar'
import CreatePostForm from '../ui/create-post-form'

const CreatePost = () => {
  return (
    <div>
      <Navbar/>
      <div className='flex justify-center mt-14 mb-20 text-xl'>
        <CreatePostForm/>
      </div>
    </div>
  )
}

export default CreatePost
