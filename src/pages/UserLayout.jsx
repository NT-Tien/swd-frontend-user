import React from 'react'
import { PageFooter, PageHeader } from '../components'
import { Outlet } from 'react-router-dom/dist/umd/react-router-dom.development';

const UserLayout = () => {
  return (
    <>
        <PageHeader />
        <Outlet />
        <PageFooter />
    </>
  )
}

export default UserLayout