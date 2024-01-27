import React from 'react'

const PageBanner = ({title}) => {
  return (
    <div className='relative overflow-hidden min-h-60 max-h-60'>
      <img src='./src/assets/pictures/landing-page-bg-2.jpg' className='absolute bottom-0 object-cover w-full '/>
      <h1 className='absolute text-4xl bottom-16 left-20 text-primary-theme text-stroke-shadow'>{title}</h1>
    </div>
  )
}

export default PageBanner