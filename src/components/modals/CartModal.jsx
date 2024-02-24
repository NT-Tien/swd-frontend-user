import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import MainActionLink from '../commons/buttons/MainActionLink'
import CartItem from '../commons/CartItem'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchCartItems, removeProductFromCart } from '../../utils/api'
import { useAuth } from '../../hooks/useAuth'
import SimpleLoading from '../commons/loading/SimpleLoading'
import usePopup from '../../hooks/usePopup'

const CartModal = ({ isOpen, closeModalFunction }) => {
    const [page, setPage] = useState(1)
    const { openPopupFunc} = usePopup()

    const { token, isLoggedIn } = useAuth()
    const { status, data, error, refetch } = useQuery({
        queryKey: ['cart', page, token],
        queryFn: () => fetchCartItems(9, page, token),
        placeholderData: keepPreviousData,
        enabled: false,
        staleTime: 180000,
    })

    const closeModal = () => {
        if (closeModalFunction) {
            closeModalFunction()
        }
    }

    const removeItem = async (id, name) => {
        if (!token) return
        await removeProductFromCart(id, token)
        openPopupFunc(`${name} is removed from your cart`, 'Got it, thanks!')
        await refetch()
    }

    useEffect(() => {
        if (isOpen && isLoggedIn) {
            refetch()
        }
    }, [isOpen, refetch, isLoggedIn])

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <>
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/35 backdrop-blur-[2px] " />
                </Transition.Child>

                <div className="fixed inset-0">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="flex max-h-[90svh] min-h-96 w-full max-w-4xl transform flex-col items-center justify-between overflow-y-auto overflow-x-hidden rounded-sm bg-primary-bg-color p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="mb-2 text-lg font-medium leading-6 text-center text-gray-900 "
                                >
                                    <span className="underline uppercase">
                                        Your cart's items
                                    </span>
                                </Dialog.Title>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="absolute text-lg right-4 top-4"
                                >
                                    <span className="text-xl">&#10005;</span>{' '}
                                    Close
                                </button>

                                {status === 'pending' ? (
                                    <>
                                        <div className="mt-4 ">
                                            <SimpleLoading />
                                        </div>

                                        <div className="mt-4 flex-center">
                                            <MainActionLink
                                                onClick={closeModalFunction}
                                                to="/shop"
                                            >
                                                continue shopping
                                            </MainActionLink>
                                        </div>
                                    </>
                                ) : status === 'error' ? (
                                    <>
                                        <div className="mt-4 ">
                                            <p className="text-sm text-center text-gray-500">
                                                {error.message}
                                            </p>
                                        </div>

                                        <div className="mt-4 flex-center">
                                            <MainActionLink
                                                onClick={closeModalFunction}
                                                to="/shop"
                                            >
                                                continue shopping
                                            </MainActionLink>
                                        </div>
                                    </>
                                ) : data.length > 0 ? (
                                    <>
                                        <div className="flex flex-col w-full gap-2 overflow-y-auto">
                                            {data.map((item) => (
                                                <CartItem
                                                    key={item.product?.id}
                                                    product={item.product}
                                                    removeItemFunc={() =>
                                                        removeItem(
                                                            item.product?.id, item.product?.name
                                                        )
                                                    }
                                                />
                                            ))}
                                        </div>

                                        <div className="mt-4 flex-center">
                                            <MainActionLink
                                                onClick={closeModalFunction}
                                                to="/checkout"
                                            >
                                                proceed to checkout
                                            </MainActionLink>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="mt-4 ">
                                            <p className="text-sm text-center text-gray-500">
                                                There's currently no item in
                                                your cart
                                            </p>
                                        </div>

                                        <div className="mt-4 flex-center">
                                            <MainActionLink
                                                onClick={closeModalFunction}
                                                to="/shop"
                                            >
                                                continue shopping
                                            </MainActionLink>
                                        </div>
                                    </>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
        </>
    )
}

export default CartModal
