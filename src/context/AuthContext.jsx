import React, { createContext, useEffect, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const initialToken = localStorage.getItem('token')
        ? JSON.parse(localStorage.getItem('token'))
        : null
    const initialUser = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null

        console.log(initialToken)

    const initialState = initialUser && initialToken ? true : false 
    const [user, setUser] = useState(initialUser)   
    const [isLoggedIn, setIsLoggedIn] = useState(initialState)
    const [isOpenCheckModal, setIsOpenCheckModal] = useState(false)
    const [token, setToken] = useState(initialToken)

    const logoutHook = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        setUser(null)
        setToken(null)
    }

    const loginHook = (user, token) => {
        setUser(user)
        setToken(token)
        console.log(user)
        localStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('user', JSON.stringify(user))
        setIsLoggedIn(true)

    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoggedIn,
                setIsLoggedIn,
                setToken,
                setUser,
                logoutHook,
                loginHook,
                isOpenCheckModal,
                setIsOpenCheckModal,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext
