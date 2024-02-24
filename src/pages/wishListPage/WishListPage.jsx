import React, { useEffect, useState } from 'react'
import {
    CartItem,
    MainActionLink,
    PageBanner,
    SimpleLoading,
} from '../../components'
import { useAuth } from '../../hooks/useAuth'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchWishList, removeProductFromWishlist } from '../../utils/api'
import { displayImage } from '../../utils/helper'
import usePopup from '../../hooks/usePopup'

const WishListPage = () => {
    const { token } = useAuth()
    const { isPopupOpen, displayPopup, openPopupFunc } = usePopup()

    const [page, setPage] = useState(1)

    const { status, data, error, refetch } = useQuery({
        queryKey: ['products', page, token],
        queryFn: () => fetchWishList(9, page, token),
        placeholderData: keepPreviousData,
        enable: !!token,
        staleTime: 3600000,
    })

    const addItemToCart = () => {
        console.log('asdawd')
    }

    const removeItemFromList = async(id, name) => {
        if (!token) return
        await removeProductFromWishlist(id, token)
        openPopupFunc(`${name} is remove from the wishlist`, 'Got it, thanks')
        await refetch()
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <section className="px-20 min-h-svh">
            <PageBanner title="Wishlist" suffix={data ? data.length : '0'}/>
            {status === 'pending' ? (
                <SimpleLoading />
            ) : status === 'error' ? (
                <div>{error.message}</div>
            ) : (
                <div className='flex flex-col w-full gap-2'>
                    {data.map((item) => (
                        <CartItem
                            key={item.product?.id}
                            product={item.product}
                            removeItemFunc={() => removeItemFromList(item.product?.id, item.product?.name)}
                            addItemFunc={()=>addItemToCart(item.product?.id)}
                        />
                    ))}
                </div>
            )}

            <div className="mt-4 flex-center">
                <MainActionLink to="/shop">continue shopping</MainActionLink>
            </div>
        </section>
    )
}

export default WishListPage
