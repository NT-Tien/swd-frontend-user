import React from 'react'
import {
    CustomLink,
    LandingPageImages,
    MainActionLink,
    ProductCard,
} from '../../components'

const HomePage = () => {
    const productLoop = [1, 2, 3, 4]

    const collectionCardStyle =
        'relative overflow-hidden border-[0.75rem] rounded border-secondary-bg-color hover:shadow-lg transition-all duration-500 group'

    return (
        <>
            <section className="flex flex-col w-full h-full gap-10 overflow-hidden bg-primary-bg-color">
                {/* landing image */}
                <div className="relative flex w-full overflow-hidden h-svh">
                    {/* carousel img */}

                    <LandingPageImages />

                    <div className="absolute top-0 left-0 flex flex-col justify-center w-full h-full px-20 pt-10 text-white gap-7 bg-secondary-theme bg-opacity-35">
                        <div className="font-light text-7xl">
                            <p>Discover your </p>
                            <p>Dream home</p>
                        </div>
                        <div className="text-xl uppercase">
                            <p>Discover a world of elegance </p>
                            <p>Elevate your living spaces</p>
                            <p>Radiate style and personality</p>
                        </div>
                        <div className="w">
                            <MainActionLink
                                to="/shop"
                                textColor="text-secondary"
                                className="border-secondary-theme bg-secondary-theme"
                                arrowColor="text-secondary-theme bg-white font-thin"
                            >
                                explore collection
                            </MainActionLink>
                        </div>
                    </div>
                </div>

                {/* new product section*/}
                <div className="flex flex-col items-center w-full gap-4 px-20 bg-transparent">
                    <p className="text-lg uppercase">
                        &#11834; Our Collections &#11834;
                    </p>
                    {/* products */}

                    <div className="grid grid-cols-4 gap-5 h-max ">
                        <div
                            className={`${collectionCardStyle} col-span-1 aspect-square`}
                        >
                            <img
                                loading="lazy"
                                src={"./src/assets/pictures/pink-chair.jpg"}
                                className="absolute bottom-0"
                            />
                            <div className="absolute bottom-0 z-10 flex items-center w-full px-5 h-1/6 bg-opacity-20 bg-gradient-to-t from-neutral-600 ">
                                <CustomLink
                                    active={false}
                                    className="text-2xl text-stroke-shadow text-secondary-bg-color"
                                    underlineColor="bg-secondary-bg-color"
                                    to="/error"
                                >
                                    Chairs
                                </CustomLink>
                            </div>
                        </div>
                        <div
                            className={`${collectionCardStyle} col-span-1 aspect-square`}
                        >
                            <img
                                src={"./src/assets/pictures/table.jpg"}
                                className="object-cover h-full"
                            />
                            <div className="absolute bottom-0 z-10 flex items-center w-full px-5 h-1/6 bg-opacity-30 bg-gradient-to-t from-neutral-800">
                                <CustomLink
                                    active={false}
                                    className="text-2xl text-stroke-shadow text-secondary-bg-color"
                                    underlineColor="bg-secondary-bg-color"
                                    to="/error"
                                >
                                    Tables
                                </CustomLink>
                            </div>
                        </div>
                        <div className={`${collectionCardStyle} col-span-2`}>
                            <img
                                src={"./src/assets/pictures/sofa-1.jpg"}
                                className="absolute object-cover w-full -bottom-5"
                            />
                            <div className="absolute bottom-0 z-10 flex items-center w-full px-5 h-1/6 bg-opacity-30 bg-gradient-to-t from-neutral-600">
                                <CustomLink
                                    active={false}
                                    className="text-2xl text-stroke-shadow text-secondary-bg-color"
                                    underlineColor="bg-secondary-bg-color"
                                    to="/error"
                                >
                                    Sofas
                                </CustomLink>
                            </div>
                        </div>
                        <div className={`${collectionCardStyle} col-span-2`}>
                            <img
                                loading="lazy"
                                src={"./src/assets/pictures/shelf-large.jpg"}
                                className="absolute object-cover w-full"
                            />
                            <div className="absolute bottom-0 z-10 flex items-center w-full px-5 h-1/6 bg-opacity-30 bg-gradient-to-t from-neutral-600">
                                <CustomLink
                                    active={false}
                                    className="text-2xl text-stroke-shadow text-secondary-bg-color"
                                    underlineColor="bg-secondary-bg-color"
                                    to="/error"
                                >
                                    Shelves
                                </CustomLink>
                            </div>
                        </div>
                        <div
                            className={`${collectionCardStyle} col-span-1 aspect-square`}
                        >
                            <img
                                src={"./src/assets/pictures/lamp-2-front.png"}
                                className="absolute bottom-0"
                            />
                            <div className="absolute bottom-0 z-10 flex items-center w-full px-5 h-1/6 bg-opacity-30 bg-gradient-to-t from-neutral-700">
                                <CustomLink
                                    active={false}
                                    className="text-2xl text-stroke-shadow text-secondary-bg-color"
                                    underlineColor="bg-secondary-bg-color"
                                    to="/error"
                                >
                                    Lamps
                                </CustomLink>
                            </div>
                        </div>
                        <div
                            className={`${collectionCardStyle} col-span-1 aspect-square`}
                        >
                            <img
                                src={"./src/assets/pictures/flow-pot-on-stool.jpg"}
                                className="absolute bottom-0 object-cover w-full"
                            />
                            <div className="absolute bottom-0 z-10 flex items-center w-full px-5 h-1/6 bg-opacity-30 bg-gradient-to-t from-neutral-700">
                                <CustomLink
                                    active={false}
                                    className="text-2xl text-stroke-shadow text-secondary-bg-color"
                                    underlineColor="bg-secondary-bg-color"
                                    to="/error"
                                >
                                    Accessories
                                </CustomLink>
                            </div>
                        </div>
                    </div>

                    <MainActionLink to="/shop">
                        Explore collection
                    </MainActionLink>
                </div>
                <div className="flex flex-col items-center w-full gap-4 px-20 bg-transparent">
                    <p className="text-lg uppercase">
                        &#11834; Our Products &#11834;
                    </p>
                    <div className="grid items-center w-full grid-cols-1 gap-5 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {productLoop.map((product, index) => (
                            <div key={index} className="flex-center">
                                <ProductCard path='/productDetails/1' name="Chair" price="$100" imgUrl={"./src/assets/pictures/chair-6-side.png"}/>
                            </div>
                        ))}
                    </div>
                    <MainActionLink to="/shop">Shop with us</MainActionLink>
                </div>
            </section>
        </>
    )
}

export default HomePage
