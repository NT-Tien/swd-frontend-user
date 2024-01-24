import React from 'react'

const PageBanner = ({title}) => {
  return (
    <div className='relative overflow-hidden min-h-60 max-h-60'>
      <img src='./src/assets/pictures/landing-page-bg-1.jpg' className='absolute object-cover w-full -bottom-56 '/>
      <h1 className='absolute text-4xl bottom-16 left-20'>{title}</h1>
    </div>
  )
}

export default PageBanner