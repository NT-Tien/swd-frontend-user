import React, { useEffect } from 'react'
import { MagnifyingGlassIcon } from '../../assets';
import UseDebounce from '../../hooks/UseDebounce';
import { useState } from 'react';

const SearchBar = ({onSubmit, placeholder}) => {

    const [value, setValue] = useState('')


    const handleSubmit = () => {

        if(onSubmit) {
            onSubmit(value)
        }
    }

    const handleChange = UseDebounce((e)=>{
        setValue(e.target.value)
    }, 1000)

    useEffect(()=>{ 
        handleSubmit()
    },[value])

   

    

    return (
        <form>
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
                    type="search"
                    id="default-search"
                    className="block w-full p-3 text-sm text-gray-900 border rounded-full border-secondary-theme bg-primary-bg-color ps-4 focus:ring-secondary-theme"
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value}
                    required
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
}

export default SearchBar
