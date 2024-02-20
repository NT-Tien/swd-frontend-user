import React from 'react'
import { CartItem, MainActionLink } from '../../components'

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
            <div className="mb-4 font-light uppercase text-9xl text-secondary-theme">
                wishlist
            </div>

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
