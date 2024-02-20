import axios from 'axios'
import { DEFAULT_API_URL } from '../config/api'

const GET_PRODUCTS_URL = 'product/get-all/' // + size/page
const GET_PRODUCT_BY_NAME_URL = 'product/get-by-name/' // + name
const GET_PRODUCT_OPTION_BY_ID_URL = 'option-products/get-all/' // + product_id
const GET_CART_ITEM_URL = 'cart/get-all/' // + size/page

const GET_CATEGORIES_URL = 'category/get-all' // NO PRAM

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
    const result = axios
        .post(DEFAULT_API_URL + 'booking-visit/create/verify/' + code)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {})
    return result
}





export async function fetchCartItems(size = 9, page = 1, token) {
    if (!user) return
    console.log(user)
    const { data } = await axios.get(
        DEFAULT_API_URL + GET_CART_ITEM_URL + size + '/' + page,
        {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }
    )
    return data
}

export async function addProductToCart(id, token) {
    const result = axios
        .put(DEFAULT_API_URL + '/cart/add-to-cart/' + id, {
            headers: {
                Authorization: 'Bearer ' + token,
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

export async function removeProductFromCart(id, token) {
    const result = axios
        .delete(DEFAULT_API_URL + '/cart/delete/' + id, {
            headers: {
                Authorization: 'Bearer ' + token,
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

export async function addProductToWishlist(id, token) {
    const result = axios
        .put(DEFAULT_API_URL + '/wishlist/add-to-wishlist/' + id, {
            headers: {
                Authorization: 'Bearer ' + token,
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

export async function removeProductFromWishlist(id, token) {
    const result = axios
        .delete(DEFAULT_API_URL + '/wishlist/delete/' + id, {
            headers: {
                Authorization: 'Bearer ' + token,
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