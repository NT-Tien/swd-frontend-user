import React, { useEffect, useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchCartItems, removeProductFromCart } from '../../utils/api'
import { MainActionLink } from '../../components'

const ShoppingCartPage = () => {
    const [page, setPage] = useState(1)
    const user = JSON.parse(sessionStorage.getItem('user'))
    const token = user?.accessToken
    const { status, data, error } = useQuery({
        queryKey: ['cart', page, token],
        queryFn: () => fetchCartItems(page, token),
        placeholderData: keepPreviousData,
        enabled: !!token,
        staleTime: 180000,
    })

    const removeItem = (id) => {
        const user = JSON.parse(sessionStorage.getItem('user'))
        if (!user) return
        removeProductFromCart(id, user.accessToken)
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <section className="px-20 min-h-svh">
            <div className="mb-4 font-light uppercase text-9xl text-secondary-theme">
                cart
            </div>

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
                <>
                    {data.map((item) => (
                        <div key={item.id} className="w-full">
                            <CartItem removeItemFunc={() => removeItem(item.id)} />
                        </div>
                    ))}

                    <div className="mt-4 flex-center">
                        <MainActionLink to="/checkout">
                            proceed to checkout
                        </MainActionLink>
                    </div>
                </>
            ) : (
                <>
                    <div className="mt-4 ">
                        <p className="text-sm text-center text-gray-500">
                            There's currently no item in your cart
                        </p>
                    </div>

                    <div className="mt-4 flex-center">
                        <MainActionLink onClick={closeModalFunction} to="/shop">
                            continue shopping
                        </MainActionLink>
                    </div>
                </>
            )}
        </section>
    )
}

export default ShoppingCartPage
