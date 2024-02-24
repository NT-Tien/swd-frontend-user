import React, { useEffect, useState } from 'react'
import MainActionButton from './buttons/MainActionButton'
import ActionButton from './buttons/ActionButton'
import { HeartIcon } from '../../assets'
import { DEFAULT_API_URL } from '../../config/api'
import { displayImage } from '../../utils/helper'

const ProductCard = ({
    product,
    className,
    onClick,
    addItemFunc,
    addWishListFunc,
}) => {
    const [chosenOption, setChosenOption] = useState(0)
    const [price, setPrice] = useState('')
    const imgUrl = displayImage(product.images[0])
    const name = product.name
    const options = product.optionProducts

    const handleAdd = () => {
        if (addItemFunc) {
            addItemFunc()
        }
    }

    const handleAddWishList = () => {
        if (addWishListFunc) {
            addWishListFunc()
        }
    }

    const handleClick = () => {
        if (onClick) {
            onClick()
        }
    }

    const handleOptionClick = (index) => {
        setChosenOption(index)
    }

    useEffect(() => {
        setPrice(product.optionProducts[chosenOption].price)
    }, [chosenOption])

    return (
        <div
            onClick={handleClick}
            className={`${className}  relative flex aspect-[5/7] h-fit w-80 min-w-80 max-w-96 flex-col items-center justify-between overflow-hidden rounded-sm bg-secondary-bg-color transition-all duration-[400ms] hover:scale-[1.02] hover:shadow-2xl`}
        >
            <div className="relative w-full h-full group/image">
                <div className="absolute inset-0 z-10 opacity-0 h-full w-full bg-neutral-800/20 backdrop-blur-[1px] group-hover/image:opacity-100 transition-opacity duration-[400ms]">
                    {options && (
                        <div className="absolute flex flex-col w-full gap-2 left-2 top-2 ">
                            {options.map((option, i) => (
                                <ActionButton
                                    key={i}
                                    active={i === chosenOption}
                                    className="p-1 px-2 rounded-full"
                                    onClick={() => handleOptionClick(i)}
                                >
                                    {option.name}
                                </ActionButton>
                            ))}
                        </div>
                    )}

                    {addWishListFunc && (
                        <ActionButton
                            onClick={handleAddWishList}
                            className="absolute right-2 top-2 rounded-full bg-primary-bg-color p-1 hover:scale-[1.03]"
                        >
                            <HeartIcon />
                        </ActionButton>
                    )}
                </div>
                <img
                    src={imgUrl}
                    loading="lazy"
                    alt={name}
                    className="absolute bottom-0 object-cover w-full h-full"
                />
            </div>
            {/* details */}
            <div className="flex flex-col w-full gap-4 p-2">
                <span className="w-full text-xl font-light leading-none">
                    {name}
                </span>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="text-3xl w-max ">
                        ${options[chosenOption].price}{' '}
                    </span>
                    {addItemFunc ? (
                        <>
                            <MainActionButton
                                className="gap-0 px-4 w-max"
                                onClick={handleAdd}
                                isSuffixArrow={false}
                            >
                                Add to Cart
                            </MainActionButton>
                        </>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
