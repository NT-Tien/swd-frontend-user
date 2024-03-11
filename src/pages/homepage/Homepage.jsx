import React from 'react'
import {
    LandingPageCollections,
    LandingPageImages,
    MainActionLink,
    ProductCard,
} from '../../components'
import { useNavigate } from 'react-router-dom'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchProducts } from '../../utils/api'

const HomePage = () => {
    const navigate = useNavigate()

    const { status, data, error } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetchProducts(4, 1),
        placeholderData: keepPreviousData,
        staleTime: 3600000,
    })

    const handleItemClick = (name) => {
        navigate(`/productDetails/${name}`)
    }
    return (
        <>
            <section className="flex flex-col w-full h-full gap-10 overflow-hidden bg-primary-bg-color">
                {/* landing image */}

                <LandingPageImages />

                {/* new product section*/}
                <div className="flex flex-col items-center w-full h-max gap-4 px-[5svw] bg-transparent">
                    <p className="text-lg uppercase">
                        &#11834; Our Collections &#11834;
                    </p>
                    {/* products */}

                    <LandingPageCollections />

                    <MainActionLink to="/shop">
                        Explore collection
                    </MainActionLink>
                </div>
                <div className="flex flex-col items-center w-full gap-4 px-[5svw] bg-transparent">
                    <p className="text-lg uppercase">
                        &#11834; Our Products &#11834;
                    </p>
                    <div className="flex flex-wrap items-center w-full gap-4">
                        {status === 'pending' ? (
                            <div>Loading...</div>
                        ) : status === 'error' ? (
                            <div>Error: {error.message}</div>
                        ) : (
                            <>
                                {data[0].map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onClick={() =>
                                            handleItemClick(product.name)
                                        }
                                    />
                                ))}
                            </>
                        )}
                    </div>
                    <MainActionLink to="/shop">Shop with us</MainActionLink>
                </div>
            </section>
        </>
    )
}

export default HomePage
