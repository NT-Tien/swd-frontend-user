import React, { forwardRef } from 'react'
import { MagnifyingGlassIcon } from '../../assets'
import UseDebounce from '../../hooks/UseDebounce'

const SearchBar = forwardRef(({ placeholder, onChange }, ref) => {
    const handleChangeDebounce = UseDebounce((e) => {
        e.preventDefault()
        onChange(e.target.value)
    }, 500)

    const handleSubmit = (e) => {
       e.preventDefault()
       onChange(e.target.value) 
    }

    return (
        <form onSubmit={handleSubmit}>
            <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
                Search
            </label>
            <div className="relative">
                {/* <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                    
                </div> */}
                <input
                    ref={ref}
                    type="search"
                    id="default-search"
                    className="block w-full p-3 text-sm text-gray-900 border rounded-full border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                    placeholder={placeholder}
                    onChange={handleChangeDebounce}
                />
                <button
                    type="submit"
                    className="absolute top-0 bottom-0 right-0 m-2 text-sm font-medium text-white rounded-full flex-center aspect-square bg-secondary-theme hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-secondary-bg-color"
                >
                    <MagnifyingGlassIcon />
                </button>
            </div>
        </form>
    )
})

export default SearchBar
