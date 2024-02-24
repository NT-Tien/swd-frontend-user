import React from 'react'
import { ArrowLoopIcon } from '../../../assets'

const SimpleLoading = () => {
  return (
    <div className='flex gap-2'><ArrowLoopIcon style='animate-spin-slow'/> Loading...</div>
  )
}

export default SimpleLoading