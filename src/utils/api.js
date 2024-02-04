import axios from 'axios'
import { DEFAULT_API_URL } from '../config/api'


const GET_PRODUCTS_URL = 'product/get-all/'  // + size/page
const GET_CATEGORIES_URL = 'category/get-all' // NO PRAM

export async function fetchProducts(page = 1, size = 9) {
    const { data } = await axios.get(DEFAULT_API_URL + GET_PRODUCTS_URL + size + '/' + page)
    return data.data
  }

  export async function fetchCategories() {
    const { data } = await axios.get(DEFAULT_API_URL + GET_CATEGORIES_URL)
    return data
  }