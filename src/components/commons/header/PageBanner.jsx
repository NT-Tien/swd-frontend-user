import React from 'react'

const PageBanner = ({ title, suffix }) => {
    return (
        <h1 className="mt-14 mb-4 font-light uppercase text-[10vw] leading-none text-secondary-theme">
            {title}
            <span className='text-[5vw] uppercase'>{suffix ? (`(${suffix})`) : ''}</span>
        </h1>
    )
}

export default PageBanner
