import { useQuery, useMutation, keepPreviousData, useQueryClient } from '@tanstack/react-query'
import { useAuth } from './useAuth'
import usePopup from './usePopup'
import { addProductToWishlist, fetchWishList, removeProductFromWishlist } from '../utils/api'




export const useWishlistData = (page) => {

    const {token} = useAuth()

    return useQuery({
        queryKey: ['wishlist', page, token],
        queryFn: () => fetchWishList(99, page, token),
        placeholderData: keepPreviousData,
        enabled: !!token,
        staleTime: 360000,
    })
}

export const useAddWishlistItem = () => {
    const queryClient = useQueryClient()
    const {token} = useAuth()
    const {openPopupFunc} = usePopup()
    return useMutation({
        mutationFn: ({id, name}) =>  addProductToWishlist(id, token),
        onSuccess: (data, variables, context) => {
            const {name} = variables
            queryClient.invalidateQueries({ queryKey: ['wishlist'] })
            openPopupFunc(
                `${name} is added to your wishlist`,
                'Got it, thanks!'
            )
          },
    })
}

export const useRemoveWishlistItem = () => {
    const queryClient = useQueryClient()
    const {token} = useAuth()
    const {openPopupFunc} = usePopup()

    return useMutation({
        mutationFn: ({id, name}) => removeProductFromWishlist(id, token),
        onSuccess: (data, variables, context) => {
            const {name} = variables
            queryClient.invalidateQueries({ queryKey: ['wishlist'] })
            openPopupFunc(
                `${name} is removed from your carwishlist`,
                'Got it, thanks!'
            )
        }
    })
}

