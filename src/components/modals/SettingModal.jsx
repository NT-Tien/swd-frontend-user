import React, { Fragment, useEffect, useState } from 'react'

import { Popover, Transition } from '@headlessui/react'
import { UserCircleIcon, UserIcon } from '../../assets'
import CustomLink from '../commons/CustomLink'
import { auth } from '../../config/firebase'
import { useAuth } from '../../hooks/useAuth'

const SettingModal = () => {
    const {logoutHook, user, token} = useAuth()
    const handleLogout = () => {

        logoutHook()

        if (auth && auth.currentUser) {
            signOut(auth)
                .then(() => {
                    console.log('User signed out')
                })
                .catch((error) => {
                    console.error('Error signing out:', error)
                })
        } 


    }

    return (
        <Popover>
            <Popover.Button className="relative flex-center">
                {user ?  (user.photoURL ? (
                    <div className="w-6 h-6 overflow-hidden rounded-full aspect-square">
                        <img
                            src={user.photoURL}
                            className="object-cover w-full h-full" 
                        />
                    </div>
                ) : (
                    <UserCircleIcon />
                )): (
                    <UserIcon />
                    
                )}
            </Popover.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute z-10 right-2 top-14">
                    <div className="flex flex-col items-start justify-center px-6 py-3 text-lg border shadow-lg border-secondary-theme bg-primary-bg-color">
                        {user ? (
                            <>
                                <CustomLink
                                    className="font-normal"
                                    active={false}
                                    underlineWidth="h-[1px]"
                                    to="/checkout"
                                >
                                    Check out
                                </CustomLink>

                                <CustomLink
                                    className="font-normal"
                                    active={false}
                                    underlineWidth="h-[1px]"
                                    to="/wishlist"
                                >
                                    Wish list
                                </CustomLink>

                                <CustomLink
                                    className="font-normal"
                                    active={false}
                                    underlineWidth="h-[1px]"
                                    to="/cart"
                                >
                                    Cart
                                </CustomLink>

                                <CustomLink
                                    className="font-normal"
                                    to='/'
                                    active={false}
                                    underlineWidth="h-[1px]"
                                    onClick={handleLogout}
                                >
                                    Log out
                                    
                                </CustomLink>
                            </>
                        ) : (
                            <>
                                <CustomLink
                                    className="font-normal"
                                    underlineWidth="h-[1px]"
                                    to="/login"
                                >
                                    Log in
                                </CustomLink>
                                <CustomLink
                                    className="font-normal"
                                    underlineWidth="h-[1px]"
                                    to="/signup"
                                >
                                    Sign up
                                </CustomLink>
                            </>
                        )}
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default SettingModal
