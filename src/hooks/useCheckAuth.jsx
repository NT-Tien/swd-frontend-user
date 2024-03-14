import React, { Fragment, useState } from 'react'
import { useAuth } from './useAuth'
import { Dialog, Transition } from '@headlessui/react'
import { ActionButton } from '../components'
import {useNavigate} from 'react-router-dom'

const useCheckAuth = () => {
    const { isLoggedIn, isOpenCheckModal, setIsOpenCheckModal } = useAuth()
    const navigate = useNavigate()
    const openCheckModal = () => {
        setIsOpenCheckModal(true)
    }

    const closeModal = () => {
        setIsOpenCheckModal(false)
    }

    const headToLogin = () => {
        
        setIsOpenCheckModal(false)
        navigate('/login')
    }

    const checkAuthFunction = (callback) => {
        return (...arg) => {
            if (!isLoggedIn) {
                openCheckModal()
            } else {
                callback(...arg)
            }
        }
    }

    const displayLoginCheckMessage = () => {
        return (
            <Transition appear show={isOpenCheckModal} as={Fragment}>
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
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden transition-all transform shadow-xl min-w-fit bg-primary-bg-color text-secondary-theme">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 "
                                    >
                                        You need to log in to use this function
                                    </Dialog.Title>

                                    <div className="w-full gap-4 mt-4 flex-center">
                                        <ActionButton
                                            type="button"
                                            active
                                            className="p-2 px-4 rounded-full"
                                            onClick={headToLogin}
                                        >
                                            Head to log in
                                        </ActionButton>
                                        <ActionButton
                                            type="button"
                                            active
                                            className="p-2 px-4 rounded-full"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </ActionButton>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        )
    }

    return {
        isLoggedIn,
        displayLoginCheckMessage,
        openCheckModal,
        checkAuthFunction,
    }
}

export default useCheckAuth
