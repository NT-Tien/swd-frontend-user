import React, { useState } from 'react'
import LandingPageCard from './LandingPageCard'

const LandingPageCollections = () => {
    const [chosenCollection, setChosenCollection] = useState(0)


    return (
        <div className="w-full gap-5 p-6 flex-center h-96">
            <LandingPageCard
                id={1}
                title='Chair'
                onClick={setChosenCollection}
                active={chosenCollection === 1}
                src={'/src/assets/pictures/pink-chair.jpg'}
            >
                Chair
            </LandingPageCard>

            <LandingPageCard
                id={2}
                title='Table'
                onClick={setChosenCollection}
                active={chosenCollection === 2}
                src={'/src/assets/pictures/flow-pot-on-stool.jpg'}
            >
                Table
            </LandingPageCard>

            <LandingPageCard
                id={3}
                title='Kitchen'
                onClick={setChosenCollection}
                active={chosenCollection === 3}
                src={'/src/assets/pictures/kitchen.jpg'}
            >
                Kitchen
            </LandingPageCard>
        </div>
    )
}

export default LandingPageCollections
