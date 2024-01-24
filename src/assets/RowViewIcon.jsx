import React from 'react'
import { ICON_PRE_STYLE } from '.'

const RowViewIcon = ({ style }) => {
    return (
        <svg
            stroke="currentColor"
            fill="none"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            className={`${style} ${ICON_PRE_STYLE}`}
        >
            <rect width={7} height={7} x={3} y={3} rx={1} />
            <rect width={7} height={7} x={3} y={14} rx={1} />
            <path d="M14 4h7M14 9h7M14 15h7M14 20h7" />
        </svg>
    )
}

export default RowViewIcon
