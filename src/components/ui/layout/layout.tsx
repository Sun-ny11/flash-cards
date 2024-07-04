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

  // const me = {
  //   avatar:
  //     'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/626fdaed-b3c5-472a-abfb-0560263e6a19_defaultCard-_1_.webp',
  //   created: '2024-05-30T14:41:25.011Z',
  //   email: 'somebody@gmail.com',
  //   id: '0a2dd868-ce37-4bfe-b64b-2c1af934be34',
  //   isEmailVerified: false,
  //   name: 'somebody',
  //   updated: '2024-06-10T11:37:02.877Z',
  // }

  return (
    <>
      <Header
        avatar={{ alt: data?.avatar, src: data?.avatar }}
        email={data?.email}
        isAuth={isAuth}
        logout={() => {}}
        name={data?.name}
      />
      <div className={clsx('container', s.wrapper)}>
        <Outlet />
      </div>
    </>
  )
}
