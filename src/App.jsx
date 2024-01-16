import { useState } from 'react'
import './App.css'
import './scrollbar.css'
import { Route, Routes } from "react-router-dom";
import { AboutUsPage, ContactPage, HomePage, NotFound, ShopPage, ShoppingCartPage } from './pages';


function App() {
    const [enabled, setEnabled] = useState(true)

    return (
        <main className="app">
            <Routes>
                <Route index element={<HomePage />}/>
                <Route path='/login'/>
                <Route path='/sign_up'/>
                <Route path='/shop' element={<ShopPage />}/>
				<Route path="/cart" element={<ShoppingCartPage />} />
                <Route path='/contact' element={<ContactPage/>}/>
                <Route path='/about-us' element={<AboutUsPage/>}/>

                
				<Route path="/*" element={<NotFound />} />
            </Routes>
        </main>
    )
}

export default App
