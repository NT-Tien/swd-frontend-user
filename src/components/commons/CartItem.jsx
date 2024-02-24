import React, { useEffect, useState } from 'react'
import Tag from './Tag'
import ActionButton from './buttons/ActionButton'
import clsx from 'clsx'
import MainActionButton from './buttons/MainActionButton'
import { displayImage } from '../../utils/helper'
import { HeartIcon } from '../../assets'
import DropdownSelection from './DropdownSelection'
import { updateCartItemQuantity } from '../../utils/api'
import { useAuth } from '../../hooks/useAuth'

const CartItem = ({
    removeItemFunc,
    addItemFunc,
    product,
    quantity,
    onClick,
    addWishListFunc,
}) => {

    const {token} = useAuth()

    const imgUrl = product?.images ? displayImage(product.images[0]) : ''
    const name = product?.name ? product.name : ''
    const category = product?.category_id ? product.category_id.name : ''

    const [price, setPrice] = useState('')
    const [isEditable, setisEditable] = useState(false)
    const [chosenQuantity, setChosenQuantity] = useState(quantity)
    const [chosenOption, setChosenOption] = useState(0)

    const removeItem = () => {
        if (removeItemFunc) {
            removeItemFunc()
        }
    }

    const handleOptionClick = (index) => {
        if (index === chosenOption) return
        setisEditable(true)
        setChosenOption(index)
    }

    const handleOnClick = () => {
        if (onClick) {
            onClick()
        }
    }

    const handleAddWishList = () => {
        if (addWishListFunc) {
            addWishListFunc()
        }
    }

    const handleAddToCart = () => {
        if (addItemFunc) {
            addItemFunc()
        }
    }

    const handleConfirmChange = () => {
        if(chosenOption !== quantity) {
            updateCartItemQuantity(product.id, chosenQuantity, token)
        } 

        setisEditable(false)


    }

    const handleQuantityChange = (value) => {
        if (value === chosenQuantity) return
        setChosenQuantity(value)
        setisEditable(true)
    }

    useEffect(() => {
        setPrice(
            product?.optionProducts
                ? product.optionProducts[chosenOption].price
                : ''
        )
    }, [chosenOption])

    return (
        <>
            <div
                onClick={handleOnClick}
                className={clsx(
                    'flex h-48 min-h-fit w-full gap-2 border-y border-y-secondary-theme/50 px-2 py-4 transition-all',
                    onClick && 'hover:scale-[1.01] hover:shadow-lg'
                )}
            >
                <div className="w-full h-full overflow-hidden aspect-square max-w-40 bg-secondary-bg-color">
                    <img src={imgUrl} className="object-cover w-full h-full" />
                </div>
                {/* details */}
                <div className="flex w-full">
                    <div className="flex flex-col justify-between w-3/5 gap-2">
                        <div className="flex flex-col gap-2">
                            <h5 className="text-xl font-light">{name}</h5>{' '}
                            <div className="flex gap-2 h-max text-secondary-theme">
                                {product?.optionProducts?.map((option, i) => (
                                    <ActionButton
                                        className="p-1 px-2 rounded-full"
                                        onClick={() => handleOptionClick(i)}
                                        key={option.id}
                                        active={i === chosenOption}
                                    >
                                        {option.name}
                                    </ActionButton>
                                ))}
                            </div>
                            <Tag>{category}</Tag>
                        </div>
                        <div className="justify-self-end">
                            <div className="flex justify-start gap-2">
                                {addWishListFunc && (
                                    <ActionButton
                                        onClick={handleAddWishList}
                                        className="p-1 rounded-full bg-primary-bg-color"
                                    >
                                        <HeartIcon />
                                    </ActionButton>
                                )}

                                {addItemFunc && (
                                    <>
                                        <MainActionButton
                                            className="px-4"
                                            isSuffixArrow={false}
                                            onClick={handleAddToCart}
                                        >
                                            Add to Cart
                                        </MainActionButton>
                                    </>
                                )}
                                {removeItemFunc && (
                                    <MainActionButton
                                        className="px-4"
                                        onClick={removeItem}
                                        isSuffixArrow={false}
                                    >
                                        Remove
                                    </MainActionButton>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between w-2/5">
                        {/* qty */}
                        {quantity && (
                            <DropdownSelection onChange={handleQuantityChange}>
                                QTY: {chosenQuantity}
                            </DropdownSelection>
                        )}

                        {/* price */}

                        <div className="flex flex-col items-end justify-between ">
                            <div className="text-3xl font-light">
                                ${quantity ? price * chosenQuantity : price}
                            </div>
                            {isEditable && (
                                <MainActionButton onClick={handleConfirmChange}>
                                    Confirm change
                                </MainActionButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItem
