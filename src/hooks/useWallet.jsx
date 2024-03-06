import { useQuery, useMutation, keepPreviousData, useQueryClient } from '@tanstack/react-query'
import { useAuth } from './useAuth'
import usePopup from './usePopup'
import { depositWallet, getWallet } from '../utils/api'




export const useWalletData = () => {

    const {token, user} = useAuth()
    const id = user.accountId

    return useQuery({
        queryKey: ['wallet', id, token],
        queryFn: () => getWallet(id, token),
        placeholderData: keepPreviousData,
        enabled: !!token,
        staleTime: 360000,
    })
}

export const useDepositWallet = () => {
    const queryClient = useQueryClient()
    const {token, user} = useAuth()
    const userid = user.accountId

    const {openPopupFunc} = usePopup()
    return useMutation({
        mutationFn: (amount) => depositWallet(userid, amount, token),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['wallet'] })
            if (data.code === '00') {
                const checkoutUrl = data.data.checkoutUrl
                const redirect = () => {
                    window.open(checkoutUrl, '_blank')
                }
                openPopupFunc(
                    'Your deposit order has been received!',
                    'Head to payment',
                    redirect
                )
            }
          },
    })
}