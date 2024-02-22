import axios from 'axios'
import {
    DEFAULT_API_URL,
    GET_CART_ITEMS_URL,
    GET_CATEGORIES_URL,
    GET_PRODUCTS_URL,
    GET_PRODUCT_BY_NAME_URL,
    GET_PRODUCT_OPTION_BY_ID_URL,
    GET_WISHLIST_ITEMS_URL,
    POST_LOGIN_URL,
} from '../config/api'

export async function fetchProducts(page = 1, size = 9) {
    const { data } = await axios.get(
        DEFAULT_API_URL + GET_PRODUCTS_URL + size + '/' + page
    )
    return data.data
}

export async function fetchProductByName(name) {
    const { data } = await axios.get(
        DEFAULT_API_URL + GET_PRODUCT_BY_NAME_URL + name
    )
    return data.data
}

export async function fetchProductOptionById(id) {
    const { data } = await axios.get(
        DEFAULT_API_URL + GET_PRODUCT_OPTION_BY_ID_URL + id
    )
    return data.data
}

export async function fetchCategories() {
    const { data } = await axios.get(DEFAULT_API_URL + GET_CATEGORIES_URL)
    return data.data
}

export async function registerAccount({ username, email, phone, password }) {
    return await axios.post(
        DEFAULT_API_URL + 'account/register',
        {
            username,
            email,
            phone,
            password,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
}

export async function login({ email, password }) {
    return await axios.post(
        DEFAULT_API_URL + POST_LOGIN_URL,
        {
            email: email,
            password: password,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
}

// export async function loginGoogle({ email,  password }) {
//     return await axios.post(
//         DEFAULT_API_URL + POST_LOGIN_URL,
//         {
//             email: email,
//             password: password,
//         },
//         {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         }
//     )
// }

export async function bookAppointment({ name, email, phone, time }) {
    return await axios.post(
        DEFAULT_API_URL + 'booking-visit/create',
        {
            customer_name: name,
            email,
            phone_number: phone,
            visit_date: time,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
}

export async function verifyAppointment(code) {
    try {
        const result = await axios.post(
            DEFAULT_API_URL + 'booking-visit/create/verify/' + code
        )
        return result.data.data
    } catch (e) {
        console.log(e)
    }
}

export async function fetchCartItems(size = 9, page = 1, token) {
    const { data } = await axios.get(
        DEFAULT_API_URL + GET_CART_ITEMS_URL + size + '/' + page,
        {
            headers: {
                Authorization: token,
            },
        }
    )
    console.log(data.data)
    return data.data
}

export async function addProductToCart(id, token) {
    console.log('api', token)
    console.log('apid', id)

    const result = axios
        .put(
            DEFAULT_API_URL + 'cart/add-to-cart/' + id,
            {},
            {
                headers: {
                    Authorization: token,
                },
            }
        )
        .then((res) => {
            console.log(res)
            return res
        })
        .catch((error) => {
            console.log(error)
        })
    return result
}

export async function removeProductFromCart(id, token) {
    const result = axios
        .delete(DEFAULT_API_URL + 'cart/delete/' + id, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
        .then((res) => {
            console.log(res)
            return res
        })
        .catch((error) => {
            console.log(error)
        })
    return result
}

export async function addProductToWishlist(id, token) {
    console.log('wishlistadd ', id, token)
    const result = axios
        .put(DEFAULT_API_URL + 'wishlist/add-to-wishlist/' + id, {
            headers: {
                Authorization: token,
            },
        })
        .then((res) => {
            console.log(res)
            return res
        })
        .catch((error) => {
            console.log(error)
        })
    return result
}

export async function removeProductFromWishlist(id, token) {
    const result = axios
        .delete(DEFAULT_API_URL + 'wishlist/delete/' + id, {
            headers: {
                Authorization: token,
            },
        })
        .then((res) => {
            console.log(res)
        })
        .catch((error) => {
            console.log(error)
        })
    return result
}

export async function fetchWishList(size = 9, page = 1, token) {
    const { data } = await axios.get(
        DEFAULT_API_URL + GET_WISHLIST_ITEMS_URL + size + '/' + page,
        {
            headers: {
                Authorization: token,
            },
        }
    )
    console.log('wishlist', token)
    return data
}

// export async function getProductImage(id) {
//     return axios
//         .get(DEFAULT_API_URL + GET_PRODUCT_IMAGE + id)
//         .then((response) => {
//             let image = btoa(
//                 new Uint8Array(response.data).reduce(
//                     (data, byte) => data + String.fromCharCode(byte),
//                     ''
//                 )
//             )
//             return `data:${response.headers[
//                 'content-type'
//             ].toLowerCase()};base64,${image}`
//         })
// }
