import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useContext, useRef, useState } from 'react'
import { ActionButton } from '../components'
import PopupContext from '../context/PopupContext'

const usePopup = () => {
    const {
        isPopupOpen,
        setIsPopupOpen,
        message,
        setMessage,
        confirmButtonMsg,
        setConfirmButtonMsg,
        setOnCloseFunc,
        onCloseFunc,
        hasCancelBtn,
        setHasCancelBtn
    } = useContext(PopupContext)

    const focusRef = useRef()

    const openPopupFunc = (msg, confirmButtonMsg, onClose, hasCancelBtn = false) => {
        setConfirmButtonMsg(confirmButtonMsg)
        setMessage(msg)
        setHasCancelBtn(hasCancelBtn)
        if (onClose) {
            setOnCloseFunc(() => onClose)
        }
        setIsPopupOpen(true)
    }

    const closePopupFunc = () => {
        setIsPopupOpen(false)
        if (onCloseFunc) {
            onCloseFunc()
            setOnCloseFunc(() => {})
        }
    }

    const cancelPopupFunc = () => {
        if (onCloseFunc) {
            setOnCloseFunc(() => {})
        }
        setIsPopupOpen(false)
    }

    const displayPopup = () => {
        if(hasCancelBtn){
            return (
                <Transition appear show={isPopupOpen} as={Fragment}>
                    <Dialog
                        initialFocus={focusRef}
                        as="div"
                        className="relative z-50"
                        onClose={cancelPopupFunc}
                    >
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
                                            {message}
                                        </Dialog.Title>
    
                                        <div className="w-full gap-4 mt-4 flex-center">
                                            <ActionButton
                                                ref={focusRef}
                                                type="button"
                                                active
                                                className="p-2 px-4 rounded-full"
                                                onClick={closePopupFunc}
                                            >
                                                {confirmButtonMsg}
                                            </ActionButton>
                                            <ActionButton
                                                ref={focusRef}
                                                type="button"
                                                className="p-2 px-4 rounded-full"
                                                onClick={cancelPopupFunc}
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
        } else {

        return (
            <Transition appear show={isPopupOpen} as={Fragment}>
                <Dialog
                    initialFocus={focusRef}
                    as="div"
                    className="relative z-50"
                    onClose={closePopupFunc}
                >
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
                                        {message}
                                    </Dialog.Title>

                                    <div className="w-full mt-4 flex-center">
                                        <ActionButton
                                            ref={focusRef}
                                            type="button"
                                            active
                                            className="p-2 px-4 rounded-full"
                                            onClick={closePopupFunc}
                                        >
                                            {confirmButtonMsg}
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
}

    return { isPopupOpen, openPopupFunc, closePopupFunc, displayPopup }
}

export default usePopup
