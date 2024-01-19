import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { clsx } from 'clsx'
import gsap from 'gsap'

const CustomLink = ({ children, to, className = 'font-sans font-light ', textColor = 'dark', underlineWidth = 'h-[2px]' }) => {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    
    const link = 'h-fit w-fit cursor-pointer tracking-tight '
    const linkActive = 'text-primary-theme italic'
    let linkNormal = 'text-text-light-color'
    let underlineColor = 'bg-text-light-color'
    
    if(textColor === 'light'){
        linkNormal = ' text-white'
        underlineColor = 'bg-white'
    } 

    // useGSAP((context, contextSafe) => {
    //     const link = linkRef.current
    //     const span = spanRef.current
    //     const outerSpan = outerSpanRef.current

    //     const handleMouseEnter = contextSafe(() => {
    //         outerSpan.classList.remove('justify-end')
    //         gsap.to(span, {
    //             width: '100%',
    //             duration: 0.25,
    //             ease: 'power2.out',
    //         })
    //     })

    //     const handleMouseLeave = contextSafe(() => {
    //         outerSpan.classList.add('justify-end')
    //         gsap.to(span, {
    //             width: '0%',
    //             duration: 0.25,
    //             ease: 'power2.out',
    //         })
    //     })

    //     link.addEventListener('mouseenter', handleMouseEnter)
    //     link.addEventListener('mouseleave', handleMouseLeave)

    //     return () => {
    //         link.removeEventListener('mouseenter', handleMouseEnter)
    //         link.removeEventListener('mouseleave', handleMouseLeave)
    //     }
    // })


    return (
        <Link
            className={clsx(
                `${link} ${className} group `,
                isActive ? linkActive : linkNormal
            )}
            to={to}
        >
            <span>{children}</span>
            <span className="flex justify-end group-hover:justify-start">
                <span className={`flex ${underlineWidth} w-0 rounded ${underlineColor} transition-all duration-[250ms] group-hover:w-full`}></span>
            </span>
        </Link>
    )
}

export default CustomLink
