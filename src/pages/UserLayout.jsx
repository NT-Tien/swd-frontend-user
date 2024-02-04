import React from 'react'
import { PageFooter, PageHeader } from '../components'
import { Outlet } from 'react-router-dom/dist/umd/react-router-dom.development'
import ScrollToTop from './ScrollToTop'

const UserLayout = () => {
    return (
        <>
            <ScrollToTop />
            <PageHeader />
            <Outlet />
            <PageFooter />
        </>
    )
}

export default UserLayout
