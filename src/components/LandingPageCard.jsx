import { useGSAP } from '@gsap/react'
import gsap from 'gsap/gsap-core'
import React, { useEffect, useRef } from 'react'

const LandingPageCard = ({ src, children, id, activeId, onClick }) => {
    const cardStyle =
        'relative group/collection hover:scale-[1.02] transition-all duration-[400ms] w-32 h-full overflow-hidden border-2 rounded-md shadow-md border-secondary-theme'
    const cardChildStyle =
        'absolute transition-opacity duration-[400ms] text-3xl text-primary-bg-color font-medium flex-center w-full h-full -scale-100 bg-black/25 z-[2] [writing-mode:vertical-lr] opacity-0 group-hover/collection:opacity-100'

    const container = useRef()
    const animationRef = useRef()

    const { contextSafe } = useGSAP(
        () => {
            animationRef.current = gsap
                .timeline({
                    paused: true,
                })
                .to(container.current, {
                    width: '400px',
                    ease: 'sine.inOut',
                    duration: 1,
                })
        },
        { scope: container }
    )

    const handleOnClick = () => {
        if (!onClick) return
        if (activeId === id) {
            onClick(0)
        } else {
            onClick(id)
        }
    }

    useEffect(() => {
        if (activeId === id) {
            animationRef.current.play()
        } else if(!animationRef.current.reversed()) {
            animationRef.current.reverse()
        }
    }, [activeId])

    return (
        <div ref={container} onClick={handleOnClick} className={cardStyle}>
            <div className={`${cardChildStyle} select-none `}>{children}</div>
            <img
                loading="lazy"
                src={src}
                className="absolute bottom-0 right-0 object-cover w-full h-full"
            />
        </div>
    )
}

export default LandingPageCard
