import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import MainActionLink from '../commons/buttons/MainActionLink'

const CartModal = ({ isOpen, closeModalFunction  }) => {

    const closeModal = () => {
        if(closeModalFunction) {
            closeModalFunction()
        }
    }



  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="flex flex-col items-center justify-between w-full max-w-4xl p-6 overflow-hidden text-left align-middle transition-all transform rounded-sm shadow-xl min-h-96 bg-primary-bg-color">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-center text-gray-900 "
                  >
                    <span className='underline uppercase'>Your cart's items</span> 
                  </Dialog.Title>
                  <button type='button' onClick={closeModal} className='absolute text-lg top-4 right-4'>&#10005; Close</button>
                  <div className="mt-4 ">
                    <p className="text-sm text-center text-gray-500">
                        There's currently no item in your cart
                    </p>
                  </div>

                  <div className="mt-4 flex-center">
                    <MainActionLink onClick={closeModalFunction} to='/shop'>continue shopping</MainActionLink>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}

export default CartModal