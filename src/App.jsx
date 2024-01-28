import './App.css'
import './scrollbar.css'
import { Route, Routes } from 'react-router-dom'
import {
    AboutUsPage,
    BookingPage,
    CheckOutPage,
    ContactPage,
    HomePage,
    LoginPage,
    NotFound,
    ShopPage,
    ShoppingCartPage,
    SignupPage,
    UserLayout,
} from './pages'

function App() {
    return (
        <main className="relative min-w-full min-h-full overflow-hidden app ">
            <Routes>
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/cart" element={<ShoppingCartPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/about-us" element={<AboutUsPage />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path='/checkout' element={<CheckOutPage />}/>
                </Route>

                <Route path="/*" element={<NotFound />} />
            </Routes>
        </main>
    )
}

export default App
