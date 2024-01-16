import React from 'react'
import PageHeader from '../../components/commons/header/PageHeader'

const Homepage = () => {
    return (
        <>
            <PageHeader />
            <div className="w-full h-full overflow-auto bg-primary-bg-color">
                <section className="relative flex w-full overflow-hidden h-svh">
                    <img
                        src="./src/assets/pictures/homepage-wallpaper.jpg"
                        className="w-full h-auto"
                    />
                    <div className="absolute top-0 left-0 flex flex-col justify-center w-full h-full px-20 pt-10 text-white bg-secondary-theme bg-opacity-35">
                        <p className="text-[10rem]">WELCOME</p>
                        <p className='w-1/3'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Praesent consectetur nibh et turpis interdum,
                            non vulputate augue dapibus. Phasellus sed nisi
                            justo.
                        </p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Homepage
