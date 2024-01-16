import React, { forwardRef, useRef, useState } from 'react'
import CustomLink from '../CustomLink'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import MultipleUrlsPhoto from '../photo/MultipleUrlsPhoto'

const ExpandedMenu = forwardRef(({ toggle }, ref) => {
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
            name: 'ABOUT US',
            to: '/about-us',
        },
        {
            name: 'CONTACT',
            to: '/contact',
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

    return (
        <section
            ref={ref}
            className="z-30 justify-between hidden w-full h-0 overflow-hidden opacity-0"
        >
            <div
                ref={linkRef}
                className="flex flex-wrap w-3/5 pt-20 text-4xl gap-x-12 md:text-7xl"
            >
                {menuList.map((link, index) => (
                    <CustomLink key={index} to={link.to}>
                        {' '}
                        {link.name}{' '}
                    </CustomLink>
                ))}
            </div>
        </section>
    )
})

export default ExpandedMenu
