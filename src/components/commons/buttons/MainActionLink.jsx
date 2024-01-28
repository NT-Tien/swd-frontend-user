import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '../../../assets'
import './style.css'

const MainActionLink = ({
    children,
    isSuffixArrow = true,
    to,
    onClick,
    className = '',
    textColor = 'text-secondary-theme',
    arrowColor = 'text-white bg-secondary-theme',
}) => {

    const handleOnClick = () => {
        if (onClick) onClick()
    }

    return (
        <Link
            to={to}
            onClick={handleOnClick}
            className={`gap-2 border p-2 ${className} flex-center group max-w-max rounded-full border-gray-800`}
        >
            <span className="relative pl-2 overflow-hidden leading-none uppercase flex-center h-fit">
                <span
                    className={`flex-center flex-col transition-transform duration-[400ms] ease-in-out group-hover:-translate-y-full ${textColor}`}
                >
                    <span>{children}</span>
                    <span className="absolute top-full">{children}</span>
                </span>
            </span>
            {isSuffixArrow ? (
                <span
                    className={`suffix-action-link flex items-center justify-end overflow-hidden rounded-full  ${arrowColor}`}
                >
                    <div className="flex-center relative w-full transition-transform duration-[400ms] ease-in-out group-hover:translate-x-[90%] ">
                        <ArrowRightIcon
                            style={` stroke-[2.5px] absolute right-full`}
                        />
                        <ArrowRightIcon style={`  stroke-[2.5px]`} />
                    </div>
                </span>
            ) : (
                ''
            )}
        </Link>
    )
}

export default MainActionLink
