import React, { useState } from 'react'
import { formatDate } from '../../utils/helper'
import OrderItemName from './OrderItemName'
import MainActionButton from './buttons/MainActionButton'
import usePopup from '../../hooks/usePopup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Bounce } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'
import { postRating } from '../../utils/api'
import { Rating } from 'react-simple-star-rating'
const OrderItem = ({ order }) => {
    const { openPopupFunc } = usePopup()
    const { token, user } = useAuth()

    const [ratingValue, setRatingValue] = useState(0)

    const handleRating = (rate) => {
        setRatingValue(rate)
    }

    const func = (id) => {
        toast.promise(
            () => {
                return postRating(id, ratingValue, user.id, token)
            },
            {
                pending: 'Promise is pending',
                success: 'Promise resolved 👌',
                error: 'Promise rejected 🤯',
            }
        )
    }

    const handleRatingClick = (id) => {
        openPopupFunc(
            <div>
                <h5 className="w-full flex-center">Rate:</h5>
                <div className="flex items-start w-full">
                    <Rating onClick={handleRating} showTooltip />
                </div>
            </div>,
            'Rate',
            () => func(id),
            true
        )
    }

    return (
        order && (
            <div className="flex flex-col w-full p-6 shadow-sm h-max min-h-max bg-neutral-100">
                {/* head */}
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
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
                <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                        {formatDate(order.createdAt)}
                    </div>
                    <div className="flex text-sm divide-x divide-secondary-theme/50">
                        {order.status_delivery === 'CANCELED' ? (
                            <span className="pr-1 text-red-600">CANCELLED</span>
                        ) : order.status_delivery === 'SHIPPING' ? (
                            <span className="pr-1 text-yellow-600">
                                SHIPPING
                            </span>
                        ) : order.status_delivery === 'DELIVERED' ? (
                            <span className="pr-1 text-green-600">
                                COMPLETED
                            </span>
                        ) : (
                            order.status_delivery === 'PENDING' && (
                                <span className="pr-1 text-yellow-600">
                                    PENDING
                                </span>
                            )
                        )}

                        {order.payment ? (
                            order.payment.status === 'EXPIRED' ? (
                                <span className="pl-2 text-red-700">
                                    PAYMENT TIMEOUT
                                </span>
                            ) : order.payment.status === 'CANCELLED' ? (
                                <span className="pl-2 text-yellow-600">
                                    PAYMENT CANCELLED
                                </span>
                            ) : (
                                <span className="pl-2 text-green-700">
                                    PAID
                                </span>
                            )
                        ) : order.wallet_payment ? (
                            <span className="pl-2 text-green-700">
                                    PAID
                                </span>
                            
                        ): ('')}
                    </div>
                </div>

                {order.products && order.products.length > 0 ? (
                    order.products.map((product, i) => (
                        <div
                            key={i}
                            className="flex flex-col justify-center p-2 px-4 my-1 border-y border-secondary-theme/50"
                        >
                            <OrderItemName
                                id={product.product_id}
                                name={product.name}
                            />
                            <div className="flex items-center justify-between ">
                                <span>Material: {product.material}</span>
                                <span>{product.price * product.quantity}₫</span>
                            </div>
                            <span>x{product.quantity}</span>
                            {order.status_delivery === 'COMPLETED' ||
                                (order.status_delivery === 'SHIPPED' && (
                                    <MainActionButton
                                        className="px-4 mt-2 w-fit"
                                        isSuffixArrow={false}
                                        onClick={() =>
                                            handleRatingClick(
                                                product.product_id
                                            )
                                        }
                                    >
                                        Rate this
                                    </MainActionButton>
                                ))}
                        </div>
                    ))
                ) : (
                    <div>empty</div>
                )}
                <div className="flex justify-end text-xl font-light">
                    Total: {order.total}₫
                </div>
            </div>
        )
    )
}

export default OrderItem
