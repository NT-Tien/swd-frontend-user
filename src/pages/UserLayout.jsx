import React, { useEffect, useRef } from 'react'
import { PageFooter, PageHeader } from '../components'
import { Outlet, useLocation } from 'react-router-dom/dist/umd/react-router-dom.development'
import ScrollToTop from './ScrollToTop'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap/all'


const UserLayout = () => {

    const location = useLocation()
    const ref = useRef()
    const animationRef = useRef()

    useGSAP(()=>{
        animationRef.current = gsap.timeline({
            paused: true,
        }).from(ref.current, {
            opacity: 0,
            ease: 'power1.inOut',
            duration: 0.4,
        })
    })

    useEffect(()=>{
        animationRef.current.play()
    },[location])

    return (
        <>
            <ScrollToTop />
            <PageHeader />
            <div ref={ref} className='h-full w-full flex flex-col '>

            <Outlet />
            </div>
            <PageFooter />
        </>
    )
}

export default UserLayout
