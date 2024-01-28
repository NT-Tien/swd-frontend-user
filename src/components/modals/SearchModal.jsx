import React from 'react'
import SearchBar from '../commons/SearchBar'

const SearchModal = () => {
  return (
    <div className='absolute inset-0 z-30 w-full h-full bg-neutral-800/30 backdrop-blur-sm'>
        <SearchBar />
    </div>
  )
}

export default SearchModal