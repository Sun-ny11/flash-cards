import { Outlet } from 'react-router-dom'

import { Header, ProfileData } from '@/components/ui/layout/header'
import { useGetMeQuery, useLogoutMutation } from '@/services/auth/authApi'

import s from './layout.module.scss'

import { Spinner } from '../spiner'

export const Layout = () => {
  const { data, isError, isLoading } = useGetMeQuery()
  const [logout] = useLogoutMutation()
  const isAuth = !isError

  const profile: ProfileData | undefined = data && {
    avatar: data.avatar,
    email: data.email,
    name: data.name,
  }

  if (isLoading) {
    return <Spinner fullScreen />
  }

  return (
    <>
      <Header isAuth={isAuth} logout={logout} profile={profile} />
      <main className={s.main}>{isLoading ? <Spinner /> : <Outlet context={{ isAuth }} />}</main>
    </>
  )
}
