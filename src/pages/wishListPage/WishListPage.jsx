import React, { useEffect, useState } from 'react'
import {
    CartItem,
    MainActionLink,
    PageBanner,
    SimpleLoading,
} from '../../components'
import {
    useRemoveWishlistItem,
    useWishlistData,
} from '../../hooks/useWishlistData'
import { useAddCartItem } from '../../hooks/useCartData'
import usePopup from '../../hooks/usePopup'

const WishListPage = () => {
    const [page, setPage] = useState(1)
    const { openPopupFunc } = usePopup()
    const { status, data, error } = useWishlistData(page)
    const { mutate: addToCart } = useAddCartItem()
    const { mutate: removeWishlistItem } = useRemoveWishlistItem()

    const addItemToCart = async (id, oid, name) => {
        addToCart({ id, oid, name })
    }

    const removeItemFromWishlist = async (id, name) => {
        if (!id || !name) {
            return
        }
        const func = () => {
            removeWishlistItem({ id, name })
        }
        openPopupFunc(
            'Are you sure you want to remove this item from your wishlist?',
            'Yes',
            func,
            true
        )
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <section className="px-[5svw] min-h-svh">
            <PageBanner
                title="Wishlist"
                suffix={data && Array.isArray(data) ? data.length : '0'}
            />
            {status === 'pending' ? (
                <SimpleLoading />
            ) : status === 'error' ? (
                <div className="text-secondary-theme">
                    OOPS. SOMETHING WENT WRONG FETCHING YOUR WISHLIST
                </div>
            ) : (
                <div className="flex flex-col w-full gap-2">
                    {Array.isArray(data) ? (
                        data.length !== 0 ? (
                            data.map((item) => (
                                <CartItem
                                    key={item.product?.id}
                                    product={item.product}
                                    removeItemFunc={() =>
                                        removeItemFromWishlist(
                                            item.product?.id,
                                            item.product?.name
                                        )
                                    }
                                    addItemFunc={addItemToCart}
                                />
                            ))
                        ) : (
                            <div className="w-full py-5 flex-center text-secondary-theme">
                                There's currently no item in your wishlist
                            </div>
                        )
                    ) : (
                        <div className="w-full py-5 flex-center text-secondary-theme">
                            There's currently no item in your wishlist
                        </div>
                    )}
                </div>
            )}

            <div className="mt-4 flex-center">
                <MainActionLink to="/shop">continue shopping</MainActionLink>
            </div>
        </section>
    )
}

export default WishListPage
