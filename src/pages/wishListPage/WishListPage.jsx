import React from 'react'
import { CartItem, MainActionLink, PageBanner } from '../../components'

const WishListPage = () => {
    const addItemToCart = () => {
        console.log('asdawd')
    }

    const removeItemFromList = (id) => {
        const user = JSON.parse(sessionStorage.getItem('user'))
        if (!user) return
        removeItemFromList(id, user.accessToken)
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
