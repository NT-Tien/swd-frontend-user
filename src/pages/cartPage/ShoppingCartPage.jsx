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

const ShoppingCartPage = () => {
    const [page, setPage] = useState(1)
    const { isPopupOpen, openPopupFunc, displayPopup} = usePopup()
    const { token } = useAuth()
    const { status, data, error, refetch } = useQuery({
        queryKey: ['cart', page, token],
        queryFn: () => fetchCartItems(9, page, token),
        placeholderData: keepPreviousData,
        enabled: false,
        staleTime: 180000,
    })

    const removeItem = async(id, name) => {
        if (!token) return
        await removeProductFromCart(id, token)
        openPopupFunc(`${name} is removed from your cart`, 'Got it, thanks!')
        await refetch()

    }

    useEffect(() => {
        if (token) {
            refetch()
        }
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <section className="px-20 min-h-svh">
            <PageBanner title="cart" suffix={data?.length ? data.length : '0'} />
            {isPopupOpen && displayPopup()}
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
                            error
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
                            key={item.product?.id}
                            product={item.product}
                            quantity={item.quantity}
                            removeItemFunc={() => removeItem(item.product?.id, item.product?.name)}
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
