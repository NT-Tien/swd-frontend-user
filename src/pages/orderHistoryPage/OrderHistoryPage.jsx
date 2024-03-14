import React, { useEffect } from 'react'
import {
    MainActionLink,
    OrderItem,
    PageBanner,
    SimpleLoading,
} from '../../components'
import { useOrderHistoryData } from '../../hooks/useOrderHistoryData'

const OrderHistoryPage = () => {
    const { status, data, error } = useOrderHistoryData()

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <section className="px-[5svw] min-h-svh">
            <PageBanner title="History" />

            {status === 'pending' ? (
                <SimpleLoading />
            ) : status === 'error' ? (
                <div>{error.message}</div>
            ) : data && Array.isArray(data) && data.length > 0 ? (
                <div className='flex flex-col gap-2'>
                    {data.toReversed().map((order) => (
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
