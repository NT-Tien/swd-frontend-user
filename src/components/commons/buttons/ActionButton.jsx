import clsx from 'clsx'
import React, { forwardRef } from 'react'

const ActionButton = forwardRef(
    (
        {
            disabled = false,
            onClick,
            children,
            borderColor = 'border-gray-800',
            active = false,
            className = 'rounded-full',
        },
        ref
    ) => {
        const handleOnClick = (e) => {
            e.stopPropagation()
            if (onClick) {
                onClick()
            }
        }

        return (
            <button
                ref={ref}
                disabled={disabled}
                onClick={(e) => handleOnClick(e)}
                className={clsx(
                    `gap-2 border ${borderColor} flex-center max-w-max  ${className}  transition-all  ease-in-out `,
                    disabled
                        ? 'border-opacity-50 bg-transparent text-secondary-theme/50 '
                        : active
                          ? 'bg-secondary-theme text-neutral-100 hover:bg-secondary-theme/75'
                          : ' text-secondary-theme  hover:bg-secondary-theme/30 '
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
)

export default ActionButton
