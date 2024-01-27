import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import React, { Fragment } from 'react'
import { ChevronDown } from '../../assets'

const DropdownSelection = () => {
    return (
        <div className="max-w-fit">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button
                        as="button"
                        className={clsx(
                            'flex-center w-full gap-2 rounded-full border border-secondary-theme bg-transparent p-3 px-4 text-sm font-medium text-black transition-all duration-300 hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-theme/75'
                        )}
                    >
                        Options
                        <ChevronDown />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right border divide-y divide-gray-100 rounded-md shadow-lg border-secondary-theme/50 bg-primary-bg-color ring-1 ring-black/5 focus:outline-none">
                        <div className="p-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active
                                                ? 'bg-secondary-theme/60 text-neutral-100'
                                                : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
                                    >
                                        Newest to Oldest
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active
                                                ? 'bg-secondary-theme/60 text-neutral-100'
                                                : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
                                    >
                                        Oldest to Newest
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active
                                                ? 'bg-secondary-theme/60 text-neutral-100'
                                                : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
                                    >
                                        Lowest Price First
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active
                                                ? 'bg-secondary-theme/60 text-neutral-100'
                                                : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
                                    >
                                        Highest Price First
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active
                                                ? 'bg-secondary-theme/60 text-neutral-100'
                                                : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
                                    >
                                        A-Z
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${
                                            active
                                                ? 'bg-secondary-theme/60 text-neutral-100'
                                                : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
                                    >
                                        Z-A
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default DropdownSelection
