import React from 'react'
import { ICON_PRE_STYLE } from '.'
import {twMerge} from 'tailwind-merge'

const ChevronLeft = ({style}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={twMerge(`${ICON_PRE_STYLE}  `, style)}

        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
            />
        </svg>
    )
}

export default ChevronLeft
