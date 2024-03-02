import React from 'react'
import { PageBanner, SimpleLoading } from '../../components'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { getOrderHistory } from '../../utils/api'
import { useAuth } from '../../hooks/useAuth'

const OrderHistoryPage = () => {

    const { token } = useAuth()

    const {status, data, error} = useQuery({
        queryKey: ['order', token],
        queryFn: () => getOrderHistory(token),
        placeholderData: keepPreviousData,
        staleTime: 3600000,
    })

    return (
        <section className="px-20 min-h-svh">
            <PageBanner title="History" />

            {
                status === 'pending' ? (
                    <SimpleLoading />
                ) : (
                    status === 'error' ? (
                        <div>{error.message}</div>
                    ) : (
                        <div>
                            asdawd
                        </div>
                    )
                )
            }
        </section>
    )
}

export default OrderHistoryPage
