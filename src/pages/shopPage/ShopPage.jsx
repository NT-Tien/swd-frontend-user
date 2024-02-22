import React, {useState } from 'react'
import {
    ActionButton,
    CartItem,
    DropdownSelection,
    MainActionButton,
    PageBanner,
    ProductCard,
} from '../../components'
import SearchBar from '../../components/commons/SearchBar'
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    RowViewIcon,
    SquaresIcon,
} from '../../assets'
import {
    useQuery,
    keepPreviousData,
} from '@tanstack/react-query'
import {
    addProductToCart,
    addProductToWishlist,
    fetchCategories,
    fetchProducts,
} from '../../utils/api'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { displayImage } from '../../utils/helper'
import { useAuth } from '../../hooks/useAuth'

const ShopPage = () => {
    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    const [isCardDisplay, setIsCardDisplay] = useState(true)
    const [isSearching, setIsSearching] = useState(true)

    const { status, data, error } = useQuery({
        queryKey: ['products', page],
        queryFn: () => fetchProducts(page),
        placeholderData: keepPreviousData,
        staleTime: 3600000,
    })

    const {token }= useAuth()

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

    // func

    const handlePageDecrease = () => {
        if (page <= 1) return
        setPage((prev) => prev - 1)
    }

    const handlePageIncrease = () => {
        setPage((prev) => prev + 1)
    }

    const handleAddToCart = (productId) => {
        if (!token) return
        addProductToCart(productId, token)
    }

    const handleAddWishList = (productId) => {
        if (!token) return
        addProductToWishlist(productId, token)
    }

    const handleItemClick = (name) => {
        navigate(`/productDetails/${name}`)
    }

    const handleSearch = (name) => {
        if (name.trim() === '') {
            setIsSearching(false)
            return
        }

        setIsSearching(true)
    }

    return (
        <div className="flex flex-col px-20 ">
            <PageBanner title="Shop" />

            <section className="flex gap-4 min-h-svh">
                {/* dsplay */}
                <div className="flex flex-col flex-1 h-full gap-5">
                    {/* buttons */}

                    <div className="flex items-center justify-between w-full ">
                        <div className="flex gap-2">
                            <ActionButton
                                onClick={() => setIsCardDisplay(true)}
                                active={isCardDisplay}
                                className="p-1 rounded-md"
                            >
                                <SquaresIcon />
                            </ActionButton>
                            <ActionButton
                                onClick={() => setIsCardDisplay(false)}
                                active={!isCardDisplay}
                                className="p-1 rounded-md"
                            >
                                <RowViewIcon />
                            </ActionButton>
                        </div>
                        <div className="flex justify-center"></div>
                        <div className="z-10 flex justify-end">
                            <DropdownSelection />
                        </div>
                    </div>

                    {/* items */}
                    {isSearching ? (
                        <div className="flex-center h-full min-h-[50svh] w-full flex-col">
                            <div className="flex-col text-2xl flex-center">
                                <span>OOPS!</span>
                                <span>THERE ARE NO RESULTS.</span>
                            </div>
                            <MainActionButton
                                className="mt-4"
                                onClick={() => setIsSearching(false)}
                            >
                                Shop other items
                            </MainActionButton>
                        </div>
                    ) : (
                        <>
                            <div
                                className={clsx(
                                    'flex h-full min-h-[75svh] flex-1 gap-4',
                                    isCardDisplay ? 'flex-wrap' : 'flex-col'
                                )}
                            >
                                {isCardDisplay ? (
                                    <>
                                        {status === 'pending' ? (
                                            <div>Loading...</div>
                                        ) : status === 'error' ? (
                                            <div>Error: {error.message}</div>
                                        ) : (
                                            <>
                                                {data[0].map((product) => (
                                                    <ProductCard
                                                        key={product.id}
                                                        imgUrl={displayImage(
                                                            product.images[0]
                                                        )}
                                                        name={product.name}
                                                        price={
                                                            product
                                                                .optionProducts[0]
                                                                .price
                                                        }
                                                        onClick={() =>
                                                            handleItemClick(
                                                                product.name
                                                            )
                                                        }
                                                        addItemFunc={() =>
                                                            handleAddToCart(
                                                                product.id
                                                            )
                                                        }
                                                        addWishListFunc={() => {
                                                            handleAddWishList(
                                                                product.id
                                                            )
                                                        }}
                                                    />
                                                ))}
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {status === 'pending' ? (
                                            <div>Loading...</div>
                                        ) : status === 'error' ? (
                                            <div>Error: {error.message}</div>
                                        ) : (
                                            <>
                                                {data[0].map((product) => (
                                                    <div
                                                        className="w-full flex-center"
                                                        key={product.id}
                                                    >
                                                        <CartItem
                                                            imgUrl={displayImage(
                                                                product
                                                                    .images[0]
                                                            )}
                                                            name={product.name}
                                                            category={
                                                                product
                                                                    .category_id
                                                                    .name
                                                            }
                                                            price={
                                                                product
                                                                    .optionProducts[0]
                                                                    .price
                                                            }
                                                            onClick={() =>
                                                                handleItemClick(
                                                                    product.name
                                                                )
                                                            }
                                                            addItemFunc={() =>
                                                                handleAddToCart(
                                                                    product.id
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </>
                                )}
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
                            onSubmit={handleSearch}
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
                                {categoryData[0].map((cat, i) => (
                                    <div className="flex " key={cat.id}>
                                        <ActionButton className="px-2 py-1 rounded-full min-w-12">
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
