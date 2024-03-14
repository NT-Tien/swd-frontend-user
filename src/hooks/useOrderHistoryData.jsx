import { useQuery,keepPreviousData, } from '@tanstack/react-query'
import { useAuth } from './useAuth'
import { getOrderHistory } from '../utils/api'


export const useOrderHistoryData = () => {

    const {token} = useAuth()
    if(!token){
        return {data: null}
    }
    return useQuery({
        queryKey: ['order', token],
        queryFn: () => getOrderHistory(token),
        placeholderData: keepPreviousData,
        staleTime: 3600000,
    })
}

