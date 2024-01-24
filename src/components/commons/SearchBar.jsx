import React from 'react'
import { MagnifyingGlassIcon } from '../../assets';

const SearchBar = ({onSubmit, placeholder}) => {

    const handleSubmit = (event) => {
        event.preventDefault();

        if(onSubmit) {
            onSubmit()
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label
                for="default-search"
                class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Search
            </label>
            <div class="relative">
                {/* <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                    
                </div> */}
                <input
                    type="search"
                    id="default-search"
                    class="block w-full rounded-full border border-secondary-theme bg-primary-bg-color p-3 ps-4 text-sm text-gray-900 focus:ring-secondary-theme"
                    placeholder={placeholder}
                    required
                />
                <button
                    type="submit"
                    class="absolute m-2 flex-center aspect-square right-0 top-0 bottom-0 rounded-full bg-secondary-theme text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-secondary-bg-color"
                >
                    <MagnifyingGlassIcon />
                </button>
            </div>
        </form>
    )
}

export default SearchBar
