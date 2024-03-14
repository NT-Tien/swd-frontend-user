import React, { useEffect } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchProductByid } from '../../utils/api'

const OrderItemName = ({id, name}) => {

    const {status, data} = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductByid(id),
        placeholderData: keepPreviousData,
        staleTime: 3600000,
    })

  return (
    <span className='text-xl font-light'>{data && data.name}| {name}</span>
  )
}

export default OrderItemName