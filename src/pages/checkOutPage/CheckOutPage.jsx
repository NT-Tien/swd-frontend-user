import React, { useEffect, useState } from 'react'
import { ShoppingCartIcon } from '../../assets'
import CartItem from '../../components/commons/CartItem'
import {
    MainActionButton,
    MainActionLink,
    PageBanner,
    SimpleLoading,
} from '../../components'
import { useCartData } from '../../hooks/useCartData'
import { useAuth } from '../../hooks/useAuth'
import { createOrder } from '../../utils/api'

const CheckOutPage = () => {
    const { token, user } = useAuth()
    const [totalPrice, setTotalPrice] = useState(0)
    const [formValue, setFormValue] = useState({
        phone: '',
        email: '',
        address: '',
        voucher_id: '',
    })

    const { status, data, error } = useCartData(1)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValue((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(formValue)

        if (formValue && user && data) {
            const cartItems = data
            let products = []
            cartItems.forEach((item) => {
                const chosenOption = item.product.optionProducts.find(
                    (option) => option.id === item.chooseOption
                )
                const product_id = chosenOption.id
                const name = chosenOption.name
                const material = chosenOption.material
                const price = chosenOption.price
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
            console.log(products)
            const result = await createOrder(
                user.profile.profile.id,
                totalPrice,
                products,
                formValue,
                token
            )
            console.log(result)
        }

        setFormValue({
            phone: '',
            email: '',
            address: '',
            voucher_id: '',
        })
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
            <div className="flex flex-col w-full h-full gap-4 rounded-sm min-h-max md:flex-row ">
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
                    ) : (
                        <>
                            <div className="flex max-h-[55svh] flex-col gap-2 overflow-y-auto">
                                {data?.map((item, i) => (
                                    <>
                                        <CartItem
                                            isItemEditable={false}
                                            key={item.chooseOption}
                                            quantity={item.quantity}
                                            chooseOption={item.chooseOption}
                                            product={item.product}
                                        />
                                    </>
                                ))}
                            </div>
                        </>
                    )}

                    <div className="flex-col self-end w-full gap-4 flex-center min-w-max ">
                        <div className="flex justify-between w-full">
                            <span className="text-lg uppercase">total</span>
                            <h5 className="text-5xl ">${totalPrice}</h5>
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
                            placeholder="phone"
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
                            placeholder="Address"
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
                            placeholder="Email"
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
                            placeholder="Voucher"
                            className="block w-full p-3 text-sm text-gray-900 border rounded-full border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                        />

                        <MainActionButton
                            isSuffixArrow={false}
                            type="submit"
                            className="self-center w-4/5 p-3 mt-10 bg-secondary-theme"
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
