import { Outlet } from 'react-router-dom'

import { Loading } from '@/assets/components/Loading'
import { useMeQuery } from '@/services/auth/authApi'
import clsx from 'clsx'

import s from './layout.module.scss'

import { Header } from './header'

export const Layout = () => {
  const { data, isError, isLoading } = useMeQuery()
  const isAuth = !isError && !isLoading

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Header avatar={data?.avatar} email={data?.email} isAuth={isAuth} name={data?.name} />
      <div className={clsx('container', s.wrapper)}>
        <Outlet />
      </div>
    </>
  )
}
