import React from 'react'
import MainActionLink from '../buttons/MainActionLink'
import CustomLink from '../CustomLink'

const PageFooter = () => {
    return (
        <div className="grid grid-cols-5 gap-5 px-[5svw] py-6 mt-10 text-white bg-secondary-theme">
            <div className="flex flex-col col-span-2 gap-2 border-r border-opacity-50 border-neutral-50">
                <h1 className="text-lg underline uppercase">Contact Us</h1>
                <p>
                    Showroom: Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành
                    Phố Thủ Đức, Thành phố Hồ Chí Minh 700000
                </p>
                <p>Hotline: 0000000000</p>
                <p>Email: efurniture.help@fakeemail.com</p>
            </div>
            <div className="flex flex-col col-span-1 gap-2 border-r border-opacity-50 border-neutral-50">
                <h1 className="text-lg underline ">eFurniture</h1>
                    <CustomLink
                        textColor="light"
                        underlineWidth="h-px"
                        underlineColor='bg-white'
                        to="/shop"
                    >
                        Products
                    </CustomLink>
                    <CustomLink
                        textColor="light"
                        underlineWidth="h-px"
                        underlineColor='bg-white'
                        to="/about-us"
                    >
                        About us
                    </CustomLink>
                    <CustomLink
                        textColor="light"
                        underlineWidth="h-px"
                        underlineColor='bg-white'
                        to="/contact"
                    >
                        Contact us
                    </CustomLink>
            </div>
            <div className="flex flex-col items-center justify-around col-span-2 gap-4 py-6 overflow-hidden shadow-md bg-secondary-bg-color text-text-light-color">
                <p className="flex-col flex-center ">
                    <span className="text-xl font-semibold">
                        Feel the products yourself
                    </span>
                    <span className="text-normal">
                        Schedule your showroom appointment
                    </span>
                </p>

                <MainActionLink to="/booking" textColor="text-black">
                    {' '}
                    Booking With Us{' '}
                </MainActionLink>
            </div>
        </div>
    )
}

export default PageFooter
