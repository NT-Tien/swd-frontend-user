import React, { useEffect } from 'react'
import {
    MainActionLink,
    OrderItem,
    PageBanner,
    SimpleLoading,
} from '../../components'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { getOrderHistory } from '../../utils/api'
import { useAuth } from '../../hooks/useAuth'

const OrderHistoryPage = () => {
    const { token } = useAuth()

    const { status, data, error } = useQuery({
        queryKey: ['order', token],
        queryFn: () => getOrderHistory(token),
        placeholderData: keepPreviousData,
        staleTime: 3600000,
    })

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <section className="px-20 min-h-svh">
            <PageBanner title="History" />

            {status === 'pending' ? (
                <SimpleLoading />
            ) : status === 'error' ? (
                <div>{error.message}</div>
            ) : Array.isArray(data) && data.length > 0 ? (
                <div className='flex flex-col gap-2'>
                    {data.map((order) => (
                        <OrderItem key={order.id} order={order} />
                    ))}
                </div>
            ) : (
                <>
                    <div className="mt-4 ">
                        <p className="text-sm text-center text-gray-500">
                            There's currently no order
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

export default OrderHistoryPage
