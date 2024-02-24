import React, { useRef, useState } from 'react'
import {
    ActionButton,
    DropdownSelection,
    MainActionButton,
    PageBanner,
    ProductCard,
    SimpleLoading,
} from '../../components'
import SearchBar from '../../components/commons/SearchBar'
import {
    ArrowLeftIcon,
    ArrowRightIcon,
} from '../../assets'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import {
    addProductToCart,
    addProductToWishlist,
    fetchCategories,
    fetchProducts,
} from '../../utils/api'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import useCheckAuth from '../../hooks/useCheckAuth'
import usePopup from '../../hooks/usePopup'

const ShopPage = () => {
    const navigate = useNavigate()

    const { checkAuthFunction } = useCheckAuth()
    const { token } = useAuth()
    const { openPopupFunc, isPopupOpen, displayPopup } = usePopup()

    const [page, setPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [chosenCategoryId, setChosenCategoryId] = useState(null)

    const { status, data, error } = useQuery({
        queryKey: ['products', page],
        queryFn: () => fetchProducts(page),
        placeholderData: keepPreviousData,
        staleTime: 3600000,
    })

    const {
        status: categoryStatus,
        data: categoryData,
        error: categoryError,
    } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        placeholderData: keepPreviousData,
        staleTime: 3600000,
    })

    const sortOptions = [
        {
            value: '1',
            title: 'Newest to Oldest',
        },
        {
            value: '2',
            title: 'Oldest to Newest',
        },
        {
            value: '3',
            title: 'A to Z',
        },
        {
            value: '4',
            title: 'Z to A',
        },
    ]


    const searchBarRef = useRef()
    // func

    const handlePageDecrease = () => {
        if (page <= 1) return
        setPage((prev) => prev - 1)
    }

    const handlePageIncrease = () => {
        setPage((prev) => prev + 1)
    }

    const handleAddToCart = checkAuthFunction(
        async (productId, productName) => {
            if (!token) return
            await addProductToCart(productId, token)
            openPopupFunc(
                `${productName} is added to you cart`,
                'Got it, thanks!'
            )
        }
    )

    const handleAddWishList = checkAuthFunction((productId, productName) => {
        if (!token) return
        addProductToWishlist(productId, token)
        openPopupFunc(
            `${productName} is added to you wishlist`,
            'Got it, thanks!'
        )
    })

    const handleItemClick = (name) => {
        navigate(`/productDetails/${name}`)
    }

    const handleSearch = (name) => {
        setSearchValue(name.trim())
    }

    const clearSearchBar = () =>{
        searchBarRef.current.value = ''
        setSearchValue('')
    }

    const handleClickCategory = (catId) => {
        if (!catId) return
        if (catId === chosenCategoryId) {
            setChosenCategoryId(null)
            return
        }
        setChosenCategoryId(catId)
    }

    return (
        <div className="flex flex-col px-20 ">
            <PageBanner title="Shop" />

            <section className="flex gap-4 min-h-max">
                {/* dsplay */}
                <div className="flex flex-col flex-1 h-full gap-5">
                    {/* buttons */}

                    <div className="flex items-center justify-between w-full ">
                        <div className="flex gap-2">
                            <h5 className="text-lg font-semibold">
                                Displaying
                            </h5>

                        </div>

                        {/* sort */}
                        <div className="z-10 flex justify-end">
                            <DropdownSelection options={sortOptions}>
                                Sort Options
                            </DropdownSelection>
                        </div>
                    </div>

                    {/* items */}
                    {searchValue ? (
                        <div className="flex-center h-full min-h-[50svh] w-full flex-col">
                            <div className="flex-col text-2xl flex-center">
                                <span>OOPS!</span>
                                <span>THERE ARE NO RESULTS FOR {searchValue}.</span>
                            </div>
                            <MainActionButton
                                className="mt-4"
                                onClick={clearSearchBar}
                            >
                                Shop other items
                            </MainActionButton>
                        </div>
                    ) : (
                        <>
                            <div
                                className={clsx(
                                    'flex h-full min-h-max flex-1 flex-wrap gap-4'
                                )}
                            >
                                <>
                                    {status === 'pending' ? (
                                        <SimpleLoading />
                                    ) : status === 'error' ? (
                                        <div>Error: {error.message}</div>
                                    ) : (
                                        <>
                                            {data[0].map((product) => (
                                                <ProductCard
                                                    key={product.id}
                                                    product={product}
                                                    onClick={() =>
                                                        handleItemClick(
                                                            product.name
                                                        )
                                                    }
                                                    addItemFunc={() =>
                                                        handleAddToCart(
                                                            product.id,
                                                            product.name
                                                        )
                                                    }
                                                    addWishListFunc={() => {
                                                        handleAddWishList(
                                                            product.id,
                                                            product.name
                                                        )
                                                    }}
                                                />
                                            ))}
                                        </>
                                    )}
                                </>
                            </div>
                        </>
                    )}

                    <div className="flex items-end self-end justify-center gap-4 justify-self-end ">
                        <ActionButton
                            disabled={page === 1}
                            onClick={handlePageDecrease}
                        >
                            <ArrowLeftIcon />
                        </ActionButton>
                        <span>page: {page}</span>
                        <ActionButton
                            disabled={data && data[1] <= page * 9}
                            onClick={handlePageIncrease}
                        >
                            <ArrowRightIcon />
                        </ActionButton>
                    </div>
                </div>

                {/* right category bar */}
                <div className="flex flex-col h-full px-1 min-w-80 ">
                    <div className="w-full mb-4">
                        <SearchBar
                            ref={searchBarRef}
                            onChange={handleSearch}
                            placeholder="Search..."
                        />
                    </div>
                    <h1 className="mb-2 text-xl font-semibold">Category</h1>
                    <div className="flex flex-wrap gap-2 divide-secondary-theme/40">
                        {categoryStatus === 'pending' ? (
                            <div>Loading...</div>
                        ) : categoryStatus === 'error' ? (
                            <div>Error: {categoryError.message}</div>
                        ) : (
                            <>
                                {categoryData[0].map((cat) => (
                                    <div className="flex " key={cat.id}>
                                        <ActionButton
                                            active={cat.id === chosenCategoryId}
                                            onClick={() =>
                                                handleClickCategory(cat.id)
                                            }
                                            className="px-2 py-1 rounded-full min-w-12"
                                        >
                                            {cat.name}
                                        </ActionButton>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ShopPage
