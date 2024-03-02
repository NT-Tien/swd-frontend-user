import React, { createContext, useState } from 'react'

const PopupContext = createContext({})

export const PopupProvider = ({ children }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [confirmButtonMsg, setConfirmButtonMsg] = useState('')
    const [onCloseFunc, setOnCloseFunc] = useState(() => {})

    return (
        <PopupContext.Provider
            value={{
                isPopupOpen,
                setIsPopupOpen,
                message,
                setMessage,
                confirmButtonMsg,
                setConfirmButtonMsg,
                onCloseFunc,
                setOnCloseFunc,
            }}
        >
            {children}
        </PopupContext.Provider>
    )
}

export default PopupContext
