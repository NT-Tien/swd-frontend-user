import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Rating } from 'react-simple-star-rating'
import {
    ActionButton,
    Carousel,
    MainActionButton,
    PageBanner,
    ReadMore,
    SimpleLoading,
} from '../../components'
import {
    fetchProductByName,
    fetchProductOptionById,
    getRating,
    getRatingByUser,
    postRating,
} from '../../utils/api'
import {
    useQuery,
    keepPreviousData,
    useQueryClient,
} from '@tanstack/react-query'
import { DEFAULT_API_URL } from '../../config/api'
import useCheckAuth from '../../hooks/useCheckAuth'
import { HeartIcon } from '../../assets'
import { useAuth } from '../../hooks/useAuth'
import { useAddCartItem } from '../../hooks/useCartData'
import { useAddWishlistItem } from '../../hooks/useWishlistData'
import { useOrderHistoryData } from '../../hooks/useOrderHistoryData'
import usePopup from '../../hooks/usePopup'

const ProductDetailsPage = () => {
    const queryClient = useQueryClient()
    const { name } = useParams()
    const { checkAuthFunction } = useCheckAuth()
    const { token, user } = useAuth()

    const [rateUpdate, setRateUpdate] = useState(null)
    const [ableToRate, setAbleToRate] = useState(false)
    const [chosenOption, setChosenOption] = useState(null)
    const [imgUrls, setImgUrls] = useState([])
    const {
        status,
        data: data,
        error,
    } = useQuery({
        queryKey: ['product', name],
        queryFn: () => fetchProductByName(name),
        placeholderData: keepPreviousData,
        staleTime: 3600000,
    })

    const productId = data?.id

    const {
        status: optionStatus,
        data: optionsData,
        error: optionError,
    } = useQuery({
        queryKey: ['productOptions', productId],
        queryFn: () => fetchProductOptionById(productId),
        placeholderData: keepPreviousData,
        enabled: !!productId,
        staleTime: 3600000,
    })

    const {
        status: ratingStatus,
        data: ratingData,
        error: ratingError,
    } = useQuery({
        queryKey: ['productRating', productId],
        queryFn: () => getRating(productId),
        placeholderData: keepPreviousData,
        enabled: !!productId,
        staleTime: 3600000,
    })

    const {
        status: userRateStatus,
        data: userRateData,
        error: userRateError,
    } = useQuery({
        queryKey: ['userRate', token],
        queryFn: () => getRatingByUser(user.accountId, token),
        placeholderData: keepPreviousData,
        enabled: !!user,
        staleTime: 3600000,
    })

    const { data: orderData } = useOrderHistoryData()

    const { mutate: addToCart } = useAddCartItem()
    const { mutate: addToWishlist } = useAddWishlistItem()

    const { openPopupFunc } = usePopup()
    const [ratingValue, setRatingValue] = useState(0)
    const [openRateButton, setOpenRateButton] = useState(false)

    const handleOnClickRating = () => {}

    const handleRating = (rate) => {
        setRatingValue(rate)
        setOpenRateButton(true)
    }

    const handleRatingUpdate = (id) => {
        setOpenRateButton(false)
        if (user) {
            toast
                .promise(
                    () => {
                        return postRating(
                            id,
                            ratingValue,
                            user.accountId,
                            token
                        )
                    },
                    {
                        pending: 'Loading',
                        success: 'Thank you for your feedback',
                        error: 'An error occur trying to rate the product',
                    }
                )
                .then(async (res) => {
                    console.log(res)
                    if (res && productId)
                        setTimeout(() => {
                            queryClient.invalidateQueries({
                                queryKey: ['productRating'],
                            })
                        }, 500)
                    return
                })
        }
    }

    const handleAddToCart = checkAuthFunction(async () => {
        if (!token) return
        const id = data.id
        const oid = chosenOption.id
        const name = data.name
        addToCart({ id, oid, name })
    })

    const handleAddWishList = checkAuthFunction(async () => {
        if (!token) return
        const id = data.id
        const name = data.name
        addToWishlist({ id, name })
    })

    const handleOptionClick = (option) => {
        if (option) setChosenOption(option)
    }

    useEffect(() => {
        if (optionsData) setChosenOption(optionsData[0])
    }, [optionsData])

    useEffect(() => {
        if (!data) return
        let imgUrlArray = []
        data.images.map((image) => {
            const id = image.replace('image/', DEFAULT_API_URL + 'file/show/')
            imgUrlArray.push(id)
        })
        setImgUrls(imgUrlArray)
    }, [data])

    useEffect(() => {
        if (orderData && Array.isArray(orderData)) {
            console.log(orderData)
            orderData.forEach((order) => {
                if (order.status_delivery === 'DELIVERED') {
                    const result = order.products.find(
                        (product) => product.product_id === productId
                    )
                    if (result) {
                        setAbleToRate(true)
                        return
                    }
                }
            })
        }
    }, [orderData, productId])

    useEffect(() => {
        if (userRateData && Array.isArray(userRateData.data) && productId) {
            const result = userRateData.data.find(
                (data) => productId === data.product_id
            )
            if (result) {
                setRateUpdate(result)
                return
            }
        }
    }, [userRateData, productId])

    return (
        <section className="flex min-h-max flex-col px-[5svw] text-secondary-theme">
            <PageBanner title="Details" />
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="flex flex-col w-full h-full gap-10 min-h-max md:flex-row max-md:items-center ">
                {status === 'pending' ? (
                    <SimpleLoading />
                ) : status === 'error' ? (
                    <div>Error: {error.message}</div>
                ) : (
                    <>
                        {/* image */}
                        <div className="relative flex-shrink-0 w-1/2 h-full min-w-72 md:w-1/3 ">
                            <Carousel images={imgUrls} />
                        </div>
                        {/* name */}
                        <div className="flex flex-col justify-between min-h-max">
                            <div className="flex flex-col gap-4 ">
                                <h3 className="text-3xl uppercase">
                                    {data?.name}
                                </h3>

                                {/* options */}
                                <div className="flex gap-2">
                                    <span className="font-medium">
                                        Options:
                                    </span>
                                    {optionStatus === 'pending' ? (
                                        <SimpleLoading />
                                    ) : optionStatus === 'error' ? (
                                        <div>Error: {optionError.message}</div>
                                    ) : (
                                        <div className="flex gap-4">
                                            {optionsData?.map((option, i) => (
                                                <ActionButton
                                                    key={option.id}
                                                    active={
                                                        option.name ===
                                                        chosenOption?.name
                                                    }
                                                    className="p-1 px-2 rounded-full min-w-16"
                                                    onClick={() =>
                                                        handleOptionClick(
                                                            option
                                                        )
                                                    }
                                                >
                                                    {option.name}
                                                </ActionButton>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <span className="font-medium">
                                        Material:{' '}
                                    </span>
                                    {chosenOption?.material}
                                </div>
                                {/* description */}
                                <div>
                                    <span className="font-medium">
                                        Description:{' '}
                                    </span>
                                    <ReadMore text={data?.description} />
                                </div>
                            </div>

                            {/* price */}
                            <div className="flex flex-col gap-4">
                                {user && ableToRate && (
                                    <div className="flex flex-col mt-10">
                                        {rateUpdate ? (
                                            <span className="text-sm leading-tight">
                                                Seems like you've rated this
                                                piece before.
                                            </span>
                                        ) : (
                                            <span className="text-sm leading-tight">
                                                Seems like you've bought this
                                                piece before.
                                            </span>
                                        )}
                                        <div className="flex items-center gap-4">
                                            {rateUpdate ? (
                                                <h5 className="font-medium">
                                                    Wanna rate it again?
                                                </h5>
                                            ) : (
                                                <h5 className="font-medium">
                                                    Rate this piece?
                                                </h5>
                                            )}

                                            <Rating
                                                onClick={handleRating}
                                                initialValue={
                                                    rateUpdate
                                                        ? rateUpdate.rate
                                                        : 0
                                                }
                                                showTooltip
                                            />
                                            {openRateButton && productId && (
                                                <ActionButton
                                                    className="px-4 py-2 rounded-full"
                                                    onClick={() =>
                                                        handleRatingUpdate(
                                                            productId
                                                        )
                                                    }
                                                >
                                                     {rateUpdate ? (
                                                'Update your rating'
                                            ) : (
                                                'Confirm your rating'
                                            )}
                                                </ActionButton>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 ">
                                    <h5 className="font-medium">Rating:</h5>
                                    <Rating
                                        readonly
                                        showTooltip
                                        allowFraction
                                        tooltipDefaultText="No rating"
                                        initialValue={
                                            ratingData &&
                                            !isNaN(
                                                ratingData.data.absRate /
                                                    ratingData.data
                                                        .numberOfRates
                                            )
                                                ? ratingData.data.absRate /
                                                  ratingData.data.numberOfRates
                                                : 0
                                        }
                                    />
                                    {ratingData &&
                                        !isNaN(
                                            ratingData.data.numberOfRates
                                        ) && (
                                            <div className="font-medium">
                                                ({ratingData.data.numberOfRates}{' '}
                                                ratings)
                                            </div>
                                        )}
                                </div>
                                <span className="text-5xl font-light">
                                    {chosenOption?.price}₫
                                </span>
                                <div className="flex gap-2">
                                    <MainActionButton
                                        onClick={handleAddToCart}
                                        className="w-max"
                                    >
                                        Add to Cart
                                    </MainActionButton>
                                    <MainActionButton
                                        onClick={handleAddWishList}
                                        className="w-max"
                                        suffixArrow={<HeartIcon />}
                                    >
                                        Add to Wishlist
                                    </MainActionButton>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default ProductDetailsPage
