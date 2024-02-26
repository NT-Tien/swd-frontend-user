import React, { useEffect, useState } from 'react'
import LandingPageCard from './LandingPageCard'

const LandingPageCollections = () => {
    const [chosenCollection, setChosenCollection] = useState(0)


    return (
        <div className="w-full gap-5 p-6 flex-center h-96">
            <LandingPageCard
                id={1}
                onClick={setChosenCollection}
                activeId={chosenCollection}
                src={'./src/assets/pictures/pink-chair.jpg'}
            >
                Chair
            </LandingPageCard>

            <LandingPageCard
                id={2}
                onClick={setChosenCollection}
                activeId={chosenCollection}
                src={'./src/assets/pictures/flow-pot-on-stool.jpg'}
            >
                Table
            </LandingPageCard>

            <LandingPageCard
                id={3}
                onClick={setChosenCollection}
                activeId={chosenCollection}
                src={'./src/assets/pictures/kitchen.jpg'}
            >
                Kitchen
            </LandingPageCard>
        </div>
    )
}

export default LandingPageCollections
