import React, { createContext, useState } from 'react'

const PopupContext = createContext({})

export const PopupProvider = ({ children }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [confirmButtonMsg, setConfirmButtonMsg] = useState('')
    return (
        <PopupContext.Provider
            value={{
                isPopupOpen,
                setIsPopupOpen,
                message,
                setMessage,
                confirmButtonMsg,
                setConfirmButtonMsg,
            }}
        >
            {children}
        </PopupContext.Provider>
    )
}

export default PopupContext
