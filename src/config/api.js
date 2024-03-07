export const DEFAULT_API_URL = 'https://caucalamdev.io.vn/' 

export const GET_PRODUCTS_URL = 'product/get-all/' // + size/page
export const GET_PRODUCT_BY_NAME_URL = 'product/get-by-name/' // + name
export const GET_PRODUCT_OPTION_BY_ID_URL = 'option-products/get-all/' // + product_id
export const GET_CART_ITEMS_URL = 'cart/get-all/' // + size/page
export const GET_PRODUCT_IMAGE = 'file/show/' // + id
export const GET_CATEGORIES_URL = 'category/get-all' // NO PRAM
export const GET_WISHLIST_ITEMS_URL = 'wishlist/get-all/' // + size/page
export const GET_ORDER_HISTORY_URL = 'payment/get-by-user'

export const POST_WALLET_URL = 'wallet/check'
export const POST_DEPOSTIT_WALLET_URL = 'wallet/deposit'

export const POST_UPLOAD_FILE_URL = 'file/upload'
export const POST_CREATE_ORDER_CUSTOM_URL = 'staff/order-custome-design'
export const POST_PAYMENT_CREATE_ORDER_WALLET_URL = 'payment/pay-with-wallet'
export const POST_PAYMENT_CREATE_ORDER_URL = 'payment/create-order'
export const POST_LOGIN_URL = 'auth/login'
export const POST_LOGIN_GOOGLE_URL = 'auth/login/google'

export const PUT_UPDATE_CART_ITEM_QUANTITY = 'cart/update-quantity/' // pid + amount
export const PUT_UPDATE_PASSWORD_URL = 'account/update-password' 