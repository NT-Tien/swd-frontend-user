import React, { useEffect, useRef, useState } from 'react'
import ActionButton from './buttons/ActionButton'
import { ArrowLeftIcon, ArrowRightIcon } from '../../assets'
import clsx from 'clsx'

const Carousel = ({ images }) => {
    const [chosenUrl, setChosenUrl] = useState(0)

    const carouselRef = useRef()

    const handleImageClick = (index) => {
        setChosenUrl(index)
    }

    const handleScrollLeft = () => {
        const carousel = carouselRef.current
        if (carousel) {
            carousel.scrollLeft -= 100
        }
        if(chosenUrl >0){

            setChosenUrl(prev => prev - 1)
        }
    }

    const handleScrollRight = () => {
        const carousel = carouselRef.current
        if (carousel) {
            carousel.scrollLeft += 120
        }
        if(chosenUrl < images.length - 1){
            setChosenUrl(prev => prev + 1)
        }
    }

    return (
        <div className="flex flex-col w-full gap-2 ">
            {/* thumbnail */}

            <div className="overflow-hidden flex-center h-96 min-h-96 min-w-96 bg-secondary-bg-color">
                <img
                    src={images && images[chosenUrl]}
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="relative flex items-center gap-2 flex-nowrap">
                {/* buttons */}
                <ActionButton
                    onClick={handleScrollLeft}
                    className="p-1 rounded-full aspect-square h-fit "
                >
                    <ArrowLeftIcon />
                </ActionButton>

                {/* img */}
                <div
                    ref={carouselRef}
                    className="flex items-center flex-1 gap-2 p-2 overflow-x-auto"
                >
                    {images?.map((img, i) => (
                        <div
                            key={i}
                            onClick={() => handleImageClick(i)}
                            className={clsx(
                                'max-w-42 aspect-[5/6] w-28 min-w-20 overflow-hidden rounded-md bg-secondary-bg-color transition-all hover:scale-105 hover:shadow-lg',
                                i === chosenUrl &&
                                    'border border-secondary-theme'
                            )}
                        >
                            <img
                                src={img}
                                alt={`name`}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    ))}
                </div>
                {/* buttons */}

                <ActionButton
                    onClick={handleScrollRight}
                    className="w-10 p-1 rounded-full aspect-square h-fit"
                >
                    <ArrowRightIcon />
                </ActionButton>
            </div>
        </div>
    )
}

export default Carousel
