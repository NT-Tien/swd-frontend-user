import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import React, { Fragment } from 'react'
import { ChevronDown } from '../../assets'

const DropdownSelection = ({ options, children, onChange }) => {
    const defaultOptions = Array.from({ length: 20 }, (_, index) => ({
        value: index + 1,
        title: index + 1,
    }))

    const handleOnChange = (value) => {
        if (onChange) {
            onChange(value)
        }
    }

    return (
        <div className="max-w-fit">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button
                        as="button"
                        className={clsx(
                            'flex-center w-max gap-2 rounded-full border border-secondary-theme bg-transparent p-2 px-4 text-sm font-medium text-secondary-theme transition-all duration-300 hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-theme/75'
                        )}
                    >
                        {children}
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
                    <Menu.Items className="absolute right-0 z-20 w-full mt-2 origin-top-right border divide-y divide-gray-100 rounded-md shadow-lg min-w-max border-secondary-theme/50 bg-primary-bg-color ring-1 ring-black/5 focus:outline-none">
                        <div className="p-1 overflow-y-auto max-h-80">
                            {options
                                ? options.map((option, i) => (
                                      <Menu.Item key={i}>
                                          {({ active }) => (
                                              <button
                                                  onClick={() =>
                                                      handleOnChange(
                                                          option
                                                      )
                                                  }
                                                  className={`${
                                                      active
                                                          ? 'bg-secondary-theme/60 text-neutral-100'
                                                          : 'text-gray-900'
                                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
                                              >
                                                  {option.title}
                                              </button>
                                          )}
                                      </Menu.Item>
                                  ))
                                : defaultOptions.map((option, i) => (
                                      <Menu.Item key={i}>
                                          {({ active }) => (
                                              <button
                                                  onClick={() =>
                                                      handleOnChange(
                                                          option.value
                                                      )
                                                  }
                                                  className={`${
                                                      active
                                                          ? 'bg-secondary-theme/60 text-neutral-100'
                                                          : 'text-gray-900'
                                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors`}
                                              >
                                                  {option.title}
                                              </button>
                                          )}
                                      </Menu.Item>
                                  ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default DropdownSelection
