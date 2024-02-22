import React, { useEffect } from 'react'
import { CartItem, MainActionLink, PageBanner } from '../../components'
import { useAuth } from '../../hooks/useAuth'

const WishListPage = () => {
    const {token} = useAuth()

    const { status, data, error } = useQuery({
        queryKey: ['products', page, token],
        queryFn: () => fetchWishList(page, token),
        placeholderData: keepPreviousData,
        staleTime: 3600000,
    })
    
    const addItemToCart = () => {
        console.log('asdawd')
    }

    const removeItemFromList = (id) => {
        if (!token) return
        removeItemFromList(id, token)
    }


    return (
        <section className="px-20 min-h-svh">
            <PageBanner title='Wishlist'/>

            <CartItem
                removeItemFunc={() => removeItemFromList(1)}
                addItemFunc={addItemToCart}
            />

            <div className="mt-4 flex-center">
                <MainActionLink to="/shop">continue shopping</MainActionLink>
            </div>
        </section>
    )
}

export default WishListPage
