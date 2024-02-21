import React, { useEffect } from 'react'
import MainActionButton from './buttons/MainActionButton'
import ActionButton from './buttons/ActionButton'
import { HeartIcon } from '../../assets'
import { DEFAULT_API_URL } from '../../config/api'

const ProductCard = ({
    imgUrl,
    price,
    name,
    className,
    onClick,
    addItemFunc,
    addWishListFunc,
}) => {

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

    return (
        <div
            onClick={handleClick}
            className={`${className} relative flex aspect-[5/7] h-fit w-80 min-w-80 max-w-96 flex-col items-center justify-between overflow-hidden rounded-sm bg-secondary-bg-color transition-all duration-300 hover:shadow-xl hover:scale-[1.01]`}
        >
            <div className="relative w-full h-full ">
                <img
                    src={imgUrl}
                    alt={name}
                    className="absolute bottom-0 object-cover w-full h-full"
                />
                {addWishListFunc && (
                    <ActionButton
                        onClick={handleAddWishList}
                        className="absolute p-1 rounded-full right-2 top-2"
                    >
                        <HeartIcon />
                    </ActionButton>
                )}
            </div>
            {/* details */}
            <div className="flex flex-col w-full gap-4 py-2 pl-4 ">
                <span className="w-full text-xl font-light leading-none">
                    {name} &#11834;
                </span>
                <div className="flex items-center justify-between gap-4">
                    <span className="text-3xl w-max ">${price} </span>
                    {addItemFunc ? (
                        <>
                            <MainActionButton
                                className="flex-1 gap-0 w-max"
                                onClick={handleAdd}
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
