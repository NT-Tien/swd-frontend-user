import React, { forwardRef, useRef } from 'react'
import CustomLink from '../CustomLink'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const ExpandedMenu = forwardRef(({ toggle, toggleFunction }, ref) => {
    const menuList = [
        {
            name: 'HOME',
            to: '/',
        },
        {
            name: 'SHOP',
            to: '/shop',
        },
        {
            name: 'BOOKING',
            to: '/booking',
        },
        {
            name: 'CONTACT',
            to: '/contact',
        },

        {
            name: 'ABOUT US',
            to: '/about-us',
        },
    ]

    // states

    // useRef

    const linkRef = useRef()

    // useEffect

    useGSAP(() => {
        const link = linkRef.current

        if (toggle) {
            gsap.from(link, {
                opacity: 0,
                delay: 0.4,
                duration: 0.5,
                ease: 'power2.inOut',
            })
        }
    }, [toggle])

    //  func

    const handleToggleMenu = () => {
        if (toggleFunction) {
            toggleFunction()
        }
    }

    return (
        <section
            ref={ref}
            className="z-30 items-center justify-center hidden w-full h-0 overflow-hidden opacity-0"
        >
            <div
                ref={linkRef}
                className="flex flex-wrap w-full text-4xl gap-x-12"
            >
                {menuList.map((link, index) => (
                    <div onClick={handleToggleMenu} key={index}>
                        <CustomLink to={link.to}> {link.name} </CustomLink>
                    </div>
                ))}
            </div>
        </section>
    )
})

export default ExpandedMenu
