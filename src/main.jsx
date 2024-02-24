import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './input.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext.jsx'
import { PopupProvider } from './context/PopupContext.jsx'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // default: true
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <PopupProvider>
                <BrowserRouter>
                    <QueryClientProvider client={queryClient}>
                        <App />
                    </QueryClientProvider>
                </BrowserRouter>
            </PopupProvider>
        </AuthProvider>
    </React.StrictMode>
)
