import React, { createContext, useEffect, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const initalToken = sessionStorage.getItem('token')
        ? JSON.parse(sessionStorage.getItem('token'))
        : null
    const initialUser = sessionStorage.getItem('user')
        ? JSON.parse(sessionStorage.getItem('user'))
        : null

    const initialState = initialUser && initalToken ? true : false 
    const [user, setUser] = useState(initialUser)   
    const [isLoggedIn, setIsLoggedIn] = useState(initialState)
    const [isOpenCheckModal, setIsOpenCheckModal] = useState(false)
    const [token, setToken] = useState(initalToken)

    const logoutHook = () => {
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
        setIsLoggedIn(false)
        setUser(null)
        setToken(null)

        console.log('logged out', user)
    }

    const loginHook = (user, token) => {
        setUser(user)
        setToken(token)
        sessionStorage.setItem('token', JSON.stringify(token))
        sessionStorage.setItem('user', JSON.stringify(user))
        setIsLoggedIn(true)

        console.log('logged in  ', isLoggedIn)

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
