import React from 'react'

const PageBanner = ({ title }) => {
    return (
        <h1 className="mb-4 font-light uppercase text-9xl text-secondary-theme">
            {title}
        </h1>
    )
}

export default PageBanner
