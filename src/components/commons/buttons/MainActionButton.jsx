import React from 'react'
import { ArrowRightIcon } from '../../../assets'

const MainActionButton = ({
    disabled = false,
    children,
    isSuffixArrow = true,
    type = 'button',
    className = '',
    onClick,
    textColor = 'text-secondary-theme',
    arrowColor = 'text-white bg-secondary-theme',
}) => {
    const handleOnClick = (e) => {
        e.stopPropagation()
        if (onClick) onClick()
    }

    return (
        <button
            disabled={disabled}
            onClick={(e) => handleOnClick(e)}
            type={type}
            className={`gap-2 border p-2 ${className} group flex items-center justify-between rounded-full border-gray-800`}
        >
            <span className="relative w-full overflow-hidden leading-none uppercase flex-center h-fit">
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
        </button>
    )
}

export default MainActionButton
