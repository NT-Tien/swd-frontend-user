import React, { useEffect, useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchCartItems, removeProductFromCart } from '../../utils/api'
import {
    CartItem,
    MainActionLink,
    PageBanner,
    SimpleLoading,
} from '../../components'
import { useAuth } from '../../hooks/useAuth'
import { useCartData, useRemoveCartItem } from '../../hooks/useCartData'

const ShoppingCartPage = () => {
    const [page, setPage] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)
    const { token } = useAuth()

    const { status, data, error, refetch } = useCartData(page)
    const { mutate: removeCartItem } = useRemoveCartItem()

    const removeItem = (id, oid, name) => {
        removeCartItem({ id, oid, name })
    }

    useEffect(() => {
        if (token) {
            refetch()
        }
    }, [])

    useEffect(() => {
        if (!Array.isArray(data)) return
        const totalPrice = data?.reduce(
            (accumulator, item) =>
                item.product.optionProducts.find(
                    (option) => option.id === item.chooseOption
                ).price *
                    item.quantity +
                accumulator,
            0
        )
        setTotalPrice(totalPrice)
    }, [data])

    return (
        <section className="px-20 min-h-svh">
            <PageBanner
                title="cart"
                suffix={data?.length ? data.length : '0'}
            />
            {status === 'pending' ? (
                <>
                    <div className="mt-4 flex-center">
                        <SimpleLoading />
                    </div>

                    <div className="mt-4 flex-center">
                        <MainActionLink to="/shop">
                            continue shopping
                        </MainActionLink>
                    </div>
                </>
            ) : status === 'error' ? (
                <>
                    <div className="mt-4 ">
                        <p className="text-sm text-center text-gray-500">
                            {/* {error.message} */}
                            Opps. Something happened when fetching your cart
                            items
                        </p>
                    </div>

                    <div className="mt-4 flex-center">
                        <MainActionLink to="/shop">
                            continue shopping
                        </MainActionLink>
                    </div>
                </>
            ) : data.length > 0 ? (
                <div className="flex gap-4">
                    <div className="flex flex-col flex-1 gap-2 min-w-fit">
                        {data.map((item) => (
                            <>
                            <CartItem
                                key={item.chooseOption}
                                product={item.product}
                                quantity={item.quantity}
                                isItemEditable={true}
                                chooseOption={item.chooseOption}
                                removeItemFunc={() =>
                                    removeItem(
                                        item.product?.id,
                                        item.chooseOption,
                                        item.product?.name
                                        )
                                    }
                            />
                        </>
                        ))}
                    </div>
                    <div className="flex-col gap-10 p-6 pb-10 border shadow-xl flex-shrink-1 flex-center h-96 w-96 min-w-fit border-secondary-theme">
                        <div className="flex flex-wrap items-end justify-between w-full">
                            Cart total:
                            <div className="text-5xl font-light">
                                {totalPrice}<span className="text-4xl">₫</span>
                            </div>
                        </div>

                        <div className="flex-col gap-4 mt-4 flex-center w-fit">
                            <MainActionLink className="w-fit" to="/checkout">
                                proceed to checkout
                            </MainActionLink>
                            <MainActionLink className="w-full" to="/shop">
                                continue shopping
                            </MainActionLink>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="mt-4 ">
                        <p className="text-sm text-center text-gray-500">
                            There's currently no item in your cart
                        </p>
                    </div>

                    <div className="mt-4 flex-center">
                        <MainActionLink to="/shop">
                            continue shopping
                        </MainActionLink>
                    </div>
                </>
            )}
        </section>
    )
}

export default ShoppingCartPage
