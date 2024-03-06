import React from 'react'

const OrderItem = ({ order }) => {
    return (
        <div className="flex flex-col w-full p-6 shadow-sm h-80 min-h-max bg-neutral-100">
            {/* head */}
            <div className="flex items-center justify-end">
                <div className="flex text-sm divide-x divide-secondary-theme/50">
                    {order.status_delivery === 'CANCELED' ? (
                        <span className="pr-1 text-red-600">
                            Order delivery has been canceld
                        </span>
                    ) : order.status_delivery === 'SHIPPING' ? (
                        <span className="pr-1 text-yellow-600">
                            The order is being shipped
                        </span>
                    ) : (
                        <span className="pr-1 text-green-600">
                            The order is completed
                        </span>
                    )}

                    {order.payment.status === 'EXPIRED' ? (
                        <span className="pl-2 text-red-700">
                            Payment expired
                        </span>
                    ) : (
                        <span className="pl-2 text-green-700">
                            Payment completed
                        </span>
                    )}
                </div>
            </div>

            {order.products && order.products.length > 0 ? (
                order.products.map((product, i) => (
                    <div key={i} className="flex flex-col justify-center p-2 px-4 my-1 border-y border-secondary-theme/50">
                        <span className='text-xl font-light'>{product.name}</span>
                        <div className='flex items-center justify-between '>

                        <span>Material: {product.material}</span>
                        <span>{product.price * product.quantity}₫</span>
                        </div>
                        <span>x{product.quantity}</span>
                    </div>
                ))
            ) : (
                <div>empty</div>
            )}
            <div className='flex justify-end text-xl font-light'> 
              Total: {order.total}₫
            </div>
        </div>
    )
}

export default OrderItem
