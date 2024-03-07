import React, { useEffect, useState } from 'react'
import { MainActionButton, PageBanner, SimpleLoading } from '../../components'
import { useDepositWallet, useWalletData } from '../../hooks/useWallet'
import usePopup from '../../hooks/usePopup'

const WalletPage = () => {
    const { status, data, error } = useWalletData()
    const { mutate: addFunds, isLoading } = useDepositWallet()

    const funds = [2000, 3000, 4000, 5000, 6000]

    const [chosenButton, setChosenButton] = useState(null)
    const handleAddFunds = (funds, i) => {
        if (!isLoading) {
            setChosenButton(i)
            addFunds(funds)
        }
    }

    return (
        <section className="flex flex-col px-20 min-h-svh text-secondary-theme">
            <PageBanner title="Wallet" />
            {
                isLoading && <SimpleLoading/>
            }
            {status === 'pending' ? (
                <SimpleLoading />
            ) : status === 'error' ? (
                <div className="w-full flex-center">
                    OPPS. SOMETHING HAPPENED WHEN FETCH YOUR WALLET DETAILS
                </div>
            ) : (
                <>
                    <div className="flex flex-col ">
                        <p className="font-medium">ADD FUNDS TO YOUR WALLET</p>
                        <p>
                            Funds in your Wallet may be used for the purchase of
                            any furniture on our website.
                        </p>
                        <p>
                            You’ll have a chance to review your order before
                            it’s placed.
                        </p>
                    </div>
                    <div className="flex flex-col w-full gap-4 mt-8 min-h-max md:flex-row">
                        <div className="flex flex-col flex-1 gap-4">
                            {funds.map((fund, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between w-full h-20 gap-2 p-2 px-4 border shadow-md border-secondary-theme/75"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-2xl">
                                            Add {fund}₫
                                        </span>
                                        {i === 0 && (
                                            <span className="text-sm">
                                                Minimum fund level
                                            </span>
                                        )}
                                    </div>
                                    <MainActionButton
                                        isSuffixArrow={false}
                                        textColor="text-white"
                                        className="p-2 px-4 h-fit w-fit bg-secondary-theme"
                                        onClick={() => handleAddFunds(fund, i)}
                                    >
                                        {i === chosenButton && isLoading ? (
                                            <SimpleLoading />
                                        ) : (
                                            'Add funds'
                                        )}
                                    </MainActionButton>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 pb-10 border shadow-xl h-max w-96 min-w-max border-secondary-theme/75">
                            <div className="w-full">
                                <span className="flex w-full gap-2 mb-4 text-sm ">
                                    Current wallet balance
                                </span>
                                <div className="w-full text-3xl font-light text-end">
                                    {data && `${data.balance}₫`}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    )
}

export default WalletPage
