import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { horizontalLoop } from '../utils/GSAPUtils'

const NotFound = () => {
    const textLoopRef = useRef()

    useGSAP(
        () => {
            const loop1 = horizontalLoop('.textUpper', {
                paused: false,
                repeat: -1,
                speed: 0.5,
                paddingRight: 20,
            })
            const loop2 = horizontalLoop('.textLower', {
                paused: false,
                repeat: -1,
                speed: 0.5,
                paddingRight: 20,
                reversed: true,
            })
        },
        { scope: textLoopRef }
    )

    return (
            <div
                ref={textLoopRef}
                className="relative z-0 flex flex-col min-h-max text-secondary-theme"
            >
                <div className="flex h-fit w-fit select-none gap-20 text-nowrap text-[50svh] uppercase ">
                    <span
                        className="textUpper leading-[0.85] [word-spacing:-100px]
"
                    >
                        4040404040
                    </span>
                    <span className="textUpper leading-[0.85] [word-spacing:-100px]">
                        4040404040
                    </span>
                </div>
                <div className=" flex  h-fit w-fit select-none gap-20 text-nowrap text-[50svh] uppercase ">
                    <span className="textLower leading-[0.85] [word-spacing:-100px]">
                        4040404040
                    </span>
                    <span className="textLower leading-[0.85] [word-spacing:-100px] ">
                        4040404040
                    </span>
                </div>
                <h1 className='absolute z-0 inset-1/2 w-max'>Not Found</h1>
            </div>
            
    )
}

export default NotFound
