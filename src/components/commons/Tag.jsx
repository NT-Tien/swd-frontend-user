import React from 'react'

const Tag = ({children}) => {
  return (
    <div className='p-1 px-2 text-xs uppercase bg-white rounded-full w-fit h-fit'>
        {children}
    </div>
  )
}

export default Tag