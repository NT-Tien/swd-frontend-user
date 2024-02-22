import React, { useEffect, useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchCartItems, removeProductFromCart } from '../../utils/api'
import { CartItem, MainActionLink, PageBanner } from '../../components'
import { useAuth } from '../../hooks/useAuth'

const ShoppingCartPage = () => {
    const [page, setPage] = useState(1)
    const { token } = useAuth()
    const { status, data, error } = useQuery({
        queryKey: ['cart', page, token],
        queryFn: () => fetchCartItems(9, page, token),
        placeholderData: keepPreviousData,
        enabled: !!token,
        staleTime: 180000,
    })

    const removeItem = (id) => {
        if (!token) return
        removeProductFromCart(id, token)
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <section className="px-20 min-h-svh">
            <PageBanner title="cart" suffix="0" />

            {status === 'pending' ? (
                <>
                    <div className="mt-4 ">
                        <p className="text-sm text-center text-gray-500">
                            Loading...
                        </p>
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
                            {error.message}
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
                        <CartItem removeItemFunc={() => removeItem(item.id)} />
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
