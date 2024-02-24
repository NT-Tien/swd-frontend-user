import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainActionButton, PageBanner, SimpleLoading } from '../../components'
import { verifyAppointment } from '../../utils/api'
import { Dialog, Transition } from '@headlessui/react'

const VerifyBookingPage = () => {
    const navigate = useNavigate()

    const [verifyCode, setVerifyCode] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const [countdown, setCountdown] = useState(3)

    const handleVerifyCode = async (e) => {
        e.preventDefault()

        setIsLoading(true)

        if (verifyCode === '') {
            setErrorMsg('Please enter your code')
            return
        }
        if (isNaN(verifyCode)) {
            setErrorMsg('Please enter a valid 6-digit code')
            return
        }
        const result = await verifyAppointment(verifyCode)
        console.log(result)
        if (result.statusCode === 200) {
            setVerifyCode('')
            setErrorMsg('')
            setOpenConfirmModal(true)
        } else {
            setErrorMsg('The code you have just entered is not correct!')
        }

        setIsLoading(false)
    }

    const closeModal = (value) => {
        setOpenConfirmModal(value)
        navigate('/booking', { replace: true })
    }

    useEffect(() => {
        if (!openConfirmModal) {
            setCountdown(3)
            return
        }
        setTimeout(() => {
            if (countdown > 0) {
                setCountdown((prev) => prev - 1)
            } else {
                closeModal(false)
            }
        }, 1000)
    }, [openConfirmModal, countdown])

    return (
        <section className="flex min-h-[60svh]  w-full flex-col px-20">
            <PageBanner title="Verify Booking" />

            <div className="flex-col flex-center min-w-fit ">
                <div className="px-8 py-4 border shadow-lg border-secondary-theme/50">
                    <h5
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 underline"
                    >
                        Confirm booking appointment
                    </h5>

                    <form
                        onSubmit={handleVerifyCode}
                        className="flex flex-col gap-2 mt-2 "
                    >
                        <label
                            htmlFor="code"
                            className="text-sm text-gray-500 "
                        >
                            Please enter a 6-digit code sent to your email here.
                        </label>
                        <input
                            type="tel"
                            onChange={(e) => setVerifyCode(e.target.value)}
                            value={verifyCode}
                            minLength={6}
                            maxLength={6}
                            name="code"
                            autoComplete="off"
                            autoCorrect="off"
                            placeholder="Verify code..."
                            className="block w-full p-3 text-sm text-gray-900 border rounded-full border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                            required
                        />
                        <div className="font-medium text-red-600">
                            {errorMsg}
                        </div>
                        {isLoading && <SimpleLoading />}
                        <div className="self-center mt-4">
                            <MainActionButton type="submit">
                                Confirm booking
                            </MainActionButton>
                        </div>
                    </form>
                </div>
            </div>

            <Transition appear show={openConfirmModal} as={Fragment}>
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
                                <Dialog.Panel className="flex flex-col items-center justify-between max-w-4xl p-6 overflow-hidden text-left align-middle transition-all transform rounded-sm shadow-xl min-h-fit w-max min-w-fit bg-primary-bg-color">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-secondary-theme"
                                    >
                                        Confirm appointment successfully
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-secondary-theme">
                                            Your appointment with us has been
                                            confirmed.
                                        </p>
                                        <p className="text-sm text-secondary-theme">
                                            You will be directed back to the
                                            main page in{' '}
                                            <span className="text-lg font-semibold">
                                                {countdown}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <MainActionButton
                                            isSuffixArrow={false}
                                            type="button"
                                            disabled={isLoading}
                                            onClick={closeModal}
                                        >
                                            Got it, thanks!
                                        </MainActionButton>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </section>
    )
}

export default VerifyBookingPage
