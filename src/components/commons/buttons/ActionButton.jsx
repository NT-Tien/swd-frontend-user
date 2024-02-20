import clsx from 'clsx'
import React from 'react'

const ActionButton = ({
    disabled = false,
    onClick,
    children,
    borderColor = 'border-gray-800',
    active = false,
    className = 'rounded-full',
}) => {
    const handleOnClick = (e) => {
        e.stopPropagation()
        if (onClick) {
            onClick()
        }
    }

    return (
        <button
            disabled={disabled}
            onClick={(e)=>handleOnClick(e)}
            className={clsx(
                `gap-2 border ${borderColor} flex-center max-w-max ${className}  transition-all duration-[400ms] ease-in-out`,

                disabled
                    ? 'bg-transparent text-secondary-theme/50 border-opacity-50 '
                    : active
                      ? 'bg-secondary-theme text-neutral-100 hover:bg-black/90'
                      : 'bg-transparent text-secondary-theme  hover:bg-secondary-theme/20 '
            )}
        >
            <span className="flex-center relative h-fit overflow-hidden leading-none">
                <span className={`flex-center flex-col `}>
                    <span>{children}</span>
                </span>
            </span>
        </button>
    )
}

export default ActionButton
