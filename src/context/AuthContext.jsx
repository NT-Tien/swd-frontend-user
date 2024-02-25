import React, { createContext, useEffect, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const initalToken = localStorage.getItem('token')
        ? JSON.parse(localStorage.getItem('token'))
        : null
    const initialUser = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null

    console.log(initialUser)

    const initialState = initialUser && initalToken ? true : false 
    const [user, setUser] = useState(initialUser)   
    const [isLoggedIn, setIsLoggedIn] = useState(initialState)
    const [isOpenCheckModal, setIsOpenCheckModal] = useState(false)
    const [token, setToken] = useState(initalToken)

    const logoutHook = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        setUser(null)
        setToken(null)

        console.log('logged out', user)
    }

    const loginHook = (user, token) => {
        setUser(user)
        setToken(token)
        localStorage.setItem('token', JSON.stringify(token))
        localStorage.setItem('user', JSON.stringify(user))
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
