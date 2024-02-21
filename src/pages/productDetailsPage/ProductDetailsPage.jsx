import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ActionButton, Carousel, MainActionButton, PageBanner } from '../../components'
import { fetchProductByName, fetchProductOptionById } from '../../utils/api'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { DEFAULT_API_URL } from '../../config/api'

const ProductDetailsPage = () => {
    const { name } = useParams()

    const [chosenOption, setChosenOption] = useState(null)
    const [imgUrls, setImgUrls] = useState([])
    const {
        status,
        data: data,
        error,
    } = useQuery({
        queryKey: ['productByName', name],
        queryFn: () => fetchProductByName(name),
        placeholderData: keepPreviousData,
        staleTime: 3600000,
    })

    const productId = data?.id

    const {
        status: optionStatus,
        data: optionsData,
        error: optionError,
    } = useQuery({
        queryKey: ['productOptions', productId],
        queryFn: () => fetchProductOptionById(productId),
        placeholderData: keepPreviousData,
        enabled: !!productId,
        staleTime: 3600000,
    })

    useEffect(() => {
        if (optionsData) setChosenOption(optionsData[0])
    }, [optionsData])

    useEffect(() => {
        if (!data) return
        let imgUrlArray = []
        data.images.map((image) => {
            const id = image.replace('image/', (DEFAULT_API_URL + 'file/show/'))
            imgUrlArray.push(id)
        })
        setImgUrls(imgUrlArray)
    }, [data])

    return (
        <section className="flex flex-col min-h-screen px-20 text-secondary-theme">
            <PageBanner title='Details'/>
            <div className="flex h-full gap-4">
                {status === 'pending' ? (
                    <div>Loading...</div>
                ) : status === 'error' ? (
                    <div>Error: {error.message}</div>
                ) : (
                    <>
                        {/* image */}
                        <div className="relative w-1/3 h-full ">
                            <Carousel images={imgUrls} />
                        </div>
                        {/* name */}
                        <div className="flex flex-col justify-between w-2/3 h-96 min-h-max">
                            <div className="flex flex-col gap-4">
                                <h3 className="text-3xl uppercase">
                                    {data?.name}
                                </h3>
                                {/* description */}
                                <div><span className='font-medium'>Description: </span>{data?.description}</div>
                                {/* options */}
                                <div className="flex flex-col gap-2">
                                    <span className="font-medium">
                                        Options:
                                    </span>
                                    {optionStatus === 'pending' ? (
                                        <div>Loading...</div>
                                    ) : optionStatus === 'error' ? (
                                        <div>Error: {optionError.message}</div>
                                    ) : (
                                        <div className="flex gap-4">
                                            {optionsData?.map((option) => (
                                                <ActionButton
                                                    key={option.id}
                                                    active={
                                                        option.name ===
                                                        chosenOption?.name
                                                    }
                                                    className="p-1 px-2 rounded-full min-w-16"
                                                    onClick={() =>
                                                        console.log('click')
                                                    }
                                                >
                                                    {option.name}
                                                </ActionButton>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <span className="font-medium">
                                        Material:{' '}
                                    </span>
                                    {chosenOption?.material}
                                </div>
                            </div>

                            {/* price */}
                            <div className="flex flex-col gap-4">
                                <span className="text-5xl font-light">
                                    ${chosenOption?.price}
                                </span>
                                <MainActionButton className="w-max">
                                    Add to Cart
                                </MainActionButton>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default ProductDetailsPage
