import clsx from 'clsx'
import React from 'react'

const ActionButton = ({
    onClick,
    children,
    borderColor = 'border-gray-800',
    textColor = 'text-secondary-theme',
    active = false,
    className = 'rounded-full'
}) => {
    const handleOnClick = () => {
        if (onClick) {
            onClick()
        }
    }

    return (
        <button
            onClick={handleOnClick}
            className={clsx(
                `gap-2 border ${borderColor} flex-center max-w-max ${className}  transition-all duration-[400ms] ease-in-out`,
                active
                    ? 'bg-secondary-theme text-neutral-100 hover:bg-black/80'
                    : 'bg-transparent text-secondary-theme  hover:bg-secondary-theme/20 '
            )}
        >
            <span className="relative overflow-hidden leading-none flex-center h-fit">
                <span className={`flex-center flex-col `}>
                    <span>{children}</span>
                </span>
            </span>
        </button>
    )
}

export default ActionButton
