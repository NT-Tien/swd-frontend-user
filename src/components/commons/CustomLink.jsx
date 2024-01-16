import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { clsx } from 'clsx'
import gsap from 'gsap'

const CustomLink = ({ children, to }) => {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    const linkRef = useRef()
    const spanRef = useRef()
    const outerSpanRef = useRef()

    useGSAP((context, contextSafe) => {
        const link = linkRef.current
        const span = spanRef.current
        const outerSpan = outerSpanRef.current

        const handleMouseEnter = contextSafe(() => {
            outerSpan.classList.remove('justify-end')
            gsap.to(span, {
                width: '100%',
                duration: 0.25,
                ease: 'power2.out',
            })
        })

        const handleMouseLeave = contextSafe(() => {
            outerSpan.classList.add('justify-end')
            gsap.to(span, {
                width: '0%',
                duration: 0.25,
                ease: 'power2.out',
            })
        })

        link.addEventListener('mouseenter', handleMouseEnter)
        link.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            link.removeEventListener('mouseenter', handleMouseEnter)
            link.removeEventListener('mouseleave', handleMouseLeave)
        }
    })

    const link =
        'h-fit w-fit cursor-pointer tracking-tight '
    const linkActive = 'text-primary-theme '
    const linkNormal = 'text-text-light-color'

    return (
        <Link
            ref={linkRef}
            className={clsx(
                `${link} font-sans font-light`,
                isActive ? linkActive : linkNormal
            )}
            to={to}
        >
            <span>{children}</span>
            <span ref={outerSpanRef} className="flex justify-end">
                <span
                    ref={spanRef}
                    className="flex w-0 h-[2px] rounded bg-secondary-theme"
                ></span>
            </span>
        </Link>
    )
}

export default CustomLink
