import React, { useRef } from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { clsx } from 'clsx'

const CustomLink = ({onClick, active = true, children, to, className = 'font-light ', textColor = 'text-text-light-color', underlineWidth = 'h-[2px]', underlineColor = 'bg-text-light-color'}) => {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    
    const link = 'h-fit w-fit cursor-pointer '
    const linkActive = 'text-primary-theme italic'

    const handleOnClick = () => {
        if(onClick) {
            onClick()
        }
    }


    return (
        <Link
            className={clsx(
                `${className} ${link}  group `,
                 active && (isActive ? linkActive : textColor)
            )}
            to={to}
            onClick={handleOnClick}
        >
            <span>{children}</span>
            <span className="flex justify-end group-hover:justify-start">
                <span className={`flex ${underlineWidth} w-0 rounded ${underlineColor} transition-all duration-[250ms] group-hover:w-full`}></span>
            </span>
        </Link>
    )
}

export default CustomLink
