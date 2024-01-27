import React from 'react'
import {
    ActionButton,
    DropdownSelection,
    PageBanner,
    ProductCard,
} from '../../components'
import SearchBar from '../../components/commons/SearchBar'
import { RowViewIcon, SquaresIcon } from '../../assets'

const ShopPage = () => {
    return (
        <>
            <PageBanner title="Shop" />
            <section className="grid grid-cols-4 gap-4 px-20 py-10 min-h-svh auto-rows-max">
                <div className="grid items-center w-full col-span-4 auto-rows-max grid-cols-subgrid">
                    <div className="flex col-span-1 gap-2">
                        <ActionButton className='p-1 rounded-md'>
                            <SquaresIcon />
                        </ActionButton>
                        <ActionButton className='p-1 rounded-md'>
                            <RowViewIcon />
                        </ActionButton>
                    </div>
                    <div className="flex justify-center col-span-1">
                        asdasdsd
                    </div>
                    <div className="z-10 flex justify-end col-span-1">
                        <DropdownSelection />
                    </div>

                    <div className="col-span-1">
                        <SearchBar placeholder="Search..." />
                    </div>
                </div>
                <div className="grid grid-cols-1 col-span-3 gap-5 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="flex-center">
                        <ProductCard name="Chair" price="$100" />
                    </div>
                    <div className="flex-center">
                        <ProductCard name="Chair" price="$100" />
                    </div>
                    <div className="flex-center">
                        <ProductCard name="Chair" price="$100" />
                    </div>
                    <div className="flex-center">
                        <ProductCard name="Chair" price="$100" />
                    </div>
                    <div className="flex-center">
                        <ProductCard name="Chair" price="$100" />
                    </div>
                </div>
                {/* right category bar */}
                <div className="flex flex-col col-span-1 px-1 py-2">
                    <h1 className="mb-2 text-xl font-semibold">Category</h1>
                    <div className="flex flex-wrap gap-2 divide-secondary-theme/40">
                        <div className="flex ">
                            <ActionButton className='px-2 py-1 rounded-full'>Chair</ActionButton>
                        </div>
                        <div className="flex ">
                            <ActionButton className='px-2 py-1 rounded-full'>Chair</ActionButton>
                        </div>
                        <div className="flex ">
                            <ActionButton className='px-2 py-1 rounded-full'>Chair</ActionButton>
                        </div>
                        <div className="flex ">
                            <ActionButton className='px-2 py-1 rounded-full'>Chair</ActionButton>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShopPage
