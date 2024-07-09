import { Outlet } from 'react-router-dom'

import { useMeQuery } from '@/services/auth/authApi'
import clsx from 'clsx'

import s from './layout.module.scss'

import { Header } from './header'

export const Layout = () => {
  const { data, isError, isLoading } = useMeQuery()
  const isAuth = !isError && !isLoading

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  console.log('user data', data)

  return (
    <>
      <Header
        avatar={{ alt: data?.avatar, src: data?.avatar }}
        email={data?.email}
        isAuth={isAuth}
        name={data?.name}
      />
      <div className={clsx('container', s.wrapper)}>
        <Outlet />
      </div>
    </>
  )
}
