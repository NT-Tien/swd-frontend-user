import React from 'react'

const ProductCard = ({
    imgUrl = './src/assets/pictures/chair-6-side.png',
    price,
    name,
    className,
}) => {
    return (
        <div
            className={`${className} rounded-sm relative flex aspect-[5/7] h-fit w-80 max-w-96 flex-col items-center justify-between overflow-hidden bg-secondary-bg-color transition-all duration-300 hover:shadow-xl`}
        >
            <div className="relative w-full h-full ">
                <img
                    src={imgUrl}
                    className="absolute bottom-0 object-cover w-full h-auto"
                />
            </div>
            {/* details */}
            <div className="flex flex-col w-full gap-0 px-5 py-2 font-extralight">
                <span className="w-full text-xl leading-none">
                    {name} &#11834;
                </span>
                <span className="w-full text-3xl">{price}</span>
            </div>
        </div>
    )
}

export default ProductCard
