import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import gsap from 'gsap/gsap-core'
import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft } from '../assets'
import {useNavigate} from 'react-router-dom'

const LandingPageCard = ({ src, children, id, active, onClick, title }) => {
    const cardStyle =
        'relative hover:scale-[1.02] transition-all duration-[400ms] w-full md:w-32 h-full overflow-hidden border-2 rounded-md shadow-md border-secondary-theme'
    const cardChildStyle =
        'absolute transition-opacity duration-[400ms] text-3xl text-primary-bg-color font-medium flex-center w-full h-full md:-scale-100 bg-black/25 z-[2] md:[writing-mode:vertical-lr]  md:opacity-0  group-hover/collection:opacity-100'

    const navigate = useNavigate()
    const container = useRef()
    const contentRef = useRef()
    const btnRef = useRef(null)
    const animationRef = useRef()

    const onClickNavigate =()=>{
        navigate('/shop')
    }

    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >=768);
 
    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth < 768){
                setIsLargeScreen(false)
            } else{
                setIsLargeScreen(true)
            }
        };
 
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useGSAP(
        () => {
            if(isLargeScreen){

            animationRef.current = gsap
                .timeline({
                    paused: true,
                })
                .to(container.current, {
                    width: '450px',
                    ease: 'back.in(3)',
                    duration: 1,
                })
                .to(
                    '.btn',
                    {
                        x: -24,
                        scale: 3,
                        ease: 'none',
                        duration: 0.3,
                    },
                    '<+=0.7'
                )
                .from(
                    contentRef.current,
                    {
                        opacity: 0,
                        display: 'none',
                        ease: 'none',
                        duration: 0.3,
                    },
                    '<'
                )
            } else {
                animationRef.current = gsap
                .timeline({
                    paused: true,
                })
                .to(container.current, {
                    height: '450px',
                    ease: 'back.in(3)',
                    duration: 1,
                })
                .to(
                    '.btn',
                    {
                        y: -24,
                        scale: 3,
                        ease: 'none',
                        duration: 0.3,
                    },
                    '<+=0.7'
                )
                .from(
                    contentRef.current,
                    {
                        opacity: 0,
                        display: 'none',
                        ease: 'none',
                        duration: 0.3,
                    },
                    '<'
                )
            }
        },
        { scope: container, dependencies: [isLargeScreen] }
    )

    const handleOnClick = () => {
        if (!onClick) return
        if (active) {
            onClick(0)
        } else {
            onClick(id)
        }
    }

    useEffect(() => {
        const btnElement = btnRef.current
        if (!animationRef.current.reversed()) {
            animationRef.current.reverse()
            btnElement.removeEventListener('click', onClickNavigate)
        }
        if (active) {
            btnElement.addEventListener('click', onClickNavigate)
            animationRef.current.play()
        }
        return () =>{
            btnElement.removeEventListener('click', onClickNavigate)
        }
    }, [active])

    return (
        <div
            ref={container}
            onClick={handleOnClick}
            className={clsx(
                `${cardStyle} flex flex-col md:flex-row`,
                active ? 'gap-2' : 'group/collection '
            )}
        >
            <div className={clsx(`${cardChildStyle} select-none `, active ? 'opacity-0':'opacity-100')}>{title}</div>
            <div className="relative h-32 w-full md:h-full md:w-32 min-w-[40%] flex-shrink-0">
                <img
                    loading="lazy"
                    src={src}
                    className="absolute bottom-0 left-0 object-cover w-full h-full"
                />
            </div>

            <div
                className={clsx(
                    'btn transition-color absolute max-md:inset-x-0 max-md:-bottom-10 md:inset-y-0 md:-right-10 z-[2] max-md:mx-auto max-md:my-0 md:mx-0 md:my-auto size-20 overflow-hidden rounded-full p-1 duration-500',
                    active
                        ? 'group/collectionBtn bg-secondary-theme/90'
                        : 'border-2 border-secondary-theme bg-primary-bg-color hover:scale-[1.05]'
                )}
            >
                <div ref={btnRef} className="flex-center relative z-[3] aspect-square h-full text-primary-bg-color w-full transition-transform duration-500 group-hover/collectionBtn:-translate-x-[90%] ">
                    <div className="absolute flex-center left-full">
                        <ChevronLeft style={`stroke-[3px] size-10 `} />
                    </div>
                </div>
            </div>
            <div
                ref={contentRef}
                className="relative flex-auto w-max text-secondary-theme"
            >
                <h5 className="text-3xl font-semibold">{title}</h5>
                {children}
            </div>
        </div>
    )
}

export default LandingPageCard
