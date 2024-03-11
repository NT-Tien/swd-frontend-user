import React, { useState } from 'react'
import LandingPageCard from './LandingPageCard'
import img1 from '/src/assets/pictures/pink-chair.jpg'
import img2 from '/src/assets/pictures/flow-pot-on-stool.jpg'

import img3 from '/src/assets/pictures/kitchen.jpg'

const LandingPageCollections = () => {
    const [chosenCollection, setChosenCollection] = useState(0)


    return (
        <div className="flex-col w-full h-full gap-5 p-6 flex-center md:flex-row md:h-96">
            <LandingPageCard
                id={1}
                title='Chair'
                onClick={setChosenCollection}
                active={chosenCollection === 1}
                src={img1}
            >
                Chair
            </LandingPageCard>

            <LandingPageCard
                id={2}
                title='Table'
                onClick={setChosenCollection}
                active={chosenCollection === 2}
                src={img2}
            >
                Table
            </LandingPageCard>

            <LandingPageCard
                id={3}
                title='Kitchen'
                onClick={setChosenCollection}
                active={chosenCollection === 3}
                src={img3}
            >
                Kitchen
            </LandingPageCard>
        </div>
    )
}

export default LandingPageCollections
