import React from 'react'
import Tag from './Tag'
import ActionButton from './buttons/ActionButton'
import clsx from 'clsx'
import MainActionButton from './buttons/MainActionButton'

const CartItem = ({ removeItemFunc, addItemFunc, name, price, quantity, category, imgUrl, onClick }) => {
    const removeItem = () => {
        if (removeItemFunc && removeButton) {
            removeItemFunc()
        }
    }

    const handleOnClick = () => {
        if(onClick) {
            onClick()
        }
    }

    const handleAddToCart = () =>{
        if(addItemFunc) {
            addItemFunc()
        }
    }

    return (
        <div onClick={handleOnClick} className={clsx("flex h-32 w-full justify-stretch gap-2 bg-cart-item-color p-2 transition-all", onClick && 'hover:shadow-lg')}>
            <div className="aspect-square overflow-hidden bg-secondary-bg-color">
                <img src={imgUrl} />
            </div>
            <div className="flex h-full flex-1 flex-col justify-between">
                <div className="flex justify-between ">
                    <h5 className="text-xl font-light">
                        {name}
                    </h5>{' '}
                    {removeItemFunc && (
                        <button
                            type="button"
                            onClick={removeItem}
                            className="text-xl"
                        >
                            &#10005;
                        </button>
                    )}
                </div>
                <Tag>{category}</Tag>
                <div className="flex items-center justify-between ">
                    <div className="text-3xl font-light">${price}</div>
                    {addItemFunc ? (
                        <>
                            <MainActionButton
                                onClick={handleAddToCart}
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

export default CartItem
