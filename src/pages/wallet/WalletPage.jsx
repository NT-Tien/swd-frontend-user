import React, {  useState } from 'react'
import { MainActionButton, PageBanner, SimpleLoading } from '../../components'
import { useDepositWallet, useWalletData } from '../../hooks/useWallet'

const WalletPage = () => {
    const { status, data, error } = useWalletData()
    const { mutate: addFunds, status: depositStatus } = useDepositWallet()
    const funds = [2000, 3000, 4000, 5000, 6000]

    const [chosenButton, setChosenButton] = useState(null)
    const handleClick = (fund, i) => {
        if(depositStatus !== 'pending'){
            handleAddFunds(fund,i)
        }
        console.log(depositStatus)
    }
    const handleAddFunds = (fund, i) => {
            setChosenButton(i)
            addFunds(fund)
    }

    return (
        <section className="flex min-h-svh flex-col px-20 text-secondary-theme">
            <PageBanner title="Wallet" />
            {depositStatus === 'pending' && <SimpleLoading />}
            {status === 'pending' ? (
                <SimpleLoading />
            ) : status === 'error' ? (
                <div className="flex-center w-full">
                    OPPS. SOMETHING HAPPENED WHEN FETCHING YOUR WALLET DETAILS
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
                    <div className="mt-8 flex min-h-max w-full flex-col gap-4 md:flex-row">
                        <div className="flex flex-1 flex-col gap-4">
                            {funds.map((fund, i) => (
                                <div
                                    key={i}
                                    className="flex h-20 w-full items-center justify-between gap-2 border border-secondary-theme/75 p-2 px-4 shadow-md"
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
                                        className="h-fit w-fit bg-secondary-theme p-2 px-4"
                                        onClick={() => handleClick(fund, i)}
                                    >
                                        {i === chosenButton && depositStatus === 'pending' ? (
                                            <SimpleLoading />
                                        ) : (
                                            'Add funds'
                                        )}
                                    </MainActionButton>
                                </div>
                            ))}
                        </div>

                        <div className="h-max w-96 min-w-max border border-secondary-theme/75 p-6 pb-10 shadow-xl">
                            <div className="w-full">
                                <span className="mb-4 flex w-full gap-2 text-sm ">
                                    Current wallet balance
                                </span>
                                <div className="w-full text-end text-3xl font-light">
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
