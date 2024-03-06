import React, { useState } from 'react'

const ReadMore = ({ text, maxLength = 250 }) => {
    const [showFullText, setShowFullText] = useState(false)

    const truncatedText =
        text.substring(0, maxLength) + (text.length > maxLength ? '...' : '')

    const handleClick = () => {
        setShowFullText(!showFullText)
    }

    return (
        <p>
            {showFullText ? text : truncatedText}
            {text.length > maxLength && (
                <div className="group w-fit h-fit">
                    <button onClick={handleClick} className="block font-medium">
                        {showFullText ? 'Read less' : 'Read more'}
                    </button>
                    <span className="flex justify-end group-hover:justify-start">
                        <span
                            className={`flex h-px w-0 rounded bg-secondary-theme  transition-all duration-[250ms] group-hover:w-full`}
                        ></span>
                    </span>
                </div>
            )}
        </p>
    )
}

export default ReadMore
