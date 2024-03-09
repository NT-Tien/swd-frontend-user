import React from 'react'

const AboutUsPage = () => {
    return (
        <section className="relative flex flex-col justify-start w-full text-lg h-fit mt-4 min-h-svh text-secondary-theme scroll-smooth">
            <div className="z-0 flex flex-col text-secondary-theme">
                <div className="flex h-fit w-fit select-none gap-20 text-nowrap text-[40svh] font-light uppercase  ">
                    <span className="textUpper leading-none tracking-tighter [word-spacing:-100px]">
                        About us
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-center w-full h-full gap-4 px-20">
                <div className="flex gap-4 overflow-hidden ">
                    <div className="w-1/3 overflow-hidden">
                        <img
                            src="./src/assets/pictures/lamps.jpg"
                            className="object-cover w-full"
                        />
                    </div>

                    <p className="flex flex-col justify-between w-1/3 py-2">
                        <span>
                            It is more than just furniture; it is stories filled
                            with inspiration, creativity, and passion that will
                            bring life to your home.
                        </span>

                        <span>
                            The perfect blend of elegance, practicality, and
                            essence with a sense of style for whatever space you
                            want it in.
                        </span>
                    </p>
                </div>
                
                <div className="bg-about-us relative flex h-[120svh] w-full justify-end overflow-hidden bg-cover bg-fixed bg-center bg-no-repeat ">
                    <div className='absolute inset-0 w-full h-full bg-black backdrop-blur-[2px] bg-opacity-15'></div>
                    <div className="z-10 flex flex-col justify-around px-20 w-min text-secondary-bg-color">
                        <p className="flex flex-col w-min">
                            <span className='text-xl'>Since </span>
                            <h1 className="text-9xl">1985 </h1>
                            <span>
                                Transform your home with timeless style and
                                exquisite comfort. Tell the story of your home
                                with your furniture
                            </span>
                        </p>
                        <p className='text-xl'>
                            Let's create your classic piece. Bring timeless
                            style to your daily life with our custom-made
                            pieces.
                        </p>
                    </div>
                </div>
                <div className="flex mt-10 flex-center">
                    <div className="flex flex-col items-end w-2/3 gap-6">
                    <p className="flex flex-col w-2/3 gap-2">
                            <span className="text-4xl uppercase">
                                TRENDS COME AND GO, BUT A PERSON'S ESSENCE
                                REMAINS
                            </span>
                            <span className="w-1/2 ">
                                We preserve this essence with furniture that
                                transcends trends and lasts forever.
                            </span>
                        </p>
                        <div className="relative flex flex-col items-end ">
                            <div className="absolute overflow-hidden -bottom-6 left-16">
                                <img
                                    src="./src/assets/pictures/flow-pot-on-stool.jpg"
                                    className="object-cover w-1/3 aspect-square"
                                />
                            </div>
                            <img
                                src="./src/assets/pictures/yellow-bg-stool.jpg"
                                className="object-cover object-bottom w-2/3 aspect-square"
                            />
                        </div>

                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUsPage
