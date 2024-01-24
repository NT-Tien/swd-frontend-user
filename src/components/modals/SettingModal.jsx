import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { GearIcon } from '../../assets'
import CustomLink from '../commons/CustomLink'

const SettingModal = () => {
    return (
        <Popover className="">
            <Popover.Button className="relative flex-center">
                <GearIcon />
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
                <Popover.Panel className="absolute z-10 top-14 ">
                    <div className="flex flex-col items-start justify-center px-6 py-3 text-lg border shadow-lg bg-primary-bg-color border-secondary-theme">
                        <CustomLink className='font-normal' active={false} underlineWidth="h-[1px]" to="#">
                            Log in
                        </CustomLink>
                        <CustomLink className='font-normal' active={false} underlineWidth="h-[1px]" to="#">
                            Sign in
                        </CustomLink>

                        <CustomLink className='font-normal' active={false} underlineWidth="h-[1px]" to="#">
                            Check out
                        </CustomLink>

                        <CustomLink className='font-normal' active={false} underlineWidth="h-[1px]" to="#">
                            Wish list
                        </CustomLink>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default SettingModal
