import React, { useEffect, useState } from 'react'
import {
    ActionButton,
    DropdownSelection,
    PageBanner,
    ProductCard,
} from '../../components'
import SearchBar from '../../components/commons/SearchBar'
import { RowViewIcon, SquaresIcon } from '../../assets'
import {
    useQuery,
    useQueryClient,
    keepPreviousData,
} from '@tanstack/react-query'
import { fetchCategories, fetchProducts } from '../../utils/api'

const ShopPage = () => {
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1)

    const { status, data, error, isFetching, isPlaceholderData } = useQuery({
        queryKey: ['products', page],
        queryFn: () => fetchProducts(page),
        placeholderData: keepPreviousData,
        staleTime: 5000,
    })

    const { categoryStatus, categoryData, categoryError, categoryIsFetching, categoryIsPlaceholderData } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategories(),
        placeholderData: keepPreviousData,
        staleTime: 5000,
    })

    // useeffect

    useEffect(() => {
        //prefetch next page
        if (!isPlaceholderData && data?.hasMore) {
            queryClient.prefetchQuery({
                queryKey: ['products', page + 1],
                queryFn: () => fetchProducts(page + 1),
            })
        }
        console.log('fetch products : ', data)
        console.log('fetch categories : ', categoryData)

    }, [data, isPlaceholderData, page, queryClient])

    return (
        <>
            <PageBanner title="Shop" />
            <section className="grid grid-cols-4 gap-4 px-20 py-10 min-h-svh auto-rows-max">
                <div className="grid items-center w-full col-span-4 auto-rows-max grid-cols-subgrid">
                    <div className="flex col-span-1 gap-2">
                        <ActionButton className="p-1 rounded-md">
                            <SquaresIcon />
                        </ActionButton>
                        <ActionButton className="p-1 rounded-md">
                            <RowViewIcon />
                        </ActionButton>
                    </div>
                    <div className="flex justify-center col-span-1"></div>
                    <div className="z-10 flex justify-end col-span-1">
                        <DropdownSelection />
                    </div>

                    <div className="col-span-1">
                        <SearchBar placeholder="Search..." />
                    </div>
                </div>
                <div className="grid grid-cols-1 col-span-3 gap-5 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {status === 'pending' ? (
                        <div>Loading...</div>
                    ) : status === 'error' ? (
                        <div>Error: {error.message}</div>
                    ) : (
                        <>
                            {data[0].map((product) => (
                                <div className="flex-center" key={product.id}>
                                    <ProductCard
                                        imgUrl={product.images}
                                        name={product.name}
                                        price="$100"
                                    />
                                </div>
                            ))}
                        </>
                    )}
                </div>
                {/* right category bar */}
                <div className="flex flex-col col-span-1 px-1 py-2">
                    <h1 className="mb-2 text-xl font-semibold">Category</h1>
                    <div className="flex flex-wrap gap-2 divide-secondary-theme/40">
                        {
                        }
                        <div className="flex ">
                            <ActionButton className="px-2 py-1 rounded-full">
                                Chair
                            </ActionButton>
                        </div>
                        <div className="flex ">
                            <ActionButton className="px-2 py-1 rounded-full">
                                Chair
                            </ActionButton>
                        </div>
                        <div className="flex ">
                            <ActionButton className="px-2 py-1 rounded-full">
                                Chair
                            </ActionButton>
                        </div>
                        <div className="flex ">
                            <ActionButton className="px-2 py-1 rounded-full">
                                Chair
                            </ActionButton>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShopPage
