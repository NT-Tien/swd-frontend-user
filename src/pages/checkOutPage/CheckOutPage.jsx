import React, { useState } from 'react'
import { ShoppingCartIcon } from '../../assets'
import CartItem from '../../components/commons/CartItem'
import { MainActionButton } from '../../components'

const CheckOutPage = () => {
    const [formValue, setFormValue] = useState({
        firstname: '',
        lastname: '',
        email: '',
        address: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValue((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(formValue)

        setFormValue({
            firstname: '',
            lastname: '',
            email: '',
            address: '',
        })
    }

    return (
        <section className="px-20 min-h-svh">
            <div className="mb-4 font-light uppercase text-9xl text-secondary-theme">
                checkout
            </div>
            <div className="flex flex-col w-full h-full gap-4 border-t rounded-sm shadow-xl min-h-max border-t-neutral-800/10 md:flex-row ">
                {/* items */}
                <div className="flex flex-col flex-1 gap-4 p-6 shadow-lg">
                    <div className="flex w-full gap-2 text-lg uppercase">
                        <ShoppingCartIcon />
                        <span> Cart summary</span>
                    </div>

                    {/* total price */}

                    <h5 className="text-5xl ">$420</h5>

                    {/* cart items */}

                    <CartItem />
                    {/* sub total */}
                    <div className="flex flex-col self-end w-full gap-2 min-w-max">
                        <div className="flex justify-between gap-4 mt-4">
                            <span className="uppercase">sub total</span>
                            <span>$420</span>
                        </div>

                        <hr class="h-px  border-0 bg-gray-300 " />

                        <div className="flex justify-between text-neutral-500 ">
                            <span className="uppercase ">shipping</span>
                            <span>free</span>
                        </div>

                        <hr className="h-px bg-gray-300 border-0 " />

                        <div className="flex justify-between ">
                            <span className="uppercase">total</span>
                            <span>$420</span>
                        </div>
                    </div>
                </div>

                {/* payment info */}
                <div className="flex flex-col flex-1 p-6 shadow-lg">
                    <div className="flex w-full gap-2 mb-4 text-lg uppercase">
                        <span> Billing information</span>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-2"
                    >
                        <label htmlFor="nameInput">
                            Name<span className="text-red-600">*</span>
                        </label>
                        <div id="nameInput" className="flex gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                onChange={handleInputChange}
                                value={formValue.firstname}
                                name="firstname"
                                className="block w-full p-3 text-sm text-gray-900 border rounded-full border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                                required
                            />
                            <input
                                type="text"
                                onChange={handleInputChange}
                                value={formValue.lastname}
                                name="lastname"
                                placeholder="Last Name"
                                className="block w-full p-3 text-sm text-gray-900 border rounded-full border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                                required
                            />
                        </div>

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
                        <MainActionButton
                            isSuffixArrow={false}
                            type="submit"
                            className="self-center w-4/5 p-3 mt-10 bg-secondary-theme"
                            textColor="text-white "
                        >
                            Pay $420
                        </MainActionButton>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default CheckOutPage
