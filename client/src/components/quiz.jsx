import React from 'react'
import Footer from "./footer"

const quiz = () => {
  return (
    <div className='bg-cwhite h-screen grid place-content-center text-center'>
        <h1 className='text-7xl font-primary text-cred flex flex-col cursor-pointer'><span>Chiz</span><span>Quiz</span></h1>
        <p className='text-sm font-secondary mt-5 w-[48vw] text-gray-700 cursor-pointer'>Discover, Learn, Conquer, &amp; Win Prizes!</p>
        <Footer />
    </div>
  )
}

export default quiz