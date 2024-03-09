import React, { useEffect, useState } from 'react'
import { CreditCardIcon, MoneyIcon, ShoppingCartIcon } from '../../assets'
import CartItem from '../../components/commons/CartItem'
import {
    MainActionButton,
    MainActionLink,
    PageBanner,
    SimpleLoading,
} from '../../components'
import { useCartData, useClearCart } from '../../hooks/useCartData'
import { useAuth } from '../../hooks/useAuth'
import { createOrder, createOrderWithWallet } from '../../utils/api'
import usePopup from '../../hooks/usePopup'
import clsx from 'clsx'

const CheckOutPage = () => {
    const { token, user } = useAuth()
    const { openPopupFunc } = usePopup()
    const [totalPrice, setTotalPrice] = useState(0)
    const [paymentOption, setPaymentOption] = useState('card')
    const [formValue, setFormValue] = useState({
        phone: '',
        email: '',
        address: '',
        voucher_id: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const { status, data, error } = useCartData(1)
    const { mutate: clearCart } = useClearCart()

    const paymentMethods = [
        {
            icon: <CreditCardIcon />,
            method: 'Online transaction',
            value: 'card',
        },
        {
            icon: <MoneyIcon />,
            method: 'Website e-wallet',
            value: 'wallet',
        },
    ]

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValue((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formValue && user && !isLoading ) {
            if(!data ||  data.length <= 0) {
                setErrorMsg('Your cart is currently empty.')
                return
            }
            setIsLoading(true)
            const cartItems = data
            let products = []
            const user_id = user.accountId
            cartItems.forEach((item) => {
                const chosenOption = item.product.optionProducts.find(
                    (option) => option.id === item.chooseOption
                )
                const product_id = chosenOption.id
                const name = chosenOption.name
                const material = chosenOption.material
                const price = Number(chosenOption.price)
                const product = {
                    id: product_id,
                    product_id: item.product.id,
                    name: name,
                    material: material,
                    price: price,
                    quantity: item.quantity,
                }
                products.push(product)
            })
            if (paymentOption === 'card') {
                const result = await createOrder(
                    user.accountId,
                    totalPrice,
                    products,
                    formValue,
                    token
                )
                if (result.code === '00') {
                    const checkoutUrl = result.data.checkoutUrl
                    const redirect = () => {
                        window.open(checkoutUrl, '_blank')
                    }
                    openPopupFunc(
                        'Your order has been received!',
                        'Head to payment',
                        redirect
                    )
                    clearCart()
                }
            } else if (paymentOption === 'wallet') {
                console.log(products)
                const result = await createOrderWithWallet(
                    user_id,
                    totalPrice,
                    products,
                    formValue,
                    token
                )
                console.log(result)
                if (result.code !== '00') {
                    setErrorMsg(result.message)
                    openPopupFunc(result.message, 'Got it, thanks')
                } else {
                    const checkoutUrl = result.data.checkoutUrl
                    const redirect = () => {
                        window.open(checkoutUrl, '_blank')
                    }
                    openPopupFunc(
                        'Your order has been received!',
                        'Head to payment',
                        redirect
                    )
                    clearCart()
                }
            }

            setFormValue({
                phone: '',
                email: '',
                address: '',
                voucher_id: '',
            })
        }

        setIsLoading(false)
    }

    const handlePaymentMethodChange = (method) => {
        setPaymentOption(method.value)
    }

    useEffect(() => {
        const totalPrice = data?.reduce(
            (accumulator, item) =>
                item.product.optionProducts.find(
                    (option) => option.id === item.chooseOption
                ).price *
                    item.quantity +
                accumulator,
            0
        )
        setTotalPrice(totalPrice)
    }, [data])

    return (
        <section className="px-20 min-h-svh">
            <PageBanner title="checkout" />
            <div className="flex flex-col w-full h-full gap-4 min-h-max md:flex-row ">
                {/* items */}
                <div className="flex flex-col flex-1 gap-4 p-6 ">
                    <div className="flex w-full gap-2 text-lg uppercase">
                        <ShoppingCartIcon />
                        <span> Cart summary</span>
                    </div>

                    {status === 'pending' ? (
                        <SimpleLoading />
                    ) : status === 'error' ? (
                        <div>{error.message}</div>
                    ) : data && data.length > 0 ? (
                        <div className="flex max-h-[55svh] flex-col gap-2 overflow-y-auto">
                            {data?.map((item, i) => (
                                <CartItem
                                    isItemEditable={false}
                                    key={i}
                                    quantity={item.quantity}
                                    chooseOption={item.chooseOption}
                                    product={item.product}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="w-full text-sm flex-center text-secondary-theme/90">
                            There is currently no item in your cart
                        </div>
                    )}

                    <div className="flex-col self-end w-full gap-4 flex-center min-w-max ">
                        <div className="flex justify-between w-full">
                            <span className="text-lg uppercase">total</span>
                            <h5 className="text-5xl font-light">
                                {totalPrice}
                                <span className="text-3xl">₫</span>
                            </h5>
                        </div>
                        <div className="w-full gap-4 flex-center">
                            <MainActionLink to="/cart">
                                edit cart
                            </MainActionLink>
                            <MainActionLink to="/shop">
                                continue shopping
                            </MainActionLink>
                        </div>
                    </div>
                </div>

                {/* payment info */}
                <div className="flex flex-col p-6 pb-10 border shadow-xl w-96 min-w-max border-secondary-theme">
                    <div className="flex w-full gap-2 mb-4 text-lg uppercase">
                        <span> Billing information</span>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-2"
                    >
                        <label htmlFor="phoneInput">
                            Phone<span className="text-red-600">*</span>
                        </label>

                        <input
                            type="tel"
                            minLength={9}
                            maxLength={12}
                            onChange={handleInputChange}
                            value={formValue.phone}
                            id="phoneInput"
                            name="phone"
                            placeholder="Phone number..."
                            className="block w-full p-3 text-sm text-gray-900 border rounded-full border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                            required
                        />

                        {/* address */}
                        <label htmlFor="addressInput">
                            Address<span className="text-red-600">*</span>
                        </label>
                        <input
                            id="addressInput"
                            name="address"
                            onChange={handleInputChange}
                            value={formValue.address}
                            type="text"
                            minLength="10"
                            placeholder="Address..."
                            className="block w-full p-3 text-sm text-gray-900 border rounded-full border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                            required
                        />

                        {/* email */}

                        <label htmlFor="emailInput">
                            Email<span className="text-red-600">*</span>
                        </label>
                        <input
                            id="emailInput"
                            name="email"
                            onChange={handleInputChange}
                            value={formValue.email}
                            type="email"
                            placeholder="Email..."
                            className="block w-full p-3 text-sm text-gray-900 border rounded-full border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                            required
                        />

                        {/* voucher */}

                        <label htmlFor="voucherInput">Voucher</label>
                        <input
                            id="voucherInput"
                            name="voucher_id"
                            onChange={handleInputChange}
                            value={formValue.voucher_id}
                            type="text"
                            placeholder="Voucher..."
                            className="block w-full p-3 text-sm text-gray-900 border rounded-full border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                        />

                        <h5 className="font-medium">Choose payment method: </h5>
                        {paymentMethods.map((method) => (
                            <button
                                type="button"
                                key={method.value}
                                onClick={() =>
                                    handlePaymentMethodChange(method)
                                }
                                className={clsx(
                                    'flex items-center gap-2 border border-secondary-theme p-2 px-4 transition-all duration-300 hover:scale-[1.02] hover:bg-secondary-bg-color hover:shadow-md',
                                    paymentOption === method.value &&
                                        'scale-[1.01] bg-secondary-bg-color shadow-xl hover:bg-neutral-300'
                                )}
                            >
                                {method.icon} {method.method}
                            </button>
                        ))}
                        {isLoading && <SimpleLoading />}
                                    {errorMsg && <span className='text-sm font-medium text-red-600'>{errorMsg}</span>}
                        <MainActionButton
                            isSuffixArrow={false}
                            type="submit"
                            className="self-center w-4/5 p-3 mt-2 bg-secondary-theme"
                            textColor="text-white "
                        >
                            Check out
                        </MainActionButton>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default CheckOutPage
