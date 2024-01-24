import React from 'react'
import { DropdownSelection, PageBanner } from '../../components'
import SearchBar from '../../components/commons/SearchBar'
import { RowViewIcon, SquaresIcon } from '../../assets'

const ShopPage = () => {
    return (
        <>
            <PageBanner title="Shop" />
            <section className="grid grid-cols-4 gap-4 px-20 py-10 min-h-svh auto-rows-max">
                <div className="grid items-center w-full col-span-4 grid-cols-subgrid auto-rows-max">
                    <div className="flex col-span-1 gap-2">
                        <button className="p-1 border rounded-sm aspect-square border-secondary-theme">
                            <SquaresIcon />
                        </button>
                        <button className="p-1 border rounded-sm aspect-square border-secondary-theme">
                            <RowViewIcon />
                        </button>
                    </div>
                    <div className="flex justify-center col-span-1">
                        asdasdsd
                    </div>
                    <div className="flex justify-end col-span-1">
                        <DropdownSelection />
                    </div>

                    <div className="col-span-1">
                        <SearchBar placeholder="Search..." />
                    </div>
                </div>
                <div className="col-span-3"></div>
                {/* right category bar */}
                <div className="flex flex-col col-span-1">
                    <h1>Category</h1>
                    <div>
                        <p>asdasdsdsdasd</p>
                        <p>asdasdsd</p>
                        <p>asdasdsd</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShopPage
