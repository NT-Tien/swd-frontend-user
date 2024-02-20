import React, { useRef, useState } from 'react'
import ActionButton from './buttons/ActionButton'
import { ArrowLeftIcon, ArrowRightIcon } from '../../assets'
import clsx from 'clsx'

const Carousel = ({ images }) => {
    const [chosenUrl, setChosenUrl] = useState(images[0])

    const carouselRef = useRef()

    const handleImageClick = (url) => {
        setChosenUrl(url)
    }

    const handleScrollLeft = () => {
        const carousel = carouselRef.current
        if(carousel) {
            carousel.scrollLeft -= 100
        }
    }

    const handleScrollRight = () => {
        const carousel = carouselRef.current
        if(carousel) {
            carousel.scrollLeft += 100
        }

    }

    return (
        <div className="flex flex-col w-full gap-2 ">
            {/* thumbnail */}

            <div className="bg-secondary-bg-color overflow-hidden min-h-96">
                <img src={chosenUrl} className='object-cover'/>
            </div>

            <div className="relative flex items-center gap-2 flex-nowrap">
                {/* buttons */}
                <ActionButton onClick={handleScrollLeft} className="p-1 rounded-full h-fit aspect-square ">
                    <ArrowLeftIcon />
                </ActionButton>

                {/* img */}
                <div ref={carouselRef} className='flex items-center overflow-x-auto flex-1 gap-2 p-2'>
                {images?.map((img, i) => (
                    <div
                        key={i}
                        onClick={()=>handleImageClick(img)}
                        className={clsx("rounded-md max-w-42 aspect-[5/6] w-28 min-w-20  bg-secondary-bg-color hover:shadow-lg transition-all hover:scale-105", img === chosenUrl && 'border border-secondary-theme')}
                    >
                        <img src={img} alt={`name`} className="object-cover " />
                    </div>
                ))}
                </div>
                {/* buttons */}

                <ActionButton onClick={handleScrollRight} className="w-10 p-1 rounded-full aspect-square h-fit">
                    <ArrowRightIcon />
                </ActionButton>
            </div>
        </div>
    )
}

export default Carousel
