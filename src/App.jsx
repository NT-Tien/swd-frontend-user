import './App.css'
import './scrollbar.css'
import { Route, Routes } from 'react-router-dom'
import {
    AboutUsPage,
    AccountInfoPage,
    BookingPage,
    CheckOutPage,
    ContactPage,
    CustomeOrderPage,
    HomePage,
    LoginPage,
    NotFound,
    OrderHistoryPage,
    PasswordChangePage,
    ProductDetailsPage,
    RequireAuth,
    ShopPage,
    ShoppingCartPage,
    SignupPage,
    UserLayout,
    VerifyBookingPage,
    WalletPage,
    WishListPage,
} from './pages'
import useCheckAuth from './hooks/useCheckAuth'
import usePopup from './hooks/usePopup'
function App() {
    const { displayLoginCheckMessage, isLoggedIn } = useCheckAuth()
    const { isPopupOpen, displayPopup } = usePopup()

    return (
        <>
            <main className="relative flex flex-col min-w-full min-h-screen overflow-x-hidden h-max app ">
                {!isLoggedIn && displayLoginCheckMessage()}
                {isPopupOpen && displayPopup()}
                <Routes>
                    <Route path="/" element={<UserLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/about-us" element={<AboutUsPage />} />
                        <Route path="/booking" element={<BookingPage />} />
                        <Route
                            path="/verifyBooking"
                            element={<VerifyBookingPage />}
                        />
                        <Route path="/login" element={<LoginPage />} />

                        <Route path="/signup" element={<SignupPage />} />

                        <Route element={<RequireAuth />}>
                            <Route path='/password-change' element={<PasswordChangePage/>}/>
                            <Route path='/account-info' element={<AccountInfoPage/>}/>
                            <Route path='/wallet' element={<WalletPage />}/>
                            <Route path='/custom-order' element={<CustomeOrderPage />}/>
                            <Route 
                                path='/order-history'
                                element={<OrderHistoryPage/>}
                            />
                            <Route
                                path="/cart"
                                element={<ShoppingCartPage />}
                            />
                            <Route
                                path="/checkout"
                                element={<CheckOutPage />}
                            />
                            <Route
                                path="/wishlist"
                                element={<WishListPage />}
                            />
                        </Route>

                        <Route
                            path="/productDetails/:name"
                            element={<ProductDetailsPage />}
                        />
                        <Route path="/*" element={<NotFound />} />
                    </Route>
                </Routes>
            </main>
        </>
    )
}

export default App
