import { useQuery, useMutation, keepPreviousData, useQueryClient } from '@tanstack/react-query'
import { useAuth } from './useAuth'
import { addProductToCart, fetchCartItems, removeProductFromCart } from '../utils/api'
import usePopup from './usePopup'




export const useCartData = (page) => {

    const {token} = useAuth()

    return useQuery({
        queryKey: ['cart', page, token],
        queryFn: () => fetchCartItems(99, page, token),
        placeholderData: keepPreviousData,
        enabled: !!token,
        staleTime: 360000,
    })
}

export const useAddCartItem = () => {
    const queryClient = useQueryClient()
    const {token} = useAuth()
    const {openPopupFunc} = usePopup()
    return useMutation({
        mutationFn: ({id, oid, name}) =>  addProductToCart(id, oid, token),
        onSuccess: (data, variables, context) => {
            const {name} = variables
            queryClient.invalidateQueries({ queryKey: ['cart'] })
            console.log('addca ratatasr')
            openPopupFunc(
                `${name} is added to your cart`,
                'Got it, thanks!'
            )
          },
    })
}

export const useRemoveCartItem = () => {
    const queryClient = useQueryClient()
    const {token} = useAuth()
    const {openPopupFunc} = usePopup()

    return useMutation({
        mutationFn: ({id, oid, name}) => removeProductFromCart(id, oid, token),
        onSuccess: (data, variables, context) => {
            const {name} = variables
            queryClient.invalidateQueries({ queryKey: ['cart'] })
            openPopupFunc(
                `${name} is removed from your cart`,
                'Got it, thanks!'
            )
        }
    })
}
