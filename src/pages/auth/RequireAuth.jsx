import { useLocation, Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import { useAuth } from '../../hooks/useAuth'

const RequireAuth = () => {
    const { isLoggedIn } = useAuth()
    const location = useLocation()
    return isLoggedIn ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth
