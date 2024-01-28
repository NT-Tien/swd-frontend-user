import React, { Fragment, useEffect } from 'react'

import { Popover, Transition } from '@headlessui/react'
import {  UserIcon } from '../../assets'
import CustomLink from '../commons/CustomLink'

const SettingModal = () => {
    

    return (
        <Popover >
            <Popover.Button className="relative flex-center">
                <UserIcon />
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
                <Popover.Panel className="absolute right-0 z-10 top-14">
                    <div className="flex flex-col items-start justify-center px-6 py-3 text-lg border shadow-lg border-secondary-theme bg-primary-bg-color">
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

                        <CustomLink
                            className="font-normal"
                            active={false}
                            underlineWidth="h-[1px]"
                            to="#"
                        >
                            Check out
                        </CustomLink>

                        <CustomLink
                            className="font-normal"
                            active={false}
                            underlineWidth="h-[1px]"
                            to="#"
                        >
                            Wish list
                        </CustomLink>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default SettingModal
