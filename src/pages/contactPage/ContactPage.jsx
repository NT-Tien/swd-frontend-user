import { useGSAP } from '@gsap/react'
import gsap from 'gsap/gsap-core'
import React, { useRef } from 'react'
import { horizontalLoop } from '../../utils/GSAPUtils'

const ContactPage = () => {
    // ref
    const textLoopRef = useRef()
    const containerRef = useRef()

    // useeffect

    useGSAP(() => {
        gsap.from(containerRef.current, {
            opacity: 0,
            duration: 0.7,
            ease: 'power2.inOut',
        })
    })
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
        <>
            <section className="w-full md:h-[90svh] flex-center ">
                <div
                    ref={textLoopRef}
                    className="absolute inset-0 z-0 flex flex-col text-secondary-theme"
                >
                    <div className="flex h-fit w-fit select-none gap-20 text-nowrap text-[50svh] uppercase ">
                        <span
                            className="textUpper leading-none [word-spacing:-100px]
"
                        >
                            Contact Us
                        </span>
                        <span className="textUpper leading-none [word-spacing:-100px]">
                            Contact Us
                        </span>
                    </div>
                    <div className=" flex  h-fit w-fit select-none gap-20 text-nowrap text-[50svh] uppercase ">
                        <span className="textLower leading-none [word-spacing:-100px]">
                            Contact Us
                        </span>
                        <span className="textLower leading-none [word-spacing:-100px] ">
                            Contact Us
                        </span>
                    </div>
                </div>
                <div
                    ref={containerRef}
                    className="relative flex flex-col w-full bg-transparent border rounded-sm shadow-lg md:min-w-min min-h-max md:w-5/6 max-md:mt-16 md:flex-row md:h-3/4 border-secondary-theme/70"
                >
                    <div className="relative flex flex-col h-1/2 md:h-full w-full md:w-1/2  gap-10 p-5 bg-transparent border-[20px] border-secondary-bg-color overflow-hidden">
                        <div className='absolute inset-0 w-full h-full bg-black/40 backdrop-blur-md'></div>
                        <p className='z-10 flex w-full h-full leading-none uppercase text-secondary-bg-color flex-center text-[10vw]'>
                            get in touch
                        </p>
                    </div>
                    <div className="relative flex flex-col w-full gap-6 p-4 h-1/2 md:h-full md:w-1/2 bg-secondary-bg-color">
                        <div className="flex flex-col gap-2">
                            <h5 className="text-xl font-medium">
                                Contact Info
                            </h5>
                            <p>
                                <span className="font-medium">Showroom:</span>{' '}
                                Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành
                                Phố Thủ Đức, Thành phố Hồ Chí Minh 700000
                            </p>
                            <p>
                                <span className="font-medium">Hotline:</span>{' '}
                                0000000000
                            </p>
                            <p>
                                <span className="font-medium">Email:</span>{' '}
                                efurniture.help@fakeemail.com
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h5 className="text-xl font-medium">
                                Delivery Department
                            </h5>
                            <p>
                                <span className="font-medium">
                                    Phone number:
                                </span>{' '}
                                0000000000
                            </p>
                            <p>
                                <span className="font-medium">Hotline:</span>{' '}
                                0000000000
                            </p>
                            <p>
                                <span className="font-medium">Email:</span>{' '}
                                efurniture.help@fakeemail.com
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h5 className="text-xl font-medium">
                                Maintenance Department
                            </h5>
                            <p>
                                <span className="font-medium">
                                    Phone number:
                                </span>{' '}
                                0000000000
                            </p>
                            <p>
                                <span className="font-medium">Hotline:</span>{' '}
                                0000000000
                            </p>
                            <p>
                                <span className="font-medium">Email:</span>{' '}
                                efurniture.help@fakeemail.com
                            </p>
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    )
}

export default ContactPage
