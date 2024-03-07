import React from 'react'
import { MainActionLink, PageBanner, SimpleLoading } from '../../components'
import { useAuth } from '../../hooks/useAuth'
import { formatDate } from '../../utils/helper'
import { useWalletData } from '../../hooks/useWallet'

const AccountInfoPage = () => {
    const { user } = useAuth()

    const { data, status } = useWalletData()
    return (
        <section className="flex flex-col px-20 min-h-svh text-secondary-theme">
            {user ? (
                <PageBanner title={user.profile.profile.name} />
            ) : (
                <PageBanner title="Account info" />
            )}
            <div className="flex justify-between gap-2 drop-shadow-lg">
                <div className='flex flex-col gap-1'>
                    <div className="font-medium">
                        Joined in:{' '}
                        <span className="text-lg font-light">
                            {formatDate(user.profile.profile.createdAt)}
                        </span>
                    </div>
                    <div className="font-medium">
                        Email:{' '}
                        <span className="text-lg font-light">
                            {user.profile.user.email}
                        </span>
                    </div>
                    <div className="font-medium">
                        Phone number:{' '}
                        <span className="text-lg font-light">
                            {user.profile.profile.phone}
                        </span>
                    </div>
                    <MainActionLink to='/password-change' className='mt-4'>
                        Change password
                    </MainActionLink>
                </div>
                <div className="flex flex-col justify-between w-1/3 p-2 px-4 border shadow-lg border-secondary-theme">
                    <h5 className="text-lg font-medium">Balance:</h5>
                    {status === 'pending' ? (
                        <SimpleLoading />
                    ) : (
                        <span className='flex justify-end w-full text-3xl font-light'>{data.balance}₫</span>
                    )}

                        <div className='w-full flex-center'>

                    <MainActionLink to='/wallet'>Add funds to your account</MainActionLink>
                        </div>
                </div>
            </div>
        </section>
    )
}

export default AccountInfoPage
