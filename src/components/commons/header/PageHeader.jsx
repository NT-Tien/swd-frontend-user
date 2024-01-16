import React, { useEffect, useRef, useState } from 'react'
import {
    GearIcon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
} from '../../../assets'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { TextPlugin } from 'gsap/TextPlugin'
import ExpandedMenu from './ExpandedMenu'

gsap.registerPlugin(TextPlugin)

const PageHeader = () => {
    // state
    const [menuOpened, setMenuOpened] = useState(false)

    // ref

    const menuButtonRef = useRef()
    const buttonIconTopRef = useRef()
    const buttonIconBotRef = useRef()
    const headerRef = useRef()
    const menuRef = useRef()
    const backdropRef = useRef()
    const expandedMenuAnimationRef = useRef()
    const menuButtonAnimationRef = useRef()

    // useeffect

  

    useGSAP(() => {
        expandedMenuAnimationRef.current = gsap.timeline({
            paused: true,
        })
        expandedMenuAnimationRef.current
            .to(headerRef.current, {
                height: '100vh',
                ease: 'power3.inOut',
                duration: 1,
            })
            .to(
                menuRef.current,
                {
                    display: 'flex',
                    opacity:1,
                    duration: 0,
                },
                '<'
            )
            .to(
                menuRef.current,
                {
                    height: '50vh',
                    duration: 0.8,
                    ease: 'power3.inOut',
                },
                '<'
            )
            .to(
                backdropRef.current,
                {
                    height: '50vh',
                    ease: 'power3.inOut',
                },
                '<'
            )

        menuButtonAnimationRef.current = gsap
            .timeline({
                paused: true,
            })
            .to(buttonIconTopRef.current, {
                rotate: 45,
                translateY: 4,
                translateX: 2,
                ease: 'power3.inOut',
                duration: 1,
            })
            .to(
                buttonIconBotRef.current,
                {
                    rotate: '-=45',
                    translateY: '-4',
                    ease: 'power3.inOut',
                    duration: 1,
                },
                '<'
            )
            .to(
                menuButtonRef.current,
                {
                    duration: 0.3,
                    opacity: 0,
                },
                '<'
            )
            .to(
                menuButtonRef.current,
                {
                    text: 'Close',
                    duration: 0,
                    delay: 0.2,
                },
                '<'
            )
            .to(
                menuButtonRef.current,
                {
                    duration: 0.3,
                    opacity: 1,
                },
                '<'
            )
    })

    // functions

    const ToggleMenuOpened = () => {
        setMenuOpened((prev) => !prev)
        if (!menuOpened) {
            expandedMenuAnimationRef.current.play()
            menuButtonAnimationRef.current.play()
        } else {
            expandedMenuAnimationRef.current.reverse()
            menuButtonAnimationRef.current.reverse()
        }
    }

    return (
        <>
            <div
                ref={headerRef}
                className="absolute top-0 z-40 flex-col w-full flex-center h-14 "
            >
                {/* top flex container */}
                <div className="absolute top-0 left-0 z-40 w-full gap-4 px-10 border-b border-black border-opacity-20 bg-primary-bg-color">
                    <div className="flex items-center justify-between h-14">
                        <div className="flex-center">
                            <h1 className="text-xl font-semibold text-text-light-menu-color">
                                eFURNITURE
                            </h1>
                        </div>

                        <button
                            onClick={() => ToggleMenuOpened()}
                            className="select-none  flex-center h-3/4 text-text-light-menu-color"
                        >
                            <div className="flex flex-col gap-0">
                                <span
                                    ref={buttonIconTopRef}
                                    className="leading-[0.5]"
                                >
                                    {' '}
                                    &#11834;
                                </span>
                                <span
                                    ref={buttonIconBotRef}
                                    className="leading-[0.5]"
                                >
                                    {' '}
                                    &#11834;
                                </span>
                            </div>

                            <span ref={menuButtonRef} className='text-lg min-w-14'>Menu</span>
                        </button>

                        <div className="gap-6 flex-center">
                            <MagnifyingGlassIcon />
                            <GearIcon />
                            <ShoppingCartIcon />
                        </div>
                    </div>

                    {/* menus */}
                    <ExpandedMenu toggle={menuOpened} ref={menuRef} />
                    {/* */}
                </div>

                {/* backdrop */}

                <div
                    ref={backdropRef}
                    onClick={ToggleMenuOpened}
                    className="absolute bottom-0 z-30 h-0 w-full bg-[#1b181699] bg-opacity-55 backdrop-blur-sm"
                />
            </div>

            {/* padding to leave space */}
            <div className="p-7"></div>
        </>
    )
}

export default PageHeader
