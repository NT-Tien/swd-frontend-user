import React, { useEffect, useRef, useState } from 'react'

const LandingPageImages = () => {
    // const imgUrls = [
    //     './src/assets/pictures/landing-page-bg-1.jpg',
    //     './src/assets/pictures/landing-page-bg-2.jpg',
    //     './src/assets/pictures/landing-page-bg-3.jpg',
    //     './src/assets/pictures/homepage-wallpaper.jpg',
    // ]
    // const [imgIndex, setImgIndex] = useState(0)

    // const [imgUrl, setImgUrl] = useState(
    //     './src/assets/pictures/landing-page-bg-1.jpg'
    // )

    // const carouselRef = useRef()

    // useEffect(()=>{
    //     startTimer()

    //     return ()=>{
    //         pauseTimer()
    //     }
    // },[])

    // useEffect(() => {
    //     setImgUrl(imgUrls[imgIndex])
    // }, [imgIndex])

    // const startTimer = () => {
    //     carouselRef.current = setInterval(() => {
    //         if (imgIndex >= 3 || imgIndex < 0) {
    //             setImgIndex(0)
    //         } else {
    //             setImgIndex((prev) => prev + 1)
    //         }
    //     }, 1000)
    // }

    // const pauseTimer = () => {
    //     clearInterval(carouselRef.current)
    // }

    return (
        <div className="relative w-full h-full">
            <img
                src="./src/assets/pictures/homepage-wallpaper.jpg"
                alt="landing page image"
                className="absolute bottom-0 object-cover w-full h-full"
            />
        </div>
    )
}

export default LandingPageImages
