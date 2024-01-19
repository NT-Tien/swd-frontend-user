import { useState } from 'react'
import './App.css'
import './scrollbar.css'
import { Route, Routes } from 'react-router-dom'
import {
    AboutUsPage,
    BookingPage,
    ContactPage,
    HomePage,
    NotFound,
    ShopPage,
    ShoppingCartPage,
    UserLayout,
} from './pages'

function App() {
    const [enabled, setEnabled] = useState(true)

    return (
        <main className="relative app">
            <Routes>
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/cart" element={<ShoppingCartPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/about-us" element={<AboutUsPage />} />
                    <Route path="/booking" element={<BookingPage />} />
                </Route>

                <Route path="/*" element={<NotFound />} />
            </Routes>
        </main>
    )
}

export default App
