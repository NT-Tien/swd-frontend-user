import axios from 'axios'
import {
    DEFAULT_API_URL,
    GET_CART_ITEMS_URL,
    GET_CATEGORIES_URL,
    GET_PRODUCTS_URL,
    GET_PRODUCT_BY_NAME_URL,
    GET_PRODUCT_OPTION_BY_ID_URL,
    GET_WISHLIST_ITEMS_URL,
    POST_LOGIN_GOOGLE_URL,
    POST_LOGIN_URL,
    POST_PAYMENT_CREATE_ORDER_URL,
    PUT_UPDATE_CART_ITEM_QUANTITY,
} from '../config/api'

export async function fetchProducts(
    size = 9,
    page = 1,
    searchValue = '',
    chosenCategoryId = '',
    sortOption
) {
    const sortDirection = sortOption ? sortOption.value.direction : 'ASC'
    const sortValue = sortOption ? sortOption.value.value : 'name'
   
    const { data } = await axios.get(
        DEFAULT_API_URL +
            GET_PRODUCTS_URL +
            size +
            '/' +
            page +
            '?query=' +
            searchValue +
            '&sortBy=' +
            sortValue +
            '&direction=' +
            sortDirection +
            '&categoryId=' +
            chosenCategoryId
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
    return axios
        .post(
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
        .then((res) => {
            console.log(res)
            return res
        })
        .catch((error) => {
            console.log(error)
            return error.response.data
        })
}

export async function loginGoogle(token) {
    const { data } = await axios.post(
        DEFAULT_API_URL + POST_LOGIN_GOOGLE_URL,
        {
            token: token,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    return data.data
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
    if(!token) return null
    const result = axios
        .get(DEFAULT_API_URL + GET_CART_ITEMS_URL + size + '/' + page, {
            headers: {
                Authorization: token,
            },
        })
        .then((res) => {
            console.log(res)
            return res.data.data
        })
        .catch((err) => {
            console.log(err)
            return err
        })
    return result
}

export async function addProductToCart(id, oid,  token) {
    const result = axios
        .put(
            DEFAULT_API_URL + 'cart/add-to-cart/' + id + '/' + oid,
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
            return error
        })
    return result
}

export async function updateCartItemQuantity(id, oid, amount, token) {
    const result = axios
        .put(
            DEFAULT_API_URL + PUT_UPDATE_CART_ITEM_QUANTITY + id + '/' + oid + '/' + amount,
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

export async function removeProductFromCart(id, oid,  token) {
    const result = axios
        .delete(DEFAULT_API_URL + 'cart/delete/' + id + '/' + oid, {
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

export async function addProductToWishlist(id, token) {
    const result = axios
        .put(
            DEFAULT_API_URL + 'wishlist/add-to-wishlist/' + id,
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
    return data.data
}

export async function createOrder(user_id, total, products, {voucher_id = '', address, phone, email}, token) {
    return axios
        .post(
            DEFAULT_API_URL + POST_PAYMENT_CREATE_ORDER_URL,
            {
                user_id,
                total,
                products,
                voucher_id,
                address,
                phone,
                email
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            }
        )
        .then((res) => {
            console.log(res)
            return res
        })
        .catch((error) => {
            console.log(error)
            return error.response.data
        })
}
