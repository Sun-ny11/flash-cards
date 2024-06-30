import { ReactNode } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

import { Header, HeaderProps } from '@/components/ui/layout/header'
// import { Header, HeaderProps, Spinner } from '@/components'
import { useGetMeQuery } from '@/services/auth/authApi'

import s from './layout.module.scss'

import { Spinner } from '../spiner'

type AuthContext = {
  isAuthenticated: boolean
}

export function useAuthContext() {
  return useOutletContext<AuthContext>()
}

export const Layout = () => {
  const { data, isError, isLoading } = useGetMeQuery()
  const isAuthenticated = !isError && !isLoading

  if (isLoading) {
    return <Spinner fullScreen />
  }

  return (
    <LayoutPrimitive
      avatar={data?.avatar ?? null}
      email={data?.email ?? ''}
      isLoggedIn={isAuthenticated}
      onLogout={() => {}}
      userName={data?.name ?? ''}
    >
      <Outlet context={{ isAuthenticated } satisfies AuthContext} />
    </LayoutPrimitive>
  )
}

export type LayoutPrimitiveProps = { children: ReactNode } & HeaderProps

export const LayoutPrimitive = ({ children, ...headerProps }: LayoutPrimitiveProps) => {
  return (
    <div className={s.layout}>
      <Header {...headerProps} />
      <div className={s.content}>{children}</div>
    </div>
  )
}
