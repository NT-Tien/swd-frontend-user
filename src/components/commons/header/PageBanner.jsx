import React from 'react'

const PageBanner = ({ title, suffix }) => {
    return (
        <h1 className="mb-4 font-light uppercase text-9xl text-secondary-theme">
            {title}
            <span className='text-5xl uppercase'>{suffix ? (`(${suffix})`) : ''}</span>
        </h1>
    )
}

export default PageBanner
