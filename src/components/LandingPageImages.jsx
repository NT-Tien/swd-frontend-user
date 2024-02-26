import React, { useEffect, useRef, useState } from 'react'
import MainActionLink from './commons/buttons/MainActionLink'

const LandingPageImages = () => {
    return (
        <div className="relative flex justify-start w-full h-svh ">
            <div className="flex h-full w-full flex-col  justify-center  gap-7 px-[5svw] text-secondary-theme ">
                <div className="relative z-10 flex items-end justify-end w-2/3 gap-10 h-52">
                    <div className="font-medium text-right drop-shadow-lg">
                        <p>Discover a world of elegance </p>
                        <p>Elevate your living spaces</p>
                        <p>Radiate style and personality</p>
                    </div>
                    <div className="relative w-1/2 h-full overflow-hidden shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] ">
                        <img
                            src={'./src/assets/pictures/landing-page-img-3.jpg'}
                            alt="landing page image"
                            className="absolute bottom-0 object-cover w-full h-auto "
                        />
                    </div>
                </div>
                <div className="font-medium text-8xl drop-shadow-lg">
                    <p>Elegance </p>
                    <p>Made With</p>
                    <p>Modern Touch</p>
                </div>

                <div className="w-fit">
                    <MainActionLink to="/shop">
                        explore collection
                    </MainActionLink>
                </div>
            </div>

            <div className="absolute top-0 right-0 z-0 w-5/12 h-full shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] bg-secondary-bg-color">
                <img
                    src={'./src/assets/pictures/landing-page-img.jpg'}
                    alt="landing page image"
                    className="absolute bottom-0 object-cover w-full h-full -scale-x-100"
                />
            </div>
        </div>
    )
}

export default LandingPageImages
