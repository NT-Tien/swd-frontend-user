import React, { createContext, useEffect, useState } from 'react'
import { verifyToken } from '../utils/api'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const initialToken = localStorage.getItem('token')
        ? JSON.parse(localStorage.getItem('token'))
        : null
    const initialUser = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null

    console.log(initialUser)

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

    if (initialToken) {
        const result = verifyToken(initialToken)
        result.then((res) => {
            console.log(res)
            if(!res ||!res.data || res.data.statusCode === 500 ){
                logoutHook()
                return
            }
        })
    }

    const initialState = initialUser && initialToken ? true : false
    const [user, setUser] = useState(initialUser)
    const [isLoggedIn, setIsLoggedIn] = useState(initialState)
    const [isOpenCheckModal, setIsOpenCheckModal] = useState(false)
    const [token, setToken] = useState(initialToken)

    

    

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
