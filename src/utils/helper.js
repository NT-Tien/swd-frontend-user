import { DEFAULT_API_URL, GET_PRODUCT_IMAGE } from '../config/api'

export const displayImage = (url) => {
    return DEFAULT_API_URL + GET_PRODUCT_IMAGE + url.replace('image/', '')
}
