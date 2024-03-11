import React, { useEffect, useRef, useState } from 'react'
import MainActionLink from './commons/buttons/MainActionLink'
import img3 from '/src/assets/pictures/landing-page-img-3.jpg'
import img2 from '/src/assets/pictures/landing-page-img.jpg'

const LandingPageImages = () => {
    return (
        <div className="relative flex justify-start w-full h-svh ">
            <div className="flex h-full w-full flex-col  justify-center  gap-7 px-[5svw] text-primary-bg-color md:text-secondary-theme ">
                <div className="relative z-10 flex items-end justify-end w-full gap-10 md:w-3/4 lg:w-2/3 md:h-52">
                    <div className="font-medium text-right drop-shadow-lg md:hidden lg:block ">
                        <p>Discover a world of elegance </p>
                        <p>Elevate your living spaces</p>
                        <p>Radiate style and personality</p>
                    </div>
                    <div className="relative w-1/2  hidden md:block md:w-2/3 lg:w-1/2 h-full overflow-hidden shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] ">
                        <img
                            src={img3}
                            alt="landing page image"
                            className="absolute bottom-0 object-cover w-full h-full "
                        />
                    </div>
                </div>
                <div className="text-3xl z-[2] font-medium  md:text-5xl lg:text-7xl xl:text-8xl drop-shadow-lg">
                    <p>Elegance </p>
                    <p>Made With</p>
                    <p>Modern Touch</p>
                </div>

                <div className="w-fit z-[2]">
                    <MainActionLink to="/shop" textColor='text-primary-bg-color md:text-secondary-theme' className=' bg-secondary-theme md:bg-transparent'>
                        explore collection
                    </MainActionLink>
                </div>
            </div>

            <div className="absolute top-0 right-0 z-0 w-full md:w-5/12 h-full shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] bg-secondary-bg-color">
                <img
                    src={img2}
                    alt="landing page image"
                    className="absolute bottom-0 object-cover w-full h-full -scale-x-100"
                />
            </div>
        </div>
    )
}

export default LandingPageImages
