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
import usePopup from '../../hooks/usePopup'
import { useCartData, useRemoveCartItem } from '../../hooks/useCartData'

const ShoppingCartPage = () => {

    const [page, setPage] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)
    const { token } = useAuth()

    const { status, data, error, refetch } = useCartData(page)
    const {mutate: removeCartItem} = useRemoveCartItem()

    const removeItem = (id, oid,  name) => {
        removeCartItem({id, oid, name})
    }

    useEffect(() => {
        if (token) {
            refetch()
        }
    }, [])

    useEffect(() => {
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
            <PageBanner title="cart" suffix={data?.length ? data.length : '0'} />
            <div className='mb-4 text-5xl font-light'>
                ${totalPrice}
            </div>
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
                            Opps. Something happened when fetching your cart items
                        </p>
                    </div>

                    <div className="mt-4 flex-center">
                        <MainActionLink to="/shop">
                            continue shopping
                        </MainActionLink>
                    </div>
                </>
            ) : data.length > 0 ? (
                <div className="flex flex-col gap-2">
                    {data.map((item) => (
                        <CartItem
                            key={item.chooseOption}
                            product={item.product}
                            quantity={item.quantity}
                            isItemEditable={true}
                            chooseOption={item.chooseOption}
                            removeItemFunc={() => removeItem(item.product?.id, item.chooseOption, item.product?.name)}
                        />
                    ))}

                    <div className="mt-4 flex-center">
                        <MainActionLink to="/checkout">
                            proceed to checkout
                        </MainActionLink>
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
